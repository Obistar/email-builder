import { RecursivePartial } from '../typings';
import React from 'react';
import { INavbar } from '../blocks';
import { MjmlBlockProps } from '../components/MjmlBlock';
export type NavbarProps = RecursivePartial<INavbar['data']> & RecursivePartial<INavbar['attributes']> & {
    children?: MjmlBlockProps<INavbar>['children'];
};
export declare function Navbar(props: NavbarProps): React.JSX.Element;
