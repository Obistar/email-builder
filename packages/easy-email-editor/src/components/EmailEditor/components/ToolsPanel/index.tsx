import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { IconFont } from '@/components/IconFont';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <Stack alignment='center'>
      <button
        className='easy-email-editor-toolBtn'
        title={t('undo')}
        disabled={!undoable}
        onClick={undo}
        type='button'
      >
        <IconFont
          iconName='icon-undo'
          style={{ cursor: 'inherit' }}
        />
      </button>

      <button
        className='easy-email-editor-toolBtn'
        title={t('redo')}
        disabled={!redoable}
        onClick={redo}
        type='button'
      >
        <IconFont
          iconName='icon-redo'
          style={{ cursor: 'inherit' }}
        />
      </button>
    </Stack>
  );
}
