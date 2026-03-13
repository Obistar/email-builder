import React from 'react';
export interface ColorPickerContentProps {
    onChange: (val: string) => void;
    value: string;
}
export declare function ColorPickerContent(props: ColorPickerContentProps): React.JSX.Element;
