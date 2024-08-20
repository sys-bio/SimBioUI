import ParseTreeVisitor from "antlr4ts/tree/ParseTreeVisitor";

import RootContext from "./AntimonyGrammarParser";
import ModelContext from "./AntimonyGrammarParser";
import Var_nameContext from "./AntimonyGrammarParser";
import In_compContext from "./AntimonyGrammarParser";
import NamemaybeinContext from "./AntimonyGrammarParser";
import EventContext from "./AntimonyGrammarParser";
import Event_delayContext from "./AntimonyGrammarParser";
import Event_trigger_listContext from "./AntimonyGrammarParser";
import Event_triggerContext from "./AntimonyGrammarParser";
import EmptyContext from "./AntimonyGrammarParser";
import Reaction_nameContext from "./AntimonyGrammarParser";
import ReactionContext from "./AntimonyGrammarParser";
import Species_listContext from "./AntimonyGrammarParser";
import SpeciesContext from "./AntimonyGrammarParser";
import InteractionContext from "./AntimonyGrammarParser";
import Event_assignment_listContext from "./AntimonyGrammarParser";
import Event_assignmentContext from "./AntimonyGrammarParser";
import SbotermContext from "./AntimonyGrammarParser";
import AssignmentContext from "./AntimonyGrammarParser";
import ApostropheContext from "./AntimonyGrammarParser";
import Rate_ruleContext from "./AntimonyGrammarParser";
import AnnotationContext from "./AntimonyGrammarParser";
import Annot_listContext from "./AntimonyGrammarParser";
import New_annotContext from "./AntimonyGrammarParser";
import DeclarationContext from "./AntimonyGrammarParser";
import Decl_modifiersContext from "./AntimonyGrammarParser";
import Decl_itemContext from "./AntimonyGrammarParser";
import Decl_assignmentContext from "./AntimonyGrammarParser";
import UnitContext from "./AntimonyGrammarParser";
import Unit_declarationContext from "./AntimonyGrammarParser";
import Unit_assignmentContext from "./AntimonyGrammarParser";
import Mmodel_callContext from "./AntimonyGrammarParser";
import Bool_expContext from "./AntimonyGrammarParser";
import ExpressionsContext from "./AntimonyGrammarParser";
import SumContext from "./AntimonyGrammarParser";
import ProductContext from "./AntimonyGrammarParser";
import PowerContext from "./AntimonyGrammarParser";
import AtomContext from "./AntimonyGrammarParser";
import Func_callContext from "./AntimonyGrammarParser";
import Simple_stmtContext from "./AntimonyGrammarParser";
import Small_stmtContext from "./AntimonyGrammarParser";
import Simple_stmt_listContext from "./AntimonyGrammarParser";
import Import_Context from "./AntimonyGrammarParser";
import Modular_modelContext from "./AntimonyGrammarParser";
import FunctionContext from "./AntimonyGrammarParser";
import ParametersContext from "./AntimonyGrammarParser";
import Init_paramsContext from "./AntimonyGrammarParser";
import Variable_inContext from "./AntimonyGrammarParser";
import Is_assignmentContext from "./AntimonyGrammarParser";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `AntimonyGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface AntimonyGrammarVisitor<Result> extends ParseTreeVisitor<Result> {
	visitRoot?: (ctx: RootContext) => Result;
	visitModel?: (ctx: ModelContext) => Result;
	visitVar_name?: (ctx: Var_nameContext) => Result;
	visitIn_comp?: (ctx: In_compContext) => Result;
	visitNamemaybein?: (ctx: NamemaybeinContext) => Result;
	visitEvent?: (ctx: EventContext) => Result;
	visitEvent_delay?: (ctx: Event_delayContext) => Result;
	visitEvent_trigger_list?: (ctx: Event_trigger_listContext) => Result;
	visitEvent_trigger?: (ctx: Event_triggerContext) => Result;
	visitEmpty?: (ctx: EmptyContext) => Result;
	visitReaction_name?: (ctx: Reaction_nameContext) => Result;
	visitReaction?: (ctx: ReactionContext) => Result;
	visitSpecies_list?: (ctx: Species_listContext) => Result;
	visitSpecies?: (ctx: SpeciesContext) => Result;
	visitInteraction?: (ctx: InteractionContext) => Result;
	visitEvent_assignment_list?: (ctx: Event_assignment_listContext) => Result;
	visitEvent_assignment?: (ctx: Event_assignmentContext) => Result;
	visitSboterm?: (ctx: SbotermContext) => Result;
	visitAssignment?: (ctx: AssignmentContext) => Result;
	visitApostrophe?: (ctx: ApostropheContext) => Result;
	visitRate_rule?: (ctx: Rate_ruleContext) => Result;
	visitAnnotation?: (ctx: AnnotationContext) => Result;
	visitAnnot_list?: (ctx: Annot_listContext) => Result;
	visitNew_annot?: (ctx: New_annotContext) => Result;
	visitDeclaration?: (ctx: DeclarationContext) => Result;
	visitDecl_modifiers?: (ctx: Decl_modifiersContext) => Result;
	visitDecl_item?: (ctx: Decl_itemContext) => Result;
	visitDecl_assignment?: (ctx: Decl_assignmentContext) => Result;
	visitUnit?: (ctx: UnitContext) => Result;
	visitUnit_declaration?: (ctx: Unit_declarationContext) => Result;
	visitUnit_assignment?: (ctx: Unit_assignmentContext) => Result;
	visitMmodel_call?: (ctx: Mmodel_callContext) => Result;
	visitBool_exp?: (ctx: Bool_expContext) => Result;
	visitExpressions?: (ctx: ExpressionsContext) => Result;
	visitSum?: (ctx: SumContext) => Result;
	visitProduct?: (ctx: ProductContext) => Result;
	visitPower?: (ctx: PowerContext) => Result;
	visitAtom?: (ctx: AtomContext) => Result;
	visitFunc_call?: (ctx: Func_callContext) => Result;
	visitSimple_stmt?: (ctx: Simple_stmtContext) => Result;
	visitSmall_stmt?: (ctx: Small_stmtContext) => Result;
	visitSimple_stmt_list?: (ctx: Simple_stmt_listContext) => Result;
	visitImport_?: (ctx: Import_Context) => Result;
	visitModular_model?: (ctx: Modular_modelContext) => Result;
	visitFunction?: (ctx: FunctionContext) => Result;
	visitParameters?: (ctx: ParametersContext) => Result;
	visitInit_params?: (ctx: Init_paramsContext) => Result;
	visitVariable_in?: (ctx: Variable_inContext) => Result;
	visitIs_assignment?: (ctx: Is_assignmentContext) => Result;
}