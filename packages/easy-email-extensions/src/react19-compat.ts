/**
 * React 19 Compatibility Shim
 *
 * React 19 removed ReactDOM.render() and ReactDOM.findDOMNode().
 * Arco Design (bundled into this package) still uses these APIs.
 * This shim polyfills them so the bundled Arco components work with React 19.
 *
 * MUST be imported before any Arco Design components are loaded.
 */
import ReactDOM from 'react-dom';

// Suppress React 19 "Accessing element.ref" deprecation warnings from Arco Design.
// Arco's Trigger, Popover, and other components internally use React.cloneElement
// which triggers this harmless warning. Safe to suppress until Arco updates.
const _origConsoleError = console.error;
console.error = function filteredError(...args: any[]) {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Accessing element.ref was removed')
  ) {
    return; // suppress
  }
  return _origConsoleError.apply(console, args);
};

// Polyfill ReactDOM.render (removed in React 19)
if (!(ReactDOM as any).render) {
  (ReactDOM as any).render = function renderPolyfill(
    element: React.ReactElement,
    container: HTMLElement,
    callback?: () => void,
  ) {
    if (!container || !(container instanceof HTMLElement)) {
      console.warn('[Easy Email React 19 compat] ReactDOM.render called with invalid container, skipping');
      return null;
    }
    if ((ReactDOM as any).createRoot) {
      let root = (container as any)._reactRoot;
      if (!root) {
        root = (ReactDOM as any).createRoot(container);
        (container as any)._reactRoot = root;
      }
      root.render(element);
      if (callback) setTimeout(callback, 0);
      return null;
    }
    return null;
  };
}

// Polyfill ReactDOM.findDOMNode (removed in React 19)
if (!(ReactDOM as any).findDOMNode) {
  (ReactDOM as any).findDOMNode = function findDOMNodePolyfill(instance: any) {
    if (instance == null) return null;
    if (instance instanceof HTMLElement) return instance;
    if (instance && instance.nodeType === 1) return instance;
    // For React class component refs, try _reactInternals fiber
    if (instance && instance._reactInternals) {
      let fiber = instance._reactInternals;
      while (fiber) {
        if (fiber.stateNode instanceof HTMLElement) return fiber.stateNode;
        fiber = fiber.child;
      }
    }
    return null;
  };
}
