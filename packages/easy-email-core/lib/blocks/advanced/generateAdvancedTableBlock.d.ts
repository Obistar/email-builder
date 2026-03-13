import { BasicType } from '../../constants';
import { IBlock, IBlockData } from '../../typings';
export declare function generateAdvancedTableBlock(option: {
    type: string;
    baseType: BasicType;
}): IBlock<AdvancedTableBlock>;
export interface IAdvancedTableData {
    content: string;
    colSpan?: number;
    rowSpan?: number;
    backgroundColor?: string;
}
export type AdvancedTableBlock = IBlockData<{
    cellPadding?: string;
    cellBorderColor?: string;
    'font-style'?: string;
    'text-align'?: string;
}, {
    content?: string;
    tableSource: IAdvancedTableData[][];
}>;
