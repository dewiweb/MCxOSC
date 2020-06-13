"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmberNodeImpl = void 0;
const EmberElement_1 = require("./EmberElement");
class EmberNodeImpl {
    constructor(identifier, description, isRoot, isOnline, schemaIdentifiers, templateReference) {
        this.identifier = identifier;
        this.description = description;
        this.isRoot = isRoot;
        this.isOnline = isOnline;
        this.schemaIdentifiers = schemaIdentifiers;
        this.templateReference = templateReference;
        this.type = EmberElement_1.ElementType.Node;
    }
}
exports.EmberNodeImpl = EmberNodeImpl;
