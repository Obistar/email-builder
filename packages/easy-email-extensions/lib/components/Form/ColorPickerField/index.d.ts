import React, { ComponentProps } from 'react';
import { ColorPickerProps } from '../ColorPicker';
declare const ColorPickerFieldSource: (props: import("../enhancer").EnhancerProps & Omit<ColorPickerProps, "value" | "onChange" | "mutators">) => React.JSX.Element;
export declare const ColorPickerField: (props: ComponentProps<typeof ColorPickerFieldSource>) => React.JSX.Element;
export {};
