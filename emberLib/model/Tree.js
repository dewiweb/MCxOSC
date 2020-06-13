"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualifiedElementImpl = exports.NumberedTreeNodeImpl = void 0;
class TreeElementImpl {
    constructor(contents, children, parent) {
        this.contents = contents;
        this.children = children;
        this.parent = parent;
    }
}
class NumberedTreeNodeImpl extends TreeElementImpl {
    constructor(number, contents, children, parent) {
        super(contents, children, parent);
        this.number = number;
    }
}
exports.NumberedTreeNodeImpl = NumberedTreeNodeImpl;
class QualifiedElementImpl extends TreeElementImpl {
    constructor(path, contents, children) {
        super(contents, children);
        this.path = path;
        this.parent = undefined;
    }
}
exports.QualifiedElementImpl = QualifiedElementImpl;
