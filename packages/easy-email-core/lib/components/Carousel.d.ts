import { RecursivePartial } from '../typings';
import React from 'react';
import { ICarousel } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type CarouselProps = RecursivePartial<ICarousel['data']> & RecursivePartial<ICarousel['attributes']> & {
    children?: MjmlBlockProps<ICarousel>['children'];
};
export declare function Carousel(props: CarouselProps): React.JSX.Element;
