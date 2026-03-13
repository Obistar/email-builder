import TableOperationMenu from './tableOperationMenu';
import { AdvancedTableBlock } from 'easy-email-core';
interface IBorderTool {
    top: Element;
    bottom: Element;
    left: Element;
    right: Element;
}
declare class TableColumnTool {
    borderTool: IBorderTool;
    dragging: boolean;
    showBorderTool: boolean;
    startRect: {
        width: number;
        height: number;
    };
    startTdTop: number;
    startTdLeft: number;
    endTdTop: number;
    endTdLeft: number;
    width: number;
    height: number;
    selectedLeftTopCell: Element | undefined;
    selectedBottomRightCell: Element | undefined;
    startDom: Element | undefined;
    endDom: Element | undefined;
    hoveringTable: ParentNode | null;
    root: Element | undefined;
    tableMenu?: TableOperationMenu;
    changeTableData?: (e: AdvancedTableBlock['data']['value']['tableSource']) => void;
    tableData: AdvancedTableBlock['data']['value']['tableSource'];
    constructor(borderTool: IBorderTool, root: Element);
    initTool(): void;
    destroy(): void;
    hideBorder: (e: any) => void;
    hideBorderByKeyDown: () => void;
    hideTableMenu: (e?: any) => void;
    visibleBorder: (show?: boolean) => void;
    renderBorder: () => void;
    handleContextmenu: (event: any) => void;
    handleMousedown(event: any): void;
    handleDrag: (e: any) => void;
    handleMouseup: (e: any) => void;
}
export default TableColumnTool;
