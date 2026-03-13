import { RecursivePartial } from '../typings';
import React from 'react';
import { IDivider } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type DividerProps = RecursivePartial<IDivider['data']> & RecursivePartial<IDivider['attributes']> & {
    children?: MjmlBlockProps<IDivider>['children'];
};
export declare function Divider(props: DividerProps): React.JSX.Element;
