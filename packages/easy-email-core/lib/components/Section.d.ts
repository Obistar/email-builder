import { RecursivePartial } from '../typings';
import React from 'react';
import { ISection } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type SectionProps = RecursivePartial<ISection['data']> & RecursivePartial<ISection['attributes']> & {
    children?: MjmlBlockProps<ISection>['children'];
};
export declare function Section(props: SectionProps): React.JSX.Element;
