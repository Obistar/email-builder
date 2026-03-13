import { RecursivePartial } from '../typings';
import React from 'react';
import { IAccordion } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type AccordionProps = RecursivePartial<IAccordion['data']> & RecursivePartial<IAccordion['attributes']> & {
    children?: MjmlBlockProps<IAccordion>['children'];
};
export declare function Accordion(props: AccordionProps): React.JSX.Element;
