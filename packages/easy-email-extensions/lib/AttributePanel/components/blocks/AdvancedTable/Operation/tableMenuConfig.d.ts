import TableOperationMenu from './tableOperationMenu';
declare const MENU_CONFIG: {
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
export default MENU_CONFIG;
