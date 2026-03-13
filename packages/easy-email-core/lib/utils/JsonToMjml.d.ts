import { JsonToMjmlOption } from './isProductionMode';
import React from 'react';
import { IBlockData } from '../typings';
type EmailRenderProps = {
    children?: React.ReactNode;
    context?: IBlockData;
    dataSource?: Record<string, any>;
    mode: 'production' | 'testing';
};
export declare function JsonToMjml(options: JsonToMjmlOption): string;
export declare const useEmailRenderContext: () => EmailRenderProps;
export {};
