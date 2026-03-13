import { RecursivePartial } from '../typings';
import React from 'react';
import { IRaw } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type RawProps = RecursivePartial<IRaw['data']> & RecursivePartial<IRaw['attributes']> & {
    children?: MjmlBlockProps<IRaw>['children'];
};
export declare function Raw(props: RawProps): React.JSX.Element;
