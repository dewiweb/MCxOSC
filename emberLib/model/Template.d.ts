import { ElementType, EmberBaseElement } from './EmberElement';
import { Parameter } from './Parameter';
import { Matrix } from './Matrix';
import { EmberFunction } from './EmberFunction';
import { EmberNode } from './EmberNode';
import { NumberedTreeNode } from '../types/types';
export { Template, TemplateImpl };
/**
 *  Common set of parameters, attributes and sub-trees that can be referred to
 *  by other elements.
 */
interface Template extends EmberBaseElement {
    type: ElementType.Template;
    /** Templated properties. */
    element?: NumberedTreeNode<Parameter | EmberNode | Matrix | EmberFunction>;
    /** Details of the template. */
    description?: string;
}
declare class TemplateImpl implements Template {
    element?: NumberedTreeNode<Parameter | EmberFunction | EmberNode | Matrix> | undefined;
    description?: string | undefined;
    readonly type: ElementType.Template;
    constructor(element?: NumberedTreeNode<Parameter | EmberFunction | EmberNode | Matrix> | undefined, description?: string | undefined);
}
