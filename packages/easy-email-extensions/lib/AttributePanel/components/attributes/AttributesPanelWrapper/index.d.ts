import React from 'react';
export interface AttributesPanelWrapper {
    style?: React.CSSProperties;
    extra?: React.ReactNode;
    children: React.ReactNode | React.ReactElement;
}
export declare const AttributesPanelWrapper: React.FC<AttributesPanelWrapper>;
