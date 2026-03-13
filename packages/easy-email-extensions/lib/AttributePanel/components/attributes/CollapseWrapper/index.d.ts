import React from 'react';
export interface CollapseWrapperProps {
    defaultActiveKey: string[];
    children: React.ReactNode | React.ReactElement;
}
export declare const CollapseWrapper: React.FC<CollapseWrapperProps>;
