import { InputProps as ArcoInputProps } from '@arco-design/web-react';
import React from 'react';
export interface InputProps extends Omit<ArcoInputProps, 'onChange'> {
    quickchange?: boolean;
    value: string;
    onChange: (val: string) => void;
}
export declare function Input(props: InputProps): React.JSX.Element;
