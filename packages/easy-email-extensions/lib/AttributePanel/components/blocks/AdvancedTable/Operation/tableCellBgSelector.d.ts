interface CellBackgroundSelectorProps {
    bgColorHandler: (color: string) => void;
    rootDom: Element;
}
declare const getCellBackgroundSelectorRoot: (bgColorHandler: CellBackgroundSelectorProps['bgColorHandler'], rootDom: any) => HTMLDivElement;
export default getCellBackgroundSelectorRoot;
