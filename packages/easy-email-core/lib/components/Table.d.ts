import { RecursivePartial } from '../typings';
import React from 'react';
import { ITable } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type TableProps = RecursivePartial<ITable['data']> & RecursivePartial<ITable['attributes']> & {
    children?: MjmlBlockProps<ITable>['children'];
};
export declare function Table(props: TableProps): React.JSX.Element;
