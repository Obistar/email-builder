import { RecursivePartial } from '../typings';
import React from 'react';
import { IAccordionText } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type AccordionTextProps = RecursivePartial<IAccordionText['data']> & RecursivePartial<IAccordionText['attributes']> & {
    children?: MjmlBlockProps<IAccordionText>['children'];
};
export declare function AccordionText(props: AccordionTextProps): React.JSX.Element;
