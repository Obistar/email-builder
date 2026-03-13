import { RecursivePartial } from '../typings';
import React from 'react';
import { IImage } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type ImageProps = RecursivePartial<IImage['data']> & RecursivePartial<IImage['attributes']> & {
    children?: MjmlBlockProps<IImage>['children'];
};
export declare function Image(props: ImageProps): React.JSX.Element;
