import { CSSProperties } from 'react';
import { IBlockData } from '../../../typings';
export type ISection = IBlockData<{
    'background-color'?: string;
    'background-position'?: string;
    'background-position-x'?: string;
    'background-position-y'?: string;
    'background-repeat'?: 'repeat' | 'no-repeat';
    'background-size'?: string;
    'background-url'?: string;
    border?: string;
    'border-radius'?: string;
    direction?: 'ltr' | 'rtl';
    'full-width'?: string;
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
    'max-width'?: string;
}, {}>;
export declare const Section: import("../../../typings").IBlock<ISection>;
