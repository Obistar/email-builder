import { camelCase } from 'lodash';
import React from 'react';
import { getNodeTypeFromClassName } from 'easy-email-core';

const domParser = new DOMParser();

export function getChildSelector(selector: string, index: number) {
  return `${selector}-${index}`;
}

export function HtmlStringToPreviewReactNodes(
  content: string,
) {
  let doc = domParser.parseFromString(content, 'text/html'); // The average time is about 1.4 ms

  // React 19 compat: avoid rendering <html>/<head>/<body> as React elements
  // (React 19 errors on nested <html> inside <div>). Instead, render a <div>
  // wrapper with styles from <head> and content from <body>.
  const headStyles: React.ReactElement[] = [];
  if (doc.head) {
    [...doc.head.childNodes].forEach((n, i) => {
      if (n.nodeType === Node.ELEMENT_NODE && (n as Element).tagName.toLowerCase() === 'style') {
        headStyles.push(
          React.createElement('style', {
            key: `head-style-${i}`,
            dangerouslySetInnerHTML: { __html: n.textContent },
          })
        );
      }
    });
  }

  const bodyNode = doc.body || doc.documentElement;
  const bodyChildren = [...bodyNode.childNodes].map((n, i) => (
    <RenderReactNode
      selector={getChildSelector('0', i)}
      key={i}
      node={n as any}
      index={i}
    />
  ));

  return React.createElement(
    'div',
    {
      'data-selector': '0',
      style: getStyle(bodyNode.getAttribute?.('style')),
    },
    ...headStyles,
    ...bodyChildren,
  );
}

const TABLE_TAGS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup']);

const RenderReactNode = React.memo(function ({
  node,
  index,
  selector,
}: {
  node: HTMLElement;
  index: number;
  selector: string;
}): React.ReactElement {
  const attributes: { [key: string]: string; } = {
    'data-selector': selector,
  };
  node.getAttributeNames?.().forEach((att) => {
    if (att) {
      attributes[att] = node.getAttribute(att) || '';
    }
  });

  if (node.nodeType === Node.COMMENT_NODE) return <></>;

  if (node.nodeType === Node.TEXT_NODE) {
    return <>{node.textContent}</>;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    // React 19 compat: remap document-level tags to divs
    let tagName = node.tagName.toLowerCase();
    if (tagName === 'html' || tagName === 'head' || tagName === 'body') {
      tagName = 'div';
    }
    if (tagName === 'meta') return <></>;

    if (tagName === 'style') {
      return React.createElement(tagName, {
        key: index,
        ...attributes,
        dangerouslySetInnerHTML: { __html: node.textContent },
      });
    }

    const blockType = getNodeTypeFromClassName(node.classList);

    if (attributes['data-contenteditable'] === 'true') {
      return React.createElement(tagName, {
        key: performance.now(),
        ...attributes,
        style: getStyle(node.getAttribute('style')),
        dangerouslySetInnerHTML: { __html: node.innerHTML },
      });
    }

    // React 19 compat: filter whitespace text nodes from table elements
    // (React 19 parser is stricter about table structure)
    let childNodes = [...node.childNodes];
    if (TABLE_TAGS.has(tagName)) {
      childNodes = childNodes.filter(
        (n) => !(n.nodeType === Node.TEXT_NODE && n.textContent?.trim() === '')
      );
    }

    const reactNode = React.createElement(tagName, {
      key: index,
      ...attributes,
      style: getStyle(node.getAttribute('style')),
      children:
        childNodes.length === 0
          ? null
          : childNodes.map((n, i) => (
            <RenderReactNode
              selector={getChildSelector(selector, i)}
              key={i}
              node={n as any}
              index={i}
            />
          )),
    });

    return <>{reactNode}</>;
  }

  return <></>;
});

function getStyle(styleText: string | null | undefined) {
  if (!styleText) return undefined;
  return styleText.split(';').reduceRight((a: any, b: any) => {
    const arr = b.split(/\:(?!\/)/);
    if (arr.length < 2) return a;
    a[camelCase(arr[0])] = arr[1];
    return a;
  }, {});
}
