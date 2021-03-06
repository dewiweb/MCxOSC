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
exports.QualifiedTemplateBERID = exports.TemplateBERID = exports.InvocationResultBERID = exports.InvocationBERID = exports.FunctionArgumentBERID = exports.QualifiedFunctionBERID = exports.FunctionBERID = exports.LabelBERID = exports.QualifiedMatrixBERID = exports.ConnectionBERID = exports.SourceBERID = exports.TargetBERID = exports.MatrixBERID = exports.StreamDescriptionBERID = exports.RootElementsBERID = exports.QualifiedNodeBERID = exports.QualifiedParameterBERID = exports.StringIntegerCollectionBERID = exports.StringIntegerPairBERID = exports.StreamEntriesBERID = exports.StreamEntryBERID = exports.ElementCollectionBERID = exports.NodeBERID = exports.CommandBERID = exports.ParameterBERID = exports.RootBERID = void 0;
const Ber = __importStar(require("../../Ber"));
const RootBERID = Ber.APPLICATION(0);
exports.RootBERID = RootBERID;
const ParameterBERID = Ber.APPLICATION(1);
exports.ParameterBERID = ParameterBERID;
const CommandBERID = Ber.APPLICATION(2);
exports.CommandBERID = CommandBERID;
const NodeBERID = Ber.APPLICATION(3);
exports.NodeBERID = NodeBERID;
const ElementCollectionBERID = Ber.APPLICATION(4);
exports.ElementCollectionBERID = ElementCollectionBERID;
const StreamEntryBERID = Ber.APPLICATION(5);
exports.StreamEntryBERID = StreamEntryBERID;
const StreamEntriesBERID = Ber.APPLICATION(6);
exports.StreamEntriesBERID = StreamEntriesBERID;
const StringIntegerPairBERID = Ber.APPLICATION(7);
exports.StringIntegerPairBERID = StringIntegerPairBERID;
const StringIntegerCollectionBERID = Ber.APPLICATION(8);
exports.StringIntegerCollectionBERID = StringIntegerCollectionBERID;
const QualifiedParameterBERID = Ber.APPLICATION(9);
exports.QualifiedParameterBERID = QualifiedParameterBERID;
const QualifiedNodeBERID = Ber.APPLICATION(10);
exports.QualifiedNodeBERID = QualifiedNodeBERID;
const RootElementsBERID = Ber.APPLICATION(11);
exports.RootElementsBERID = RootElementsBERID;
const StreamDescriptionBERID = Ber.APPLICATION(12);
exports.StreamDescriptionBERID = StreamDescriptionBERID;
const MatrixBERID = Ber.APPLICATION(13);
exports.MatrixBERID = MatrixBERID;
const TargetBERID = Ber.APPLICATION(14);
exports.TargetBERID = TargetBERID;
const SourceBERID = Ber.APPLICATION(15);
exports.SourceBERID = SourceBERID;
const ConnectionBERID = Ber.APPLICATION(16);
exports.ConnectionBERID = ConnectionBERID;
const QualifiedMatrixBERID = Ber.APPLICATION(17);
exports.QualifiedMatrixBERID = QualifiedMatrixBERID;
const LabelBERID = Ber.APPLICATION(18);
exports.LabelBERID = LabelBERID;
const FunctionBERID = Ber.APPLICATION(19);
exports.FunctionBERID = FunctionBERID;
const QualifiedFunctionBERID = Ber.APPLICATION(20);
exports.QualifiedFunctionBERID = QualifiedFunctionBERID;
const FunctionArgumentBERID = Ber.APPLICATION(21);
exports.FunctionArgumentBERID = FunctionArgumentBERID;
const InvocationBERID = Ber.APPLICATION(22);
exports.InvocationBERID = InvocationBERID;
const InvocationResultBERID = Ber.APPLICATION(23);
exports.InvocationResultBERID = InvocationResultBERID;
const TemplateBERID = Ber.APPLICATION(24);
exports.TemplateBERID = TemplateBERID;
const QualifiedTemplateBERID = Ber.APPLICATION(25);
exports.QualifiedTemplateBERID = QualifiedTemplateBERID;
