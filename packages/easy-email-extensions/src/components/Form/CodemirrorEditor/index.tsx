import React, { useCallback, useRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';

const extensions = [html(), EditorView.lineWrapping];

export default function CodemirrorEditor(props: {
  value: string;
  onChange(val: string): void;
}) {
  const { value, onChange } = props;
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <CodeMirror
        ref={editorRef}
        value={value}
        onChange={handleChange}
        extensions={extensions}
        theme={oneDark}
        height="100%"
        style={{ height: '100%' }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
          autocompletion: true,
          indentOnInput: true,
        }}
      />
    </div>
  );
}
