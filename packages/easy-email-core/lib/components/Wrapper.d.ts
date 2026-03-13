import { RecursivePartial } from '../typings';
import React from 'react';
import { IWrapper } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type WrapperProps = RecursivePartial<IWrapper['data']> & RecursivePartial<IWrapper['attributes']> & {
    children?: MjmlBlockProps<IWrapper>['children'];
};
export declare function Wrapper(props: WrapperProps): React.JSX.Element;
