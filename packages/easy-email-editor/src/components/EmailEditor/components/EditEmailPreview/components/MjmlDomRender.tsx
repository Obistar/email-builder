import React, { useEffect, useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { getPageIdx, IPage, JsonToMjml } from 'easy-email-core';
import { cloneDeep, isEqual } from 'lodash';
import { useEditorContext } from '@/hooks/useEditorContext';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';
import { useEditorProps } from '@/hooks/useEditorProps';
import { getEditorRoot, getShadowRoot } from '@/utils';
import { DATA_RENDER_COUNT, FIXED_CONTAINER_ID } from '@/constants';

// Flatten nested mergeTags { Group: { tag: "value" } } into { tag: "value" }
function flattenMergeTags(obj: Record<string, any>, result: Record<string, string> = {}): Record<string, string> {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = val;
    } else if (val && typeof val === 'object') {
      flattenMergeTags(val, result);
    }
  }
  return result;
}

// Replace {{tag}} inside HTML attribute values (src="{{logoUrl}}", href="{{url}}", etc.)
// Only targets merge tags within quoted attribute values, preserving text content tags for MergeTagBadge
function resolveMergeTagsInAttributes(html: string, flatTags: Record<string, string>): string {
  if (!html || Object.keys(flatTags).length === 0) return html;
  // Match attribute="value" pairs and replace {{tag}} only within the value portion
  return html.replace(
    /(\s(?:src|href|background|action|poster|data-src)=")([^"]*?)(")/g,
    (_full, pre, value, post) => {
      const resolved = value.replace(/\{\{([\w]+)\}\}/g, (_m: string, tag: string) => flatTags[tag] ?? `{{${tag}}}`);
      return pre + resolved + post;
    },
  );
}

let count = 0;
export function MjmlDomRender() {
  const { pageData: content } = useEditorContext();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { dashed, mergeTags, enabledMergeTagsBadge } = useEditorProps();
  const [isTextFocus, setIsTextFocus] = useState(false);

  const isTextFocusing =
    document.activeElement === getEditorRoot() &&
    getShadowRoot().activeElement?.getAttribute('contenteditable') === 'true';

  useEffect(() => {
    if (isEqual(content, pageData)) return;

    if (isTextFocus) {
      // Allow attribute/style changes through, but skip content-only changes
      // to preserve cursor position during typing.
      const stripContent = (page: IPage | null) =>
        page ? JSON.stringify(page, (key, val) => key === 'content' ? undefined : val) : null;
      if (stripContent(content) !== stripContent(pageData)) {
        setPageData(cloneDeep(content));
      }
    } else {
      setPageData(cloneDeep(content));
    }
  }, [content, pageData, setPageData, isTextFocus]);

  useEffect(() => {
    setIsTextFocus(isTextFocusing);
  }, [isTextFocusing]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (getEditorRoot()?.contains(e.target as Node)) {
        return;
      }
      const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
      if (fixedContainer?.contains(e.target as Node)) {
        return;
      }
      setIsTextFocus(false);
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const root = getShadowRoot();
    if (!root) return;
    const onClick = (e: Event) => {
      const isFocusing =
        getShadowRoot().activeElement?.getAttribute('contenteditable') === 'true';
      if (isFocusing) {
        setIsTextFocus(true);
      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
    };
  }, []);

  // Flatten nested mergeTags for attribute replacement
  const flatTags = useMemo(
    () => (mergeTags ? flattenMergeTags(mergeTags) : {}),
    [mergeTags],
  );

  const html = useMemo(() => {
    if (!pageData) return '';

    let renderHtml = mjml(
      JsonToMjml({
        data: pageData,
        idx: getPageIdx(),
        context: pageData,
        mode: 'testing',
        dataSource: cloneDeep(mergeTags),
      }),
    ).html;
    // Resolve {{tag}} in attribute values (img src, a href, etc.) so images/links preview correctly
    renderHtml = resolveMergeTagsInAttributes(renderHtml, flatTags);
    return renderHtml;
  }, [mergeTags, flatTags, pageData]);

  return useMemo(() => {
    return (
      <div
        {...{
          [DATA_RENDER_COUNT]: count++,
        }}
        data-dashed={dashed}
        ref={setRef}
        style={{
          outline: 'none',
          position: 'relative',
        }}
        role='tabpanel'
        tabIndex={0}
      >
        <>
          {ref &&
            createPortal(
              HtmlStringToReactNodes(html, {
                enabledMergeTagsBadge: Boolean(enabledMergeTagsBadge),
              }),
              ref,
            )}
        </>
      </div>
    );
  }, [dashed, ref, html, enabledMergeTagsBadge]);
}
