// Generated from src/language-handler/antlr/AntimonyGrammar.g4 by ANTLR 4.9.0-SNAPSHOT

const { ParseTreeListener } = require("antlr4ts/tree/ParseTreeListener");

const { RootContext } = require("./AntimonyGrammarParser");
const { ModelContext } = require("./AntimonyGrammarParser");
const { Var_nameContext } = require("./AntimonyGrammarParser");
const { In_compContext } = require("./AntimonyGrammarParser");
const { NamemaybeinContext } = require("./AntimonyGrammarParser");
const { EventContext } = require("./AntimonyGrammarParser");
const { Event_delayContext } = require("./AntimonyGrammarParser");
const { Event_trigger_listContext } = require("./AntimonyGrammarParser");
const { Event_triggerContext } = require("./AntimonyGrammarParser");
const { EmptyContext } = require("./AntimonyGrammarParser");
const { Reaction_nameContext } = require("./AntimonyGrammarParser");
const { ReactionContext } = require("./AntimonyGrammarParser");
const { Species_listContext } = require("./AntimonyGrammarParser");
const { SpeciesContext } = require("./AntimonyGrammarParser");
const { InteractionContext } = require("./AntimonyGrammarParser");
const { Event_assignment_listContext } = require("./AntimonyGrammarParser");
const { Event_assignmentContext } = require("./AntimonyGrammarParser");
const { SbotermContext } = require("./AntimonyGrammarParser");
const { AssignmentContext } = require("./AntimonyGrammarParser");
const { ApostropheContext } = require("./AntimonyGrammarParser");
const { Rate_ruleContext } = require("./AntimonyGrammarParser");
const { AnnotationContext } = require("./AntimonyGrammarParser");
const { Annot_listContext } = require("./AntimonyGrammarParser");
const { New_annotContext } = require("./AntimonyGrammarParser");
const { DeclarationContext } = require("./AntimonyGrammarParser");
const { Decl_modifiersContext } = require("./AntimonyGrammarParser");
const { Decl_itemContext } = require("./AntimonyGrammarParser");
const { Decl_assignmentContext } = require("./AntimonyGrammarParser");
const { UnitContext } = require("./AntimonyGrammarParser");
const { Unit_declarationContext } = require("./AntimonyGrammarParser");
const { Unit_assignmentContext } = require("./AntimonyGrammarParser");
const { Mmodel_callContext } = require("./AntimonyGrammarParser");
const { Bool_expContext } = require("./AntimonyGrammarParser");
const { ExpressionsContext } = require("./AntimonyGrammarParser");
const { SumContext } = require("./AntimonyGrammarParser");
const { ProductContext } = require("./AntimonyGrammarParser");
const { PowerContext } = require("./AntimonyGrammarParser");
const { AtomContext } = require("./AntimonyGrammarParser");
const { Func_callContext } = require("./AntimonyGrammarParser");
const { Simple_stmtContext } = require("./AntimonyGrammarParser");
const { Small_stmtContext } = require("./AntimonyGrammarParser");
const { Simple_stmt_listContext } = require("./AntimonyGrammarParser");
const { Import_Context } = require("./AntimonyGrammarParser");
const { Modular_modelContext } = require("./AntimonyGrammarParser");
const { FunctionContext } = require("./AntimonyGrammarParser");
const { ParametersContext } = require("./AntimonyGrammarParser");
const { Init_paramsContext } = require("./AntimonyGrammarParser");
const { Variable_inContext } = require("./AntimonyGrammarParser");
const { Is_assignmentContext } = require("./AntimonyGrammarParser");

/**
 * This interface defines a complete listener for a parse tree produced by
 * `AntimonyGrammarParser`.
 */
