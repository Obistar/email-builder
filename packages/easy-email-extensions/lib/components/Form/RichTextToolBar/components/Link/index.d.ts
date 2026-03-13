import { PopoverProps } from '@arco-design/web-react';
import React from 'react';
export interface LinkParams {
    link: string;
    blank: boolean;
    underline: boolean;
    linkNode: HTMLAnchorElement | null;
}
export interface LinkProps extends PopoverProps {
    currentRange: Range | null | undefined;
    onChange: (val: LinkParams) => void;
}
export declare function getLinkNode(currentRange: Range | null | undefined): HTMLAnchorElement | null;
export declare function Link(props: LinkProps): React.JSX.Element;
