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
exports.encodeParameter = void 0;
const Ber = __importStar(require("../../../Ber"));
const Parameter_1 = require("../../../model/Parameter");
const StringIntegerCollection_1 = require("./StringIntegerCollection");
const StreamDescription_1 = require("./StreamDescription");
// import { elementTypeToInt } from './Matrix'
function encodeParameter(parameter, writer) {
    writer.startSequence(Ber.BERDataTypes.SET);
    const writeValue = (value) => {
        switch (parameter.parameterType) {
            case Parameter_1.ParameterType.Null:
                writer.writeNull();
                break;
            case Parameter_1.ParameterType.Integer:
                writer.writeInt(Number(value), Ber.BERDataTypes.INTEGER);
                break;
            case Parameter_1.ParameterType.Real:
                writer.writeReal(Number(value), Ber.BERDataTypes.REAL);
                break;
            case Parameter_1.ParameterType.String:
                writer.writeString(value + '', Ber.BERDataTypes.STRING);
                break;
            case Parameter_1.ParameterType.Boolean:
                writer.writeBoolean(value, Ber.BERDataTypes.BOOLEAN);
                break;
            // case ParameterType.Trigger:
            // 	break
            case Parameter_1.ParameterType.Enum:
                // value is encoded as Int64, it refers to the line number of the enumeration
                writer.writeInt(value, Ber.BERDataTypes.INTEGER);
                break;
            case Parameter_1.ParameterType.Octets:
                writer.writeBuffer(value, Ber.BERDataTypes.OCTETSTRING);
                break;
            default:
                writer.writeValue(value);
        }
    };
    writer.writeIfDefined(parameter.identifier, writer.writeString, 0, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(parameter.description, writer.writeString, 1, Ber.BERDataTypes.STRING);
    if (parameter.value !== undefined) {
        writer.startSequence(Ber.CONTEXT(2));
        writeValue(parameter.value);
        writer.endSequence();
    }
    if (parameter.minimum !== undefined) {
        writer.startSequence(Ber.CONTEXT(3));
        writeValue(parameter.minimum);
        writer.endSequence();
    }
    if (parameter.maximum !== undefined) {
        writer.startSequence(Ber.CONTEXT(4));
        writeValue(parameter.maximum);
        writer.endSequence();
    }
    writer.writeIfDefined(parameter.access && parameterAccessToInt(parameter.access), writer.writeInt, 5, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(parameter.format, writer.writeString, 6, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(parameter.enumeration, writer.writeString, 7, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(parameter.factor, writer.writeInt, 8, Ber.BERDataTypes.INTEGER);
    writer.writeIfDefined(parameter.isOnline, writer.writeBoolean, 9, Ber.BERDataTypes.BOOLEAN);
    writer.writeIfDefined(parameter.formula, writer.writeString, 10, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(parameter.step, writer.writeInt, 11, Ber.BERDataTypes.INTEGER);
    if (parameter.defaultValue !== undefined) {
        writer.startSequence(Ber.CONTEXT(12));
        writeValue(parameter.defaultValue);
        writer.endSequence();
    }
    if (parameter.parameterType) {
        writer.startSequence(Ber.CONTEXT(13));
        writer.writeInt(parameterTypeToInt(parameter.parameterType));
        writer.endSequence();
    }
    writer.writeIfDefined(parameter.streamIdentifier, writer.writeInt, 14, Ber.BERDataTypes.INTEGER);
    if (parameter.enumMap != null) {
        writer.startSequence(Ber.CONTEXT(15));
        StringIntegerCollection_1.encodeStringIntegerCollection(parameter.enumMap, writer);
        writer.endSequence();
    }
    if (parameter.streamDescriptor != null) {
        writer.startSequence(Ber.CONTEXT(16));
        StreamDescription_1.encodeStreamDescription(parameter.streamDescriptor, writer);
        writer.endSequence();
    }
    writer.writeIfDefined(parameter.schemaIdentifiers, writer.writeString, 17, Ber.BERDataTypes.STRING);
    writer.writeIfDefined(parameter.templateReference, writer.writeString, 18, Ber.BERDataTypes.STRING);
    writer.endSequence();
}
exports.encodeParameter = encodeParameter;
function parameterAccessToInt(parameter) {
    const paramToInt = {
        [Parameter_1.ParameterAccess.None]: 0,
        [Parameter_1.ParameterAccess.Read]: 1,
        [Parameter_1.ParameterAccess.Write]: 2,
        [Parameter_1.ParameterAccess.ReadWrite]: 3
    };
    return paramToInt[parameter];
}
function parameterTypeToInt(pt) {
    const paramTypeToInt = {
        [Parameter_1.ParameterType.Null]: 0,
        [Parameter_1.ParameterType.Integer]: 1,
        [Parameter_1.ParameterType.Real]: 2,
        [Parameter_1.ParameterType.String]: 3,
        [Parameter_1.ParameterType.Boolean]: 4,
        [Parameter_1.ParameterType.Trigger]: 5,
        [Parameter_1.ParameterType.Enum]: 6,
        [Parameter_1.ParameterType.Octets]: 7
    };
    return paramTypeToInt[pt];
}
