import { IBoundingPosition, IOperationData } from './type';
export default class TableOperationMenu {
    menuItems: {
        insertColumnRight: {
            text: string;
            icon: string;
            handler(): void;
        };
        insertColumnLeft: {
            text: string;
            icon: string;
            handler(): void;
        };
        insertRowUp: {
            text: string;
            icon: string;
            handler(): void;
        };
        insertRowDown: {
            text: string;
            icon: string;
            handler(): void;
        };
        mergeCells: {
            text: string;
            icon: string;
            handler(): void;
        };
        deleteColumn: {
            text: string;
            icon: string;
            handler(): void;
        };
        deleteRow: {
            text: string;
            icon: string;
            handler(): void;
        };
        setCellBg: {
            text: string;
            render(tableOperationMenu: TableOperationMenu): HTMLDivElement;
            handler(color: string): void;
        };
    };
    domNode: Element | undefined;
    styleDom?: HTMLStyleElement;
    visible: boolean;
    changeTableData?: (e: IOperationData[][]) => void;
    tableData: IOperationData[][];
    tableIndexBoundary: IBoundingPosition;
    maxTdCount: number;
    constructor();
    mount(): void;
    destroy(): void;
    hide(): void;
    addRow(insertIndex: number, colCount: number): void;
    setTableData(tableData: IOperationData[][]): void;
    setTableIndexBoundary(tableIndexBoundary: IBoundingPosition): void;
    showMenu({ x, y }: {
        x: number;
        y: number;
    }): void;
    menuInitial(): void;
    menuItemCreator({ text, icon, handler }: any): HTMLDivElement;
}
