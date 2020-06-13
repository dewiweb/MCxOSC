"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeFunctionArgument = void 0;
const Ber = __importStar(require("../../../Ber"));
const Errors_1 = require("../../../Errors");
const Parameter_1 = require("../../../model/Parameter");
const constants_1 = require("../constants");
function encodeFunctionArgument(arg, writer) {
    writer.startSequence(constants_1.FunctionArgumentBERID);
    if (arg.type == null) {
        throw new Errors_1.InvalidEmberNode('', 'FunctionArgument requires a type');
    }
    writer.startSequence(Ber.CONTEXT(0));
    writeParameterType(arg.type, writer);
    writer.endSequence();
    if (arg.name != null) {
        writer.startSequence(Ber.CONTEXT(1));
        writer.writeString(arg.name, Ber.BERDataTypes.STRING);
        writer.endSequence();
    }
    writer.endSequence();
}
exports.encodeFunctionArgument = encodeFunctionArgument;
function writeParameterType(type, writer) {
    const typeToInt = {
        [Parameter_1.ParameterType.Null]: 0,
        [Parameter_1.ParameterType.Integer]: 1,
        [Parameter_1.ParameterType.Real]: 2,
        [Parameter_1.ParameterType.String]: 3,
        [Parameter_1.ParameterType.Boolean]: 4,
        [Parameter_1.ParameterType.Trigger]: 5,
        [Parameter_1.ParameterType.Enum]: 6,
        [Parameter_1.ParameterType.Octets]: 7
    };
    writer.writeInt(typeToInt[type]);
}