module.exports.AntimonyGrammarListener = class AntimonyGrammarListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.root`.
     * @param ctx the parse tree
     */
    enterRoot(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.root`.
     * @param ctx the parse tree
     */
    exitRoot(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.model`.
     * @param ctx the parse tree
     */
    enterModel(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.model`.
     * @param ctx the parse tree
     */
    exitModel(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.var_name`.
     * @param ctx the parse tree
     */
    enterVar_name(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.var_name`.
     * @param ctx the parse tree
     */
    exitVar_name(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.in_comp`.
     * @param ctx the parse tree
     */
    enterIn_comp(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.in_comp`.
     * @param ctx the parse tree
     */
    exitIn_comp(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.namemaybein`.
     * @param ctx the parse tree
     */
    enterNamemaybein(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.namemaybein`.
     * @param ctx the parse tree
     */
    exitNamemaybein(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event`.
     * @param ctx the parse tree
     */
    enterEvent(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event`.
     * @param ctx the parse tree
     */
    exitEvent(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event_delay`.
     * @param ctx the parse tree
     */
    enterEvent_delay(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event_delay`.
     * @param ctx the parse tree
     */
    exitEvent_delay(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event_trigger_list`.
     * @param ctx the parse tree
     */
    enterEvent_trigger_list(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event_trigger_list`.
     * @param ctx the parse tree
     */
    exitEvent_trigger_list(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event_trigger`.
     * @param ctx the parse tree
     */
    enterEvent_trigger(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event_trigger`.
     * @param ctx the parse tree
     */
    exitEvent_trigger(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.empty`.
     * @param ctx the parse tree
     */
    enterEmpty(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.empty`.
     * @param ctx the parse tree
     */
    exitEmpty(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.reaction_name`.
     * @param ctx the parse tree
     */
    enterReaction_name(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.reaction_name`.
     * @param ctx the parse tree
     */
    exitReaction_name(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.reaction`.
     * @param ctx the parse tree
     */
    enterReaction(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.reaction`.
     * @param ctx the parse tree
     */
    exitReaction(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.species_list`.
     * @param ctx the parse tree
     */
    enterSpecies_list(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.species_list`.
     * @param ctx the parse tree
     */
    exitSpecies_list(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.species`.
     * @param ctx the parse tree
     */
    enterSpecies(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.species`.
     * @param ctx the parse tree
     */
    exitSpecies(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.interaction`.
     * @param ctx the parse tree
     */
    enterInteraction(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.interaction`.
     * @param ctx the parse tree
     */
    exitInteraction(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event_assignment_list`.
     * @param ctx the parse tree
     */
    enterEvent_assignment_list(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event_assignment_list`.
     * @param ctx the parse tree
     */
    exitEvent_assignment_list(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.event_assignment`.
     * @param ctx the parse tree
     */
    enterEvent_assignment(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.event_assignment`.
     * @param ctx the parse tree
     */
    exitEvent_assignment(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.sboterm`.
     * @param ctx the parse tree
     */
    enterSboterm(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.sboterm`.
     * @param ctx the parse tree
     */
    exitSboterm(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.assignment`.
     * @param ctx the parse tree
     */
    enterAssignment(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.assignment`.
     * @param ctx the parse tree
     */
    exitAssignment(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.apostrophe`.
     * @param ctx the parse tree
     */
    enterApostrophe(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.apostrophe`.
     * @param ctx the parse tree
     */
    exitApostrophe(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.rate_rule`.
     * @param ctx the parse tree
     */
    enterRate_rule(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.rate_rule`.
     * @param ctx the parse tree
     */
    exitRate_rule(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.annotation`.
     * @param ctx the parse tree
     */
    enterAnnotation(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.annotation`.
     * @param ctx the parse tree
     */
    exitAnnotation(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.annot_list`.
     * @param ctx the parse tree
     */
    enterAnnot_list(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.annot_list`.
     * @param ctx the parse tree
     */
    exitAnnot_list(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.new_annot`.
     * @param ctx the parse tree
     */
    enterNew_annot(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.new_annot`.
     * @param ctx the parse tree
     */
    exitNew_annot(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.declaration`.
     * @param ctx the parse tree
     */
    enterDeclaration(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.declaration`.
     * @param ctx the parse tree
     */
    exitDeclaration(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.decl_modifiers`.
     * @param ctx the parse tree
     */
    enterDecl_modifiers(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.decl_modifiers`.
     * @param ctx the parse tree
     */
    exitDecl_modifiers(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.decl_item`.
     * @param ctx the parse tree
     */
    enterDecl_item(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.decl_item`.
     * @param ctx the parse tree
     */
    exitDecl_item(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.decl_assignment`.
     * @param ctx the parse tree
     */
    enterDecl_assignment(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.decl_assignment`.
     * @param ctx the parse tree
     */
    exitDecl_assignment(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.unit`.
     * @param ctx the parse tree
     */
    enterUnit(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.unit`.
     * @param ctx the parse tree
     */
    exitUnit(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.unit_declaration`.
     * @param ctx the parse tree
     */
    enterUnit_declaration(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.unit_declaration`.
     * @param ctx the parse tree
     */
    exitUnit_declaration(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.unit_assignment`.
     * @param ctx the parse tree
     */
    enterUnit_assignment(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.unit_assignment`.
     * @param ctx the parse tree
     */
    exitUnit_assignment(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.mmodel_call`.
     * @param ctx the parse tree
     */
    enterMmodel_call(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.mmodel_call`.
     * @param ctx the parse tree
     */
    exitMmodel_call(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.bool_exp`.
     * @param ctx the parse tree
     */
    enterBool_exp(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.bool_exp`.
     * @param ctx the parse tree
     */
    exitBool_exp(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.expressions`.
     * @param ctx the parse tree
     */
    enterExpressions(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.expressions`.
     * @param ctx the parse tree
     */
    exitExpressions(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.sum`.
     * @param ctx the parse tree
     */
    enterSum(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.sum`.
     * @param ctx the parse tree
     */
    exitSum(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.product`.
     * @param ctx the parse tree
     */
    enterProduct(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.product`.
     * @param ctx the parse tree
     */
    exitProduct(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.power`.
     * @param ctx the parse tree
     */
    enterPower(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.power`.
     * @param ctx the parse tree
     */
    exitPower(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.atom`.
     * @param ctx the parse tree
     */
    enterAtom(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.atom`.
     * @param ctx the parse tree
     */
    exitAtom(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.func_call`.
     * @param ctx the parse tree
     */
    enterFunc_call(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.func_call`.
     * @param ctx the parse tree
     */
    exitFunc_call(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.simple_stmt`.
     * @param ctx the parse tree
     */
    enterSimple_stmt(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.simple_stmt`.
     * @param ctx the parse tree
     */
    exitSimple_stmt(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.small_stmt`.
     * @param ctx the parse tree
     */
    enterSmall_stmt(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.small_stmt`.
     * @param ctx the parse tree
     */
    exitSmall_stmt(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.simple_stmt_list`.
     * @param ctx the parse tree
     */
    enterSimple_stmt_list(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.simple_stmt_list`.
     * @param ctx the parse tree
     */
    exitSimple_stmt_list(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.import_`.
     * @param ctx the parse tree
     */
    enterImport_(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.import_`.
     * @param ctx the parse tree
     */
    exitImport_(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.modular_model`.
     * @param ctx the parse tree
     */
    enterModular_model(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.modular_model`.
     * @param ctx the parse tree
     */
    exitModular_model(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.function`.
     * @param ctx the parse tree
     */
    enterFunction(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.function`.
     * @param ctx the parse tree
     */
    exitFunction(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.parameters`.
     * @param ctx the parse tree
     */
    enterParameters(ctx) {}

    /**
     * Exit a parse tree produced by `AntimonyGrammarParser.parameters`.
     * @param ctx the parse tree
     */
    exitParameters(ctx) {}

    /**
     * Enter a parse tree produced by `AntimonyGrammarParser.init_params`.
     * @param ctx the parse tree
