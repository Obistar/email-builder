import { RecursivePartial } from '../typings';
import React from 'react';
import { IButton } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type ButtonProps = RecursivePartial<IButton['data']> & RecursivePartial<IButton['attributes']> & {
    children?: MjmlBlockProps<IButton>['children'];
};
export declare function Button(props: ButtonProps): React.JSX.Element;
