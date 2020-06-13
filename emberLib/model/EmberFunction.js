"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmberFunctionImpl = void 0;
const EmberElement_1 = require("./EmberElement");
class EmberFunctionImpl {
    constructor(identifier, description, args, result, templateReference) {
        this.identifier = identifier;
        this.description = description;
        this.args = args;
        this.result = result;
        this.templateReference = templateReference;
        this.type = EmberElement_1.ElementType.Function;
    }
}
exports.EmberFunctionImpl = EmberFunctionImpl;
