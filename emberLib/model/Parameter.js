"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterImpl = exports.isParameter = exports.ParameterAccess = exports.ParameterType = void 0;
const EmberElement_1 = require("./EmberElement");
var ParameterType;
(function (ParameterType) {
    ParameterType["Null"] = "NULL";
    ParameterType["Integer"] = "INTEGER";
    ParameterType["Real"] = "REAL";
    ParameterType["String"] = "STRING";
    ParameterType["Boolean"] = "BOOLEAN";
    ParameterType["Trigger"] = "TRIGGER";
    ParameterType["Enum"] = "ENUM";
    ParameterType["Octets"] = "OCTETS";
})(ParameterType || (ParameterType = {}));
exports.ParameterType = ParameterType;
var ParameterAccess;
(function (ParameterAccess) {
    ParameterAccess["None"] = "NONE";
    ParameterAccess["Read"] = "READ";
    ParameterAccess["Write"] = "WRITE";
    ParameterAccess["ReadWrite"] = "READ_WRITE";
})(ParameterAccess || (ParameterAccess = {}));
exports.ParameterAccess = ParameterAccess;
/**
 * Type predicate for Parameter interface.
 * TODO: write tests for actual values and optional properties
 *
 * @param obj - object to check
 * @returns true if object is a valid Parameter, false if not
 */
function isParameter(obj) {
    if (!EmberElement_1.isEmberElement(obj)) {
        return false;
    }
    const { type, parameterType, templateReference } = obj;
    if (type !== EmberElement_1.ElementType.Parameter) {
        return false;
    }
    if (!parameterType || !templateReference) {
        return false;
    }
    return true;
}
exports.isParameter = isParameter;
class ParameterImpl {
    constructor(parameterType, identifier, description, value, maximum, minimum, access, format, enumeration, factor, // Integer32
    isOnline, formula, step, // Integer32
    defaultValue, streamIdentifier, // BER readInt
    enumMap, streamDescriptor, schemaIdentifiers, templateReference) {
        this.parameterType = parameterType;
        this.identifier = identifier;
        this.description = description;
        this.value = value;
        this.maximum = maximum;
        this.minimum = minimum;
        this.access = access;
        this.format = format;
        this.enumeration = enumeration;
        this.factor = factor;
        this.isOnline = isOnline;
        this.formula = formula;
        this.step = step;
        this.defaultValue = defaultValue;
        this.streamIdentifier = streamIdentifier;
        this.enumMap = enumMap;
        this.streamDescriptor = streamDescriptor;
        this.schemaIdentifiers = schemaIdentifiers;
        this.templateReference = templateReference;
        this.type = EmberElement_1.ElementType.Parameter;
    }
}
exports.ParameterImpl = ParameterImpl;
