"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateImpl = void 0;
const EmberElement_1 = require("./EmberElement");
class TemplateImpl {
    constructor(element, description) {
        this.element = element;
        this.description = description;
        this.type = EmberElement_1.ElementType.Template;
    }
}
exports.TemplateImpl = TemplateImpl;
