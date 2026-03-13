import { Menu, Popover } from '@arco-design/web-react';
import React from 'react';
import { ToolItem } from '../ToolItem';
import { IconFont } from 'easy-email-editor';

const list = [
  { value: 'P', label: t('Paragraph') },
  { value: 'H1', label: 'H1' },
  { value: 'H2', label: 'H2' },
  { value: 'H3', label: 'H3' },
  { value: 'H4', label: 'H4' },
];

export function Heading(props: {
  execCommand: (cmd: string, val?: any) => void;
  getPopupContainer: () => HTMLElement;
}) {
  return (
    <Popover
      trigger='click'
      color='#fff'
      position='left'
      className='easy-email-extensions-Tools-Popover'
      getPopupContainer={props.getPopupContainer}
      content={(
        <Menu
          onClickMenuItem={(val) => {
            props.execCommand('formatBlock', `<${val}>`);
          }}
          selectedKeys={[]}
          style={{ width: 130, border: 'none' }}
        >
          {list.map((item) => (
            <Menu.Item style={{ lineHeight: '32px', height: 32 }} key={item.value}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      )}
    >
      <ToolItem
        title={t('Heading')}
        icon={<IconFont iconName='icon-heading' />}
      />
    </Popover>
  );
}
