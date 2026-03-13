import { RecursivePartial } from '../typings';
import React from 'react';
import { IColumn } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type ColumnProps = RecursivePartial<IColumn['data']> & RecursivePartial<IColumn['attributes']> & {
    children?: MjmlBlockProps<IColumn>['children'];
};
export declare function Column(props: ColumnProps): React.JSX.Element;
