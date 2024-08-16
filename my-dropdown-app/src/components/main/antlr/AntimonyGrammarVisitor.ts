// Generated from src/language-handler/antlr/AntimonyGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { RootContext } from "./AntimonyGrammarParser";
import { ModelContext } from "./AntimonyGrammarParser";
import { Var_nameContext } from "./AntimonyGrammarParser";
import { In_compContext } from "./AntimonyGrammarParser";
import { NamemaybeinContext } from "./AntimonyGrammarParser";
import { EventContext } from "./AntimonyGrammarParser";
import { Event_delayContext } from "./AntimonyGrammarParser";
import { Event_trigger_listContext } from "./AntimonyGrammarParser";
import { Event_triggerContext } from "./AntimonyGrammarParser";
import { EmptyContext } from "./AntimonyGrammarParser";
import { Reaction_nameContext } from "./AntimonyGrammarParser";
import { ReactionContext } from "./AntimonyGrammarParser";
import { Species_listContext } from "./AntimonyGrammarParser";
import { SpeciesContext } from "./AntimonyGrammarParser";
import { InteractionContext } from "./AntimonyGrammarParser";
import { Event_assignment_listContext } from "./AntimonyGrammarParser";
import { Event_assignmentContext } from "./AntimonyGrammarParser";
import { SbotermContext } from "./AntimonyGrammarParser";
import { AssignmentContext } from "./AntimonyGrammarParser";
import { ApostropheContext } from "./AntimonyGrammarParser";
import { Rate_ruleContext } from "./AntimonyGrammarParser";
import { AnnotationContext } from "./AntimonyGrammarParser";
import { Annot_listContext } from "./AntimonyGrammarParser";
import { New_annotContext } from "./AntimonyGrammarParser";
import { DeclarationContext } from "./AntimonyGrammarParser";
import { Decl_modifiersContext } from "./AntimonyGrammarParser";
import { Decl_itemContext } from "./AntimonyGrammarParser";
import { Decl_assignmentContext } from "./AntimonyGrammarParser";
import { UnitContext } from "./AntimonyGrammarParser";
import { Unit_declarationContext } from "./AntimonyGrammarParser";
import { Unit_assignmentContext } from "./AntimonyGrammarParser";
import { Mmodel_callContext } from "./AntimonyGrammarParser";
import { Bool_expContext } from "./AntimonyGrammarParser";
import { ExpressionsContext } from "./AntimonyGrammarParser";
import { SumContext } from "./AntimonyGrammarParser";
import { ProductContext } from "./AntimonyGrammarParser";
import { PowerContext } from "./AntimonyGrammarParser";
import { AtomContext } from "./AntimonyGrammarParser";
import { Func_callContext } from "./AntimonyGrammarParser";
import { Simple_stmtContext } from "./AntimonyGrammarParser";
import { Small_stmtContext } from "./AntimonyGrammarParser";
import { Simple_stmt_listContext } from "./AntimonyGrammarParser";
import { Import_Context } from "./AntimonyGrammarParser";
import { Modular_modelContext } from "./AntimonyGrammarParser";
import { FunctionContext } from "./AntimonyGrammarParser";
import { ParametersContext } from "./AntimonyGrammarParser";
import { Init_paramsContext } from "./AntimonyGrammarParser";
import { Variable_inContext } from "./AntimonyGrammarParser";
import { Is_assignmentContext } from "./AntimonyGrammarParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `AntimonyGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface AntimonyGrammarVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.root`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRoot?: (ctx: RootContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.model`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModel?: (ctx: ModelContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.var_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar_name?: (ctx: Var_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.in_comp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIn_comp?: (ctx: In_compContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.namemaybein`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamemaybein?: (ctx: NamemaybeinContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent?: (ctx: EventContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event_delay`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_delay?: (ctx: Event_delayContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event_trigger_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_trigger_list?: (ctx: Event_trigger_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event_trigger`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_trigger?: (ctx: Event_triggerContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.empty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEmpty?: (ctx: EmptyContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.reaction_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReaction_name?: (ctx: Reaction_nameContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.reaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReaction?: (ctx: ReactionContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.species_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecies_list?: (ctx: Species_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.species`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecies?: (ctx: SpeciesContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.interaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInteraction?: (ctx: InteractionContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event_assignment_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_assignment_list?: (ctx: Event_assignment_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.event_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEvent_assignment?: (ctx: Event_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.sboterm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSboterm?: (ctx: SbotermContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.apostrophe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitApostrophe?: (ctx: ApostropheContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.rate_rule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRate_rule?: (ctx: Rate_ruleContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.annotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation?: (ctx: AnnotationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.annot_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnot_list?: (ctx: Annot_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.new_annot`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNew_annot?: (ctx: New_annotContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclaration?: (ctx: DeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.decl_modifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecl_modifiers?: (ctx: Decl_modifiersContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.decl_item`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecl_item?: (ctx: Decl_itemContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.decl_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecl_assignment?: (ctx: Decl_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit?: (ctx: UnitContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.unit_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit_declaration?: (ctx: Unit_declarationContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.unit_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit_assignment?: (ctx: Unit_assignmentContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.mmodel_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMmodel_call?: (ctx: Mmodel_callContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.bool_exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBool_exp?: (ctx: Bool_expContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.expressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressions?: (ctx: ExpressionsContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.sum`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSum?: (ctx: SumContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.product`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProduct?: (ctx: ProductContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.power`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPower?: (ctx: PowerContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtom?: (ctx: AtomContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.func_call`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunc_call?: (ctx: Func_callContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.simple_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_stmt?: (ctx: Simple_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.small_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSmall_stmt?: (ctx: Small_stmtContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.simple_stmt_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimple_stmt_list?: (ctx: Simple_stmt_listContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.import_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_?: (ctx: Import_Context) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.modular_model`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModular_model?: (ctx: Modular_modelContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.parameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameters?: (ctx: ParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.init_params`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_params?: (ctx: Init_paramsContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.variable_in`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable_in?: (ctx: Variable_inContext) => Result;

	/**
	 * Visit a parse tree produced by `AntimonyGrammarParser.is_assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIs_assignment?: (ctx: Is_assignmentContext) => Result;
}

