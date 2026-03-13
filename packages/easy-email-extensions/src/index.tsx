// React 19 removed findDOMNode — provide a no-op fallback for bundled
// react-transition-group (used internally by Arco Design) when nodeRef
// isn't available. Arco's own findDOMNode wrapper already has guards.
import ReactDOM from 'react-dom';
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = () => null;
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