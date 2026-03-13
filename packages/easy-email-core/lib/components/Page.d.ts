import { RecursivePartial } from '../typings';
import React from 'react';
import { IPage } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type PageProps = RecursivePartial<IPage['data']> & RecursivePartial<IPage['attributes']> & {
    children?: MjmlBlockProps<IPage>['children'];
};
export declare function Page(props: PageProps): React.JSX.Element;
