import React from 'react';
export interface PaddingProps {
    title?: string;
    attributeName?: 'padding' | 'inner-padding' | 'text-padding';
    name?: string;
    showResetAll?: boolean;
}
export declare function Padding(props?: PaddingProps): React.JSX.Element;
