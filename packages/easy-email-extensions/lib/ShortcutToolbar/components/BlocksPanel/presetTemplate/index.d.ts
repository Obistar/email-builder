import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { TextBlockItem } from './TextBlockItem';
import { ImageBlockItem } from './ImageBlockItem';
export declare const defaultCategories: {
    readonly title: string;
    name: string;
    blocks: ({
        type: AdvancedType;
        readonly title: string;
        readonly description: string;
        component: typeof TextBlockItem;
    } | {
        type: AdvancedType;
        readonly title: string;
        readonly description: React.JSX.Element;
        component: typeof ImageBlockItem;
    })[];
}[];
