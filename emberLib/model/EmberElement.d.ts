import { Parameter } from './Parameter';
import { EmberFunction } from './EmberFunction';
import { EmberNode } from './EmberNode';
import { Matrix } from './Matrix';
import { Command } from './Command';
import { Template } from './Template';
export { ElementType, EmberElement, EmberBaseElement, isEmberElement };
/** Type specifyer for ember elements. */
declare enum ElementType {
    Parameter = "PARAMETER",
    Node = "NODE",
    Command = "COMMAND",
    Matrix = "MATRIX",
    Function = "FUNCTION",
    Template = "TEMPLATE"
}
declare type EmberElement = Command | EmberFunction | EmberNode | Matrix | Parameter | Template;
/** Generic type for all ember elements. */
interface EmberBaseElement {
    type: ElementType;
}
declare function isEmberElement(obj: any): obj is EmberElement;
