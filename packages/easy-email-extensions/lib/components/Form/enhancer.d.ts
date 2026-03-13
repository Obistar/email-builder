import { UseFieldConfig } from 'react-final-form';
import React from 'react';
import { FormItemProps } from '@arco-design/web-react';
export interface EnhancerProps {
    name: string;
    onChangeAdapter?: (value: any) => any;
    validate?: (value: any) => string | undefined | Promise<string | undefined>;
    config?: UseFieldConfig<any, any>;
    changeOnBlur?: boolean;
    formItem?: FormItemProps;
    label?: FormItemProps['label'];
    inline?: boolean;
    equalSpacing?: boolean;
    required?: boolean;
    autoComplete?: 'on' | 'off';
    style?: React.CSSProperties;
    helpText?: React.ReactNode;
    debounceTime?: number;
    labelHidden?: boolean;
}
export default function enhancer<P extends {
    onChange?: (...rest: any) => any;
}>(Component: React.FC<any>, changeAdapter: (args: Parameters<NonNullable<P['onChange']>>) => any, option?: {
    debounceTime: number;
}): (props: EnhancerProps & Omit<P, 'value' | 'onChange' | 'mutators'>) => React.JSX.Element;
