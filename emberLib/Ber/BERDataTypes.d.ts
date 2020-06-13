/**  ITU-TX.690 (08/2015) Chapter 8 */
declare enum BERDataTypes {
    BOOLEAN = 1,
    INTEGER = 2,
    BITSTRING = 3,
    OCTETSTRING = 4,
    NULL = 5,
    OBJECTIDENTIFIER = 6,
    OBJECTDESCRIPTOR = 7,
    EXTERNAL = 8,
    REAL = 9,
    ENUMERATED = 10,
    EMBEDDED = 11,
    STRING = 12,
    RELATIVE_OID = 13,
    SEQUENCE = 48,
    SET = 49
}
export { BERDataTypes };
