// React 19 removed ReactDOM.findDOMNode. Provide a smarter polyfill that
// handles the cases Arco's internals and react-transition-group rely on.
import ReactDOM from 'react-dom';
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = function findDOMNodePolyfill(instance: any) {
    if (instance instanceof Element) return instance;
    if (instance && instance.current instanceof Element) return instance.current;
    if (instance && typeof instance.getRootDOMNode === 'function') return instance.getRootDOMNode();
    return null;
  };
}

import './index.scss';

export * from './BlockLayer';
export * from './AttributePanel';
export * from './ShortcutToolbar';
export * from './SourceCodePanel';
export * from './InteractivePrompt';
export * from './SimpleLayout';
export * from './StandardLayout';
export * from './MergeTagBadgePrompt';
export * from './components/Providers/ExtensionProvider';
export * from './constants';
export * from './components/Form';
export * from './components/ShadowDom';

export { getContextMergeTags } from './utils/getContextMergeTags';
export { getIconNameByBlockType, setIconsMap } from './utils/getIconNameByBlockType';
export { getBlockTitle } from './utils/getBlockTitle';
export { MjmlToJson } from './utils/MjmlToJson';