import { RelativeOID } from '../types/types';
export { Label, LabelImpl };
/** Labelled nodes. */
interface Label {
    /** Absolute path to a node under which label parameters associated with signals reside. */
    basePath: RelativeOID;
    /** Free-text description of the label. Used by consumers to let the user choose the label to display. */
    description: string;
}
declare class LabelImpl implements Label {
    basePath: string;
    description: string;
    constructor(basePath: string, description: string);
}
