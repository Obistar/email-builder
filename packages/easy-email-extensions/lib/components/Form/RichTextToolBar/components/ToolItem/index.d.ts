import React from 'react';
export declare const ToolItem: React.ForwardRefExoticComponent<{
    title?: string | undefined;
    icon: React.ReactNode;
    onClick?: React.MouseEventHandler<any> | undefined;
    trigger?: string | undefined;
    style?: React.CSSProperties | undefined;
    isActive?: boolean | undefined;
} & React.RefAttributes<HTMLButtonElement>>;
