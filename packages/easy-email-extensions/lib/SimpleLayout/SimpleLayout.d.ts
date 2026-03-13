import React from 'react';
import { BlockLayerProps } from '../BlockLayer';
export declare const SimpleLayout: React.FC<{
    showSourceCode?: boolean;
    jsonReadOnly?: boolean;
    mjmlReadOnly?: boolean;
    defaultShowLayer?: boolean;
    children: React.ReactNode | React.ReactElement;
} & BlockLayerProps>;
