import React from 'react';
export default function CodemirrorEditor(props: {
    value: string;
    onChange(val: string): void;
}): React.JSX.Element;
