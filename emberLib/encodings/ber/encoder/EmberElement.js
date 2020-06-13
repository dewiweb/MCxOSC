"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeEmberElement = void 0;
const EmberElement_1 = require("../../../model/EmberElement");
const Command_1 = require("./Command");
const Parameter_1 = require("./Parameter");
const EmberNode_1 = require("./EmberNode");
const Matrix_1 = require("./Matrix");
const EmberFunction_1 = require("./EmberFunction");
const Template_1 = require("./Template");
function encodeEmberElement(el, writer) {
    switch (el.type) {
        case EmberElement_1.ElementType.Command:
            Command_1.encodeCommand(el, writer);
            break;
        case EmberElement_1.ElementType.Parameter:
            Parameter_1.encodeParameter(el, writer);
            break;
        case EmberElement_1.ElementType.Node:
            EmberNode_1.encodeNode(el, writer);
            break;
        case EmberElement_1.ElementType.Matrix:
            Matrix_1.encodeMatrix(el, writer);
            break;
        case EmberElement_1.ElementType.Function:
            EmberFunction_1.encodeFunction(el, writer);
            break;
        case EmberElement_1.ElementType.Template:
            Template_1.encodeTemplate(el, writer);
            break;
    }
}
exports.encodeEmberElement = encodeEmberElement;
