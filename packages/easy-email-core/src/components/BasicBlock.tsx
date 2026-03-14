import { IBlock } from '@core/typings';
import { getAdapterAttributesString, getChildIdx } from '@core/utils';
import { getImg } from '@core/utils/getImg';
import { getPlaceholder } from '@core/utils/getPlaceholder';
import { omit } from 'lodash';
import React from 'react';
import { BlockRenderer } from './BlockRenderer';

export function BasicBlock(props: {
  params: Parameters<IBlock['render']>[0];
  tag: string;
  children?: React.ReactNode;
}) {
  const {
    params,
    params: { data, idx, children: children2, mode },
    tag,
    children,
  } = props;

  const placeholder = data.children.length === 0 && getPlaceholder(params);

  let content = children || children2;
  if (
    (!content || (Array.isArray(content) && content.length === 0)) &&
    data.children.length === 0
  ) {
    content = placeholder;
  }

  if (mode === 'testing' && tag === 'mj-image') {
    let url = data.attributes.src;

    if (
      url === '' ||
      /{{([\s\S]+?)}}/g.test(url) ||
      /\*\|([^\|\*]+)\|\*/g.test(url)
    ) {
      // Try resolving merge tags from dataSource before falling back to placeholder
      let resolvedUrl = url;
      const ds = params.dataSource;
      if (ds && url) {
        resolvedUrl = url.replace(/\{\{([\s\S]+?)\}\}/g, (_m: string, tag: string) => {
          const trimmed = tag.trim();
          return ds[trimmed] != null ? String(ds[trimmed]) : `{{${trimmed}}}`;
        });
        resolvedUrl = resolvedUrl.replace(/\*\|([^\|\*]+)\|\*/g, (_m: string, tag: string) => {
          return ds[tag] != null ? String(ds[tag]) : `*|${tag}|*`;
        });
      }

      // If resolved to a real URL, use it; otherwise fall back to placeholder
      if (resolvedUrl && resolvedUrl !== url && !resolvedUrl.includes('{{') && !resolvedUrl.includes('*|')) {
        const adapterData = omit(params, 'data.attributes.src');
        return (
          <>
            {`<${tag} ${getAdapterAttributesString(adapterData)} src="${resolvedUrl}">`}
            {`</${tag}>`}
          </>
        );
      }

      const adapterData = omit(params, 'data.attributes.src');

      return (
        <>
          {`<${tag} ${getAdapterAttributesString(adapterData)} src="${getImg(
            'IMAGE_59'
          )}">`}

          {`</${tag}>`}
        </>
      );
    }
  }

  return (
    <>
      {`<${tag} ${getAdapterAttributesString(params)}>`}
      {content ||
        data.children.map((child, index) => (
          <BlockRenderer
            key={index}
            {...params}
            idx={idx ? getChildIdx(idx, index) : null}
            data={child}
          />
        ))}
      {`</${tag}>`}
    </>
  );
}
