import { InputProps as ArcoInputProps } from '@arco-design/web-react';
import React from 'react';
export interface InputWithUnitProps extends Omit<ArcoInputProps, 'onChange'> {
    value: string;
    onChange: (val: string) => void;
    unitOptions?: Array<{
        value: string;
        label: string;
    }> | 'default' | 'percent';
    quickchange?: boolean;
}
export declare function InputWithUnit(props: InputWithUnitProps): React.JSX.Element;
