import { RecursivePartial } from '../typings';
import React from 'react';
import { IHero } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type HeroProps = RecursivePartial<IHero['data']> & RecursivePartial<IHero['attributes']> & {
    children?: MjmlBlockProps<IHero>['children'];
};
export declare function Hero(props: HeroProps): React.JSX.Element;
