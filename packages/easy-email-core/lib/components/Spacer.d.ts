import { RecursivePartial } from '../typings';
import React from 'react';
import { ISpacer } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type SpacerProps = RecursivePartial<ISpacer['data']> & RecursivePartial<ISpacer['attributes']> & {
    children?: MjmlBlockProps<ISpacer>['children'];
};
export declare function Spacer(props: SpacerProps): React.JSX.Element;
