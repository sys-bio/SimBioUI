// Generated from src/language-handler/antlr/AntimonyGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `AntimonyGrammarParser`.
 */
export interface AntimonyGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.root`.
	 * @param ctx the parse tree
	 */
	enterRoot?: (ctx: RootContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.root`.
	 * @param ctx the parse tree
	 */
	exitRoot?: (ctx: RootContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.model`.
	 * @param ctx the parse tree
	 */
	enterModel?: (ctx: ModelContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.model`.
	 * @param ctx the parse tree
	 */
	exitModel?: (ctx: ModelContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.var_name`.
	 * @param ctx the parse tree
	 */
	enterVar_name?: (ctx: Var_nameContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.var_name`.
	 * @param ctx the parse tree
	 */
	exitVar_name?: (ctx: Var_nameContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.in_comp`.
	 * @param ctx the parse tree
	 */
	enterIn_comp?: (ctx: In_compContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.in_comp`.
	 * @param ctx the parse tree
	 */
	exitIn_comp?: (ctx: In_compContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.namemaybein`.
	 * @param ctx the parse tree
	 */
	enterNamemaybein?: (ctx: NamemaybeinContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.namemaybein`.
	 * @param ctx the parse tree
	 */
	exitNamemaybein?: (ctx: NamemaybeinContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event`.
	 * @param ctx the parse tree
	 */
	enterEvent?: (ctx: EventContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event`.
	 * @param ctx the parse tree
	 */
	exitEvent?: (ctx: EventContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event_delay`.
	 * @param ctx the parse tree
	 */
	enterEvent_delay?: (ctx: Event_delayContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event_delay`.
	 * @param ctx the parse tree
	 */
	exitEvent_delay?: (ctx: Event_delayContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event_trigger_list`.
	 * @param ctx the parse tree
	 */
	enterEvent_trigger_list?: (ctx: Event_trigger_listContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event_trigger_list`.
	 * @param ctx the parse tree
	 */
	exitEvent_trigger_list?: (ctx: Event_trigger_listContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	enterEvent_trigger?: (ctx: Event_triggerContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event_trigger`.
	 * @param ctx the parse tree
	 */
	exitEvent_trigger?: (ctx: Event_triggerContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.empty`.
	 * @param ctx the parse tree
	 */
	enterEmpty?: (ctx: EmptyContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.empty`.
	 * @param ctx the parse tree
	 */
	exitEmpty?: (ctx: EmptyContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.reaction_name`.
	 * @param ctx the parse tree
	 */
	enterReaction_name?: (ctx: Reaction_nameContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.reaction_name`.
	 * @param ctx the parse tree
	 */
	exitReaction_name?: (ctx: Reaction_nameContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.reaction`.
	 * @param ctx the parse tree
	 */
	enterReaction?: (ctx: ReactionContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.reaction`.
	 * @param ctx the parse tree
	 */
	exitReaction?: (ctx: ReactionContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.species_list`.
	 * @param ctx the parse tree
	 */
	enterSpecies_list?: (ctx: Species_listContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.species_list`.
	 * @param ctx the parse tree
	 */
	exitSpecies_list?: (ctx: Species_listContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.species`.
	 * @param ctx the parse tree
	 */
	enterSpecies?: (ctx: SpeciesContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.species`.
	 * @param ctx the parse tree
	 */
	exitSpecies?: (ctx: SpeciesContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.interaction`.
	 * @param ctx the parse tree
	 */
	enterInteraction?: (ctx: InteractionContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.interaction`.
	 * @param ctx the parse tree
	 */
	exitInteraction?: (ctx: InteractionContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event_assignment_list`.
	 * @param ctx the parse tree
	 */
	enterEvent_assignment_list?: (ctx: Event_assignment_listContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event_assignment_list`.
	 * @param ctx the parse tree
	 */
	exitEvent_assignment_list?: (ctx: Event_assignment_listContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.event_assignment`.
	 * @param ctx the parse tree
	 */
	enterEvent_assignment?: (ctx: Event_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.event_assignment`.
	 * @param ctx the parse tree
	 */
	exitEvent_assignment?: (ctx: Event_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.sboterm`.
	 * @param ctx the parse tree
	 */
	enterSboterm?: (ctx: SbotermContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.sboterm`.
	 * @param ctx the parse tree
	 */
	exitSboterm?: (ctx: SbotermContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.apostrophe`.
	 * @param ctx the parse tree
	 */
	enterApostrophe?: (ctx: ApostropheContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.apostrophe`.
	 * @param ctx the parse tree
	 */
	exitApostrophe?: (ctx: ApostropheContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.rate_rule`.
	 * @param ctx the parse tree
	 */
	enterRate_rule?: (ctx: Rate_ruleContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.rate_rule`.
	 * @param ctx the parse tree
	 */
	exitRate_rule?: (ctx: Rate_ruleContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.annotation`.
	 * @param ctx the parse tree
	 */
	enterAnnotation?: (ctx: AnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.annotation`.
	 * @param ctx the parse tree
	 */
	exitAnnotation?: (ctx: AnnotationContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.annot_list`.
	 * @param ctx the parse tree
	 */
	enterAnnot_list?: (ctx: Annot_listContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.annot_list`.
	 * @param ctx the parse tree
	 */
	exitAnnot_list?: (ctx: Annot_listContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.new_annot`.
	 * @param ctx the parse tree
	 */
	enterNew_annot?: (ctx: New_annotContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.new_annot`.
	 * @param ctx the parse tree
	 */
	exitNew_annot?: (ctx: New_annotContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.decl_modifiers`.
	 * @param ctx the parse tree
	 */
	enterDecl_modifiers?: (ctx: Decl_modifiersContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.decl_modifiers`.
	 * @param ctx the parse tree
	 */
	exitDecl_modifiers?: (ctx: Decl_modifiersContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.decl_item`.
	 * @param ctx the parse tree
	 */
	enterDecl_item?: (ctx: Decl_itemContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.decl_item`.
	 * @param ctx the parse tree
	 */
	exitDecl_item?: (ctx: Decl_itemContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.decl_assignment`.
	 * @param ctx the parse tree
	 */
	enterDecl_assignment?: (ctx: Decl_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.decl_assignment`.
	 * @param ctx the parse tree
	 */
	exitDecl_assignment?: (ctx: Decl_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.unit`.
	 * @param ctx the parse tree
	 */
	enterUnit?: (ctx: UnitContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.unit`.
	 * @param ctx the parse tree
	 */
	exitUnit?: (ctx: UnitContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.unit_declaration`.
	 * @param ctx the parse tree
	 */
	enterUnit_declaration?: (ctx: Unit_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.unit_declaration`.
	 * @param ctx the parse tree
	 */
	exitUnit_declaration?: (ctx: Unit_declarationContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.unit_assignment`.
	 * @param ctx the parse tree
	 */
	enterUnit_assignment?: (ctx: Unit_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.unit_assignment`.
	 * @param ctx the parse tree
	 */
	exitUnit_assignment?: (ctx: Unit_assignmentContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.mmodel_call`.
	 * @param ctx the parse tree
	 */
	enterMmodel_call?: (ctx: Mmodel_callContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.mmodel_call`.
	 * @param ctx the parse tree
	 */
	exitMmodel_call?: (ctx: Mmodel_callContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.bool_exp`.
	 * @param ctx the parse tree
	 */
	enterBool_exp?: (ctx: Bool_expContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.bool_exp`.
	 * @param ctx the parse tree
	 */
	exitBool_exp?: (ctx: Bool_expContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.expressions`.
	 * @param ctx the parse tree
	 */
	enterExpressions?: (ctx: ExpressionsContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.expressions`.
	 * @param ctx the parse tree
	 */
	exitExpressions?: (ctx: ExpressionsContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.sum`.
	 * @param ctx the parse tree
	 */
	enterSum?: (ctx: SumContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.sum`.
	 * @param ctx the parse tree
	 */
	exitSum?: (ctx: SumContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.product`.
	 * @param ctx the parse tree
	 */
	enterProduct?: (ctx: ProductContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.product`.
	 * @param ctx the parse tree
	 */
	exitProduct?: (ctx: ProductContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.power`.
	 * @param ctx the parse tree
	 */
	enterPower?: (ctx: PowerContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.power`.
	 * @param ctx the parse tree
	 */
	exitPower?: (ctx: PowerContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.atom`.
	 * @param ctx the parse tree
	 */
	enterAtom?: (ctx: AtomContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.atom`.
	 * @param ctx the parse tree
	 */
	exitAtom?: (ctx: AtomContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.func_call`.
	 * @param ctx the parse tree
	 */
	enterFunc_call?: (ctx: Func_callContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.func_call`.
	 * @param ctx the parse tree
	 */
	exitFunc_call?: (ctx: Func_callContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.simple_stmt`.
	 * @param ctx the parse tree
	 */
	enterSimple_stmt?: (ctx: Simple_stmtContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.simple_stmt`.
	 * @param ctx the parse tree
	 */
	exitSimple_stmt?: (ctx: Simple_stmtContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.small_stmt`.
	 * @param ctx the parse tree
	 */
	enterSmall_stmt?: (ctx: Small_stmtContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.small_stmt`.
	 * @param ctx the parse tree
	 */
	exitSmall_stmt?: (ctx: Small_stmtContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.simple_stmt_list`.
	 * @param ctx the parse tree
	 */
	enterSimple_stmt_list?: (ctx: Simple_stmt_listContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.simple_stmt_list`.
	 * @param ctx the parse tree
	 */
	exitSimple_stmt_list?: (ctx: Simple_stmt_listContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.import_`.
	 * @param ctx the parse tree
	 */
	enterImport_?: (ctx: Import_Context) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.import_`.
	 * @param ctx the parse tree
	 */
	exitImport_?: (ctx: Import_Context) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.modular_model`.
	 * @param ctx the parse tree
	 */
	enterModular_model?: (ctx: Modular_modelContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.modular_model`.
	 * @param ctx the parse tree
	 */
	exitModular_model?: (ctx: Modular_modelContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.function`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.function`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.parameters`.
	 * @param ctx the parse tree
	 */
	enterParameters?: (ctx: ParametersContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.parameters`.
	 * @param ctx the parse tree
	 */
	exitParameters?: (ctx: ParametersContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.init_params`.
	 * @param ctx the parse tree
	 */
	enterInit_params?: (ctx: Init_paramsContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.init_params`.
	 * @param ctx the parse tree
	 */
	exitInit_params?: (ctx: Init_paramsContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.variable_in`.
	 * @param ctx the parse tree
	 */
	enterVariable_in?: (ctx: Variable_inContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.variable_in`.
	 * @param ctx the parse tree
	 */
	exitVariable_in?: (ctx: Variable_inContext) => void;

	/**
	 * Enter a parse tree produced by `AntimonyGrammarParser.is_assignment`.
	 * @param ctx the parse tree
	 */
	enterIs_assignment?: (ctx: Is_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `AntimonyGrammarParser.is_assignment`.
	 * @param ctx the parse tree
	 */
	exitIs_assignment?: (ctx: Is_assignmentContext) => void;
}

