import React from 'react';
import { AutoCompleteProps as ArcoAutoCompleteProps } from '@arco-design/web-react';
export interface AutoCompleteProps extends Omit<ArcoAutoCompleteProps, 'onChange' | 'options'> {
    quickchange?: boolean;
    value: string;
    options: Array<{
        value: any;
        label: any;
    }>;
    onChange: (val: string) => void;
    showSearch?: boolean;
}
export declare function AutoComplete(props: AutoCompleteProps): React.JSX.Element;
