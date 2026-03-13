import { RecursivePartial } from '../typings';
import React from 'react';
import { IAccordionTitle } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type AccordionTitleProps = RecursivePartial<IAccordionTitle['data']> & RecursivePartial<IAccordionTitle['attributes']> & {
    children?: MjmlBlockProps<IAccordionTitle>['children'];
};
export declare function AccordionTitle(props: AccordionTitleProps): React.JSX.Element;
