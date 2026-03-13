#!/usr/bin/env node
/**
 * Patch @arco-design/web-react for React 19 compatibility.
 * Run this after `pnpm install` and before `pnpm build` in easy-email-extensions.
 *
 * Fixes:
 * 1. useMergeValue: don't set state to undefined (breaks __read in React 19)
 * 2. Trigger/portal: fix useIsFirstRender for strict mode double-mount
 */
const fs = require('fs');
const path = require('path');

const arcoBase = path.join(__dirname, '..', 'node_modules', '@arco-design', 'web-react', 'es');

// Fix 1: useMergeValue
const useMergeValuePath = path.join(arcoBase, '_util', 'hooks', 'useMergeValue.js');
if (fs.existsSync(useMergeValuePath)) {
  let content = fs.readFileSync(useMergeValuePath, 'utf8');
  if (!content.includes('React 19 fix')) {
    const original = content;
    content = content.replace(
      'if (value === undefined && prevPropsValue !== value) {\n            setStateValue(value);\n        }',
      'if (value === undefined && prevPropsValue !== value) {\n            // React 19 fix: don\'t set state to undefined\n            // setStateValue(value);\n        }'
    );
    if (content !== original) {
      fs.writeFileSync(useMergeValuePath, content);
      console.log('✅ Patched useMergeValue for React 19');
    } else {
      console.warn('⚠️  useMergeValue: target pattern not found — Arco version may have changed');
    }
  } else {
    console.log('⏭️  useMergeValue already patched');
  }
}

// Fix 2: Trigger/portal
const portalPath = path.join(arcoBase, 'Trigger', 'portal.js');
if (fs.existsSync(portalPath)) {
  let content = fs.readFileSync(portalPath, 'utf8');
  if (!content.includes('React 19 fix')) {
    const patched = `// React 19 compat: fixed Portal for strict mode double-mount
import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isServerRendering } from '../_util/dom';

var Portal = function (props) {
    var getContainer = props.getContainer, children = props.children;
    var containerRef = useRef();
    // React 19 fix: always ensure container exists and is attached to DOM
    if (!isServerRendering && (!containerRef.current || !containerRef.current.parentNode)) {
        containerRef.current = getContainer();
    }
    useEffect(function () {
        // React 19 strict mode: re-attach container if cleanup removed it
        if (containerRef.current && !containerRef.current.parentNode) {
            containerRef.current = getContainer();
        }
        return function () {
            var container = containerRef.current;
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
                containerRef.current = null;
            }
        };
    }, []);
    return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
};
export default Portal;
`;
    fs.writeFileSync(portalPath, patched);
    console.log('✅ Patched Trigger/portal for React 19');
  } else {
    console.log('⏭️  Trigger/portal already patched');
  }
}

console.log('🎉 Arco Design React 19 patches applied');
