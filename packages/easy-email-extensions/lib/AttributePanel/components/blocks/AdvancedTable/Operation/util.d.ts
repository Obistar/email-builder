import { IBoundaryRect, IBoundingPosition, IOperationData } from './type';
import { AdvancedTableBlock } from 'easy-email-core';
export declare const getBoundaryRectAndElement: (el1: Element, el2: Element) => {
    leftTopCell: Element;
    bottomRightCell: Element;
    boundary: IBoundaryRect;
} | null;
export declare function setStyle(domNode: any, rules: any): void;
export declare const getCurrentTable: (target: Element) => ParentNode | null;
export declare const getElementsBoundary: (el1: Element, el2: Element) => IBoundingPosition;
export declare const checkEventInBoundingRect: (rect: IBoundingPosition, { x, y }: {
    x: number;
    y: number;
}) => boolean;
export declare const getCellAttr: (el: Element, attrName: string) => number;
export declare const getTdBoundaryIndex: (leftTopCell: Element, bottomRightCell: Element) => {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare const getCorrectTableIndexBoundary: (tableIndexBoundary: IBoundingPosition, tableData: IOperationData[][]) => IBoundingPosition;
export declare const getMaxTdCount: (tableData: AdvancedTableBlock['data']['value']['tableSource']) => number;
