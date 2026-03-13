import { PopoverProps } from '@arco-design/web-react';
import React from 'react';
export interface LinkProps extends PopoverProps {
    currentRange: Range | null | undefined;
    onChange: () => void;
}
export declare function Underline(props: LinkProps): React.JSX.Element;
