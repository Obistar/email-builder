import { Button, Drawer } from '@arco-design/web-react';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { BasicType, IText } from 'easy-email-core';
import { Stack, TextStyle, useBlock, useEditorContext, useFocusIdx } from 'easy-email-editor';
import { ShadowDom } from '@extensions/components/ShadowDom';

const CodeMirrorEditorPromise = import(
  '../../../components/Form/CodemirrorEditor'
);
const CodeMirrorEditor = React.lazy(() => CodeMirrorEditorPromise);

export const HtmlEditor: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = (props) => {
  const { visible, setVisible } = props;

  const { focusBlock, setValueByIdx } = useBlock();
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();
  const [content, setContent] = useState(focusBlock?.data.value.content || '');

  const isTable = focusBlock?.type === BasicType.TABLE;

  // Sync content when focusBlock changes or drawer opens
  useEffect(() => {
    if (visible) {
      setContent(focusBlock?.data.value.content || '');
    }
  }, [visible, focusBlock?.data.value.content]);

  const onClose = () => {
    setVisible(false);
  };

  const onSave = () => {
    if (!focusBlock) return;
    focusBlock.data.value.content = content;
    setValueByIdx(focusIdx, { ...focusBlock });
    onClose();
  };

  const styles = useMemo(() => {
    if (!focusBlock) return {};

    const attributes = focusBlock.attributes as IText['attributes'];
    return {
      color: attributes.color || pageData.data.value['text-color'],
      fontSize: attributes['font-size'] || pageData.data.value['font-size'],
      fontFamily:
        attributes['font-family'] || pageData.data.value['font-family'],
      fontWeight:
        attributes['font-weight'] || pageData.data.value['font-weight'],
      backgroundColor: attributes['container-background-color'],
      padding: attributes.padding,
    };
  }, [focusBlock, pageData.data.value]);

  return (
    <Drawer
      placement='left'
      headerStyle={{ display: 'block', lineHeight: '48px', padding: '0 16px', borderBottom: '1px solid #e5e6eb' }}
      title={(
        <Stack distribution='equalSpacing'>
          <TextStyle variation='strong' size='large'>
            {t('Html')}
          </TextStyle>
          <Stack spacing='tight'>
            <Button onClick={onClose}>
              {t('Back')}
            </Button>
            <Button type='primary' onClick={onSave}>
              {t('Save')}
            </Button>
          </Stack>
        </Stack>
      )}
      closable={false}
      escToExit={false}
      width='100vw'
      visible={visible}
      footer={null}
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <div style={{ width: '50%', height: '100%', minWidth: 0, overflow: 'hidden' }}>
          {visible && (
            <Suspense
              fallback={(
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#263238',
                    justifyContent: 'center',
                    fontSize: 24,
                    color: '#fff',
                  }}
                >
                  {t('Editor Loading...')}
                </div>
              )}
            >
              <CodeMirrorEditor value={content} onChange={setContent} />
            </Suspense>
          )}
        </div>
        <div
          style={{ width: '50%', height: '100%', minWidth: 0, overflow: 'auto', padding: '8px 0' }}
        >
          <ShadowDom
            style={{
              color: styles.color,
              fontSize: styles.fontSize,
              fontFamily: styles.fontFamily,
              fontWeight: styles.fontWeight,
              backgroundColor: styles.backgroundColor,
              padding: styles.padding,
              width: 'auto',
              margin: '0 20px',
            }}
          >
            {isTable ? (
              <table>
                <tbody dangerouslySetInnerHTML={{ __html: content }} />
              </table>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </ShadowDom>
        </div>
      </div>
    </Drawer>
  );
};
