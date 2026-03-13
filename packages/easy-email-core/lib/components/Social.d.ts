import { RecursivePartial } from '../typings';
import React from 'react';
import { ISocial } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type SocialProps = RecursivePartial<ISocial['data']> & RecursivePartial<ISocial['attributes']> & {
    children?: MjmlBlockProps<ISocial>['children'];
};
export declare function Social(props: SocialProps): React.JSX.Element;
