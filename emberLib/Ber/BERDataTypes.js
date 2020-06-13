"use strict";
/**  ITU-TX.690 (08/2015) Chapter 8 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BERDataTypes = void 0;
var BERDataTypes;
(function (BERDataTypes) {
    BERDataTypes[BERDataTypes["BOOLEAN"] = 1] = "BOOLEAN";
    BERDataTypes[BERDataTypes["INTEGER"] = 2] = "INTEGER";
    BERDataTypes[BERDataTypes["BITSTRING"] = 3] = "BITSTRING";
    BERDataTypes[BERDataTypes["OCTETSTRING"] = 4] = "OCTETSTRING";
    BERDataTypes[BERDataTypes["NULL"] = 5] = "NULL";
    BERDataTypes[BERDataTypes["OBJECTIDENTIFIER"] = 6] = "OBJECTIDENTIFIER";
    BERDataTypes[BERDataTypes["OBJECTDESCRIPTOR"] = 7] = "OBJECTDESCRIPTOR";
    BERDataTypes[BERDataTypes["EXTERNAL"] = 8] = "EXTERNAL";
    BERDataTypes[BERDataTypes["REAL"] = 9] = "REAL";
    BERDataTypes[BERDataTypes["ENUMERATED"] = 10] = "ENUMERATED";
    BERDataTypes[BERDataTypes["EMBEDDED"] = 11] = "EMBEDDED";
    BERDataTypes[BERDataTypes["STRING"] = 12] = "STRING";
    BERDataTypes[BERDataTypes["RELATIVE_OID"] = 13] = "RELATIVE_OID";
    BERDataTypes[BERDataTypes["SEQUENCE"] = 48] = "SEQUENCE";
    BERDataTypes[BERDataTypes["SET"] = 49] = "SET";
})(BERDataTypes || (BERDataTypes = {}));
exports.BERDataTypes = BERDataTypes;
