import { IEmailTemplate } from '@/typings';
import { useForm, useFormState } from 'react-final-form';
import { cloneDeep, isEqual } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MAX_RECORD_SIZE = 50;

export type RecordStatus = 'add' | 'redo' | 'undo' | undefined;

interface HistoryState {
  records: Array<IEmailTemplate>;
  index: number;
}

export const RecordContext = React.createContext<{
  records: Array<IEmailTemplate>;
  redo: () => void;
  undo: () => void;
  reset: () => void;
  redoable: boolean;
  undoable: boolean;
}>({
  records: [],
  redo: () => {},
  undo: () => {},
  reset: () => {},
  redoable: false,
  undoable: false,
});

export const RecordProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const formState = useFormState<IEmailTemplate>();

  // Single combined state for records + index — ensures atomic updates.
  const [history, setHistory] = useState<HistoryState>({ records: [], index: -1 });
  const historyRef = useRef(history);
  historyRef.current = history;

  const statusRef = useRef<RecordStatus>(undefined);

  // Initialization window: during the first 500ms after mount, react-final-form
  // normalizes the form data (e.g. the content `data` key changes). All state
  // changes during this window replace the baseline record at index 0 instead
  // of appending new records. This prevents the undo button from being active
  // on load even though the user hasn't made any changes.
  const mountTimeRef = useRef(Date.now());
  const SETTLE_MS = 2000;

  const form = useForm();

  const undo = useCallback(() => {
    const { records, index } = historyRef.current;
    const prevIndex = Math.max(0, index - 1);
    if (prevIndex === index) return;
    statusRef.current = 'undo';
    setHistory({ records, index: prevIndex });
    form.reset(records[prevIndex]);
  }, [form]);

  const redo = useCallback(() => {
    const { records, index } = historyRef.current;
    const nextIndex = Math.min(MAX_RECORD_SIZE - 1, index + 1, records.length - 1);
    if (nextIndex === index) return;
    statusRef.current = 'redo';
    setHistory({ records, index: nextIndex });
    form.reset(records[nextIndex]);
  }, [form]);

  const reset = useCallback(() => {
    form.reset();
  }, [form]);

  const value = useMemo(() => {
    return {
      records: history.records,
      redo,
      undo,
      reset,
      undoable: history.index > 0,
      redoable: history.index < history.records.length - 1,
    };
  }, [history, redo, undo, reset]);

  useEffect(() => {
    if (statusRef.current === 'redo' || statusRef.current === 'undo') {
      statusRef.current = undefined;
      return;
    }

    const vals = formState.values;
    const isSettling = Date.now() - mountTimeRef.current < SETTLE_MS;

    statusRef.current = 'add';
    setHistory(prev => {
      // During initialization window, always replace the single baseline
      // record at index 0. This absorbs all form normalization changes.
      // Dedup within settling too — returning the same `prev` reference
      // prevents infinite re-render loops.
      if (isSettling) {
        const bl = prev.records[0];
        if (bl && isEqual(vals.content, bl.content) && vals.subTitle === bl.subTitle) {
          return prev;
        }
        return { records: [cloneDeep(vals)], index: 0 };
      }

      // Normal recording with deduplication.
      const list = prev.records.slice(0, prev.index + 1);
      const last = list[list.length - 1];
      if (last && isEqual(vals.content, last.content) && vals.subTitle === last.subTitle) {
        return prev; // No change — React skips re-render
      }
      const newRecords = [...list, cloneDeep(vals)].slice(-MAX_RECORD_SIZE);
      return {
        records: newRecords,
        index: Math.min(prev.index + 1, MAX_RECORD_SIZE - 1),
      };
    });
  }, [formState]);

  return <RecordContext.Provider value={value}>{props.children}</RecordContext.Provider>;
};
