export { ElementType, EmberElement, isEmberElement };
/** Type specifyer for ember elements. */
declare enum ElementType {
    Parameter = "PARAMETER",
    Node = "NODE",
    Command = "COMMAND",
    Matrix = "MATRIX",
    Function = "FUNCTION",
    Template = "TEMPLATE"
}
/** Generic type for all ember elements. */
interface EmberElement {
    type: ElementType;
}
declare function isEmberElement(obj: any): obj is EmberElement;
