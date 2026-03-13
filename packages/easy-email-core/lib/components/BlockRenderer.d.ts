import { IBlock } from '../typings';
import React from 'react';
type BlockDataItem = Omit<Parameters<IBlock['render']>[0], 'mode' | 'context' | 'dataSource'>;
export declare const BlockRenderer: (props: BlockDataItem) => React.JSX.Element | null;
export {};
