import {
  Modular_modelContext,
  Species_listContext
} from ".././antlr/AntimonyGrammarParser"
import { Variable } from "./Variable"
import { getTypeFromString, isSubtTypeOf, varTypes } from "./Types"
import {
  duplicateParameterError,
  functionAlreadyExistsError,
  incompatibleTypesError,
  modelAlreadyExistsError,
  overriddenValueWarning,
  overridingValueWarning
} from "./SemanticErrors"
import { ErrorVisitor } from "./ErrorVisitor"

export class SymbolTableVisitor extends ErrorVisitor {
  visitFunction(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    if (ctx.children) {
      const funcName = this.getVarName(ctx.NAME().text)
      const funcIDSrcRange = this.getSrcRange(ctx.NAME())
      const funcST = this.globalST.getFunctionST(funcName)

      if (!funcST) {
        // func has not been declared yet
        // can still error if another var has same name!
        const existingVarInfo = this.globalST.getVar(funcName)
        if (existingVarInfo) {
          // error, already exists!
          const errorMessage = incompatibleTypesError(
            varTypes.Function,
            existingVarInfo
          )
          const errorUnderline = this.getErrorUnderline(
            funcIDSrcRange,
            errorMessage,
            true
          )
          this.addError(errorUnderline)
        } else {
          this.globalST.setFunction(funcName, funcIDSrcRange)

          // look for function params
          let params = ctx.init_params()

          if (params && params.children) {
            const seenParams = new Map()
            // only go over the ids, as we have id1,id2,id3,id4, etc,
            // where the commas are also tokens
            for (let i = 0; i < params.children.length; i += 2) {
              const paramId = params.children[i].text
              if (seenParams.has(paramId)) {
                // handle repeat params ids in parameter list!!
                const errorMessage = duplicateParameterError(paramId)
                const errorUnderline = this.getErrorUnderline(
                  this.getSrcRange(params.children[i]),
                  errorMessage,
                  true
                )
                this.addError(errorUnderline)
              } else {
                const idSrcRange = this.getSrcRange(params.children[i])
                const paramInfo = new Variable(
                  varTypes.Unknown,
                  false,
                  undefined,
                  idSrcRange,
                  undefined,
                  false
                )
                seenParams.set(paramId, paramInfo)

                // keep track of all locations this param is referenced for hovers
                paramInfo.refLocations.set(idSrcRange.toString(), idSrcRange)

                // we need to know what the params are if we want to
                // initialize this model as a variable somewhere.
                this.globalST.getFunctionST(funcName)?.addParameter(paramId)
                this.globalST
                  .getFunctionST(funcName)
                  ?.setVar(paramId, paramInfo)
              }
            }
          }
        }
      } else {
        // redeclared function, error
        const errorMessage = functionAlreadyExistsError(
          funcName,
          funcST.getPosition()
        )
        let errorUnderline = this.getErrorUnderline(
          funcIDSrcRange,
          errorMessage,
          true
        )
        this.addError(errorUnderline)
      }

      this.setScopeVisitChildren(funcName, ctx, "function")
    }
  }

  /**
   * helper method that eliminates redundancy
   * in modular model and model calls
   * @param ctx
   */
  handleModelVisit(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    if (ctx.children) {
      let idIndex = 1
      let modName = ctx.children[idIndex].text
      // take care of case where we have model *ID()
      if (modName === "*") {
        idIndex = 2
        modName = ctx.children[idIndex].text
      }
      const modelIDsrcRange = this.getSrcRange(ctx.children[idIndex])

      const modelST = this.globalST.getModelST(modName)
      if (!modelST) {
        // model has not been declared yet
        this.globalST.setModel(modName, modelIDsrcRange)

        if (ctx instanceof Modular_modelContext) {
          // add init params to the model as Unknown types.
          // the following is what is unique to a "modular model."
          const params = ctx.init_params()
          if (params && params.children) {
            const seenParams = new Map()
            // only go over the ids, as we have id1,id2,id3,id4
            for (let i = 0; i < params.children.length; i += 2) {
              const paramId = params.children[i].text
              const paramIdSrcRange = this.getSrcRange(params.children[i])
              if (seenParams.has(paramId)) {
                // handle repeat params ids in parameter list!!
                const errorMessage = duplicateParameterError(paramId)
                const errorUnderline = this.getErrorUnderline(
                  paramIdSrcRange,
                  errorMessage,
                  true
                )
                this.addError(errorUnderline)
              } else {
                const paramInfo = new Variable(
                  varTypes.Unknown,
                  false,
                  undefined,
                  paramIdSrcRange,
                  paramIdSrcRange,
                  false
                )
                seenParams.set(paramId, paramInfo)
                // we need to know what the params are if we want to
                // initialize this model as a variable somwewhere.
                let modST = this.globalST.getModelST(modName)
                modST?.addParameter(paramId)
                modST?.setVar(paramId, paramInfo)
              }
            }
          }
        }

        // record end position for potential annotation insert
        let lastLine = ctx._stop?.line
        let currST = this.globalST.getModelST(modName)
        if (currST) {
          currST.endLine = lastLine
        }

        // go through what is inside this model
        this.setScopeVisitChildren(modName, ctx, "model")
      } else {
        // redeclared Model, error
        // should make a function to return errorUnderlines.
        const errorMessage = modelAlreadyExistsError(
          modName,
          modelST.getPosition()
        )
        let errorUnderline = this.getErrorUnderline(
          this.getSrcRange(ctx),
          errorMessage,
          true
        )
        this.addError(errorUnderline)
      }
    }
  }

  visitModular_model(ctx) {
    this.handleModelVisit(ctx)
  }

  visitModel(ctx) {
    this.handleModelVisit(ctx)
  }

  /**
   * Main thing this does, any variable inside a reaction is being declared to be
   * a species type, this takes care of that. May need to add erroring.
   * @param ctx
   */
  visitSpecies(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const varIdSrcRange = this.getSrcRange(ctx.NAME())
    let varInfo = new Variable(
      varTypes.Species,
      false,
      undefined,
      varIdSrcRange,
      undefined,
      false
    )

    let speciesName = this.getVarName(ctx.NAME().text)
    // gets the $ location within the grammar def of "species : (NUMBER)? ('$')? NAME;"
    varInfo.isConst =
      ctx.text.charAt(ctx.text.length - ctx.NAME().text.length - 1) === "$"

    // get the relevant ST
    const currST = this.getCurrST()

    if (currST) {
      const existingVarInfo = currST.getVar(speciesName)
      if (existingVarInfo) {
        if (existingVarInfo.canSetType(varTypes.Species)) {
          existingVarInfo.type = varTypes.Species
          existingVarInfo.idSrcRange = varIdSrcRange
          // for hover info
          existingVarInfo.refLocations.set(
            varIdSrcRange.toString(),
            varIdSrcRange
          )
        } else {
          const errorMessage = incompatibleTypesError(
            varTypes.Species,
            existingVarInfo
          )
          const errorUnderline = this.getErrorUnderline(
            varInfo.idSrcRange,
            errorMessage,
            true
          )
          this.addError(errorUnderline)
        }
      } else {
        // var does not exist, insert into ST
        currST.setVar(speciesName, varInfo)
      }
    }
  }

  // should be very similar to vsiit_assignment
  // adding this so that the values of vars assigned in a decl_itm
  // can be recorded as well.
  visitDecl_item(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])
      }

      // now record the assigned variable as assigned.
      const nmbi = ctx.children[0]
      const varName = nmbi.var_name().text
      const currSrcRange = this.getSrcRange(ctx)

      const currST = this.getCurrST()

      // almost identical to visit_assignment
      // the key difference is that here we NEED to
      // check if the assignment portion of the decl_item node
      // actually exists, since otherwise we cannot say that
      // this variable has been assigned to.
      if (currST && ctx.decl_assignment()) {
        let varInfo
        // because we visit the children first, it is
        // gauranteed that the var is in the currST.
        if ((varInfo = currST.getVar(varName)) !== undefined) {
          if (varInfo.initSrcRange !== undefined) {
            // warning case! reinitalization!
            if (varInfo.initSrcRange) {
              // adds warning to current id location
              const errorMessage1 = overriddenValueWarning(
                varName,
                currSrcRange
              )
              const errorUnderline1 = this.getErrorUnderline(
                varInfo.initSrcRange,
                errorMessage1,
                false
              )
              this.addError(errorUnderline1)

              // adds warning to previous id initialization location
              const errorMessage2 = overridingValueWarning(
                varName,
                varInfo.initSrcRange
              )
              const errorUnderline2 = this.getErrorUnderline(
                currSrcRange,
                errorMessage2,
                false
              )
              this.addError(errorUnderline2)
            }
          }
          varInfo.initSrcRange = currSrcRange
          // TODO: might make sense to initialize every var to a overarrching type?
          // just straight up setting to a Paramter type here feels unelegant.

          if (
            !isSubtTypeOf(varInfo.type, varTypes.Parameter) &&
            isSubtTypeOf(varTypes.Parameter, varInfo.type)
          ) {
            varInfo.type = varTypes.Parameter
          }
          // for hovers
          varInfo.value = ctx.decl_assignment()?.sum().text
          const refSrcRange = this.getSrcRange(nmbi.var_name().NAME())
          varInfo.refLocations.set(refSrcRange.toString(), refSrcRange)
        }
      }
    }
  }

  /**
   *
   * @param ctx
   */
  visitDeclaration(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    try {
      // grammar def: declaration : decl_modifiers decl_item (',' decl_item)*;
      if (ctx.children) {
        // we visit the children first
        // something like this is valid: "species B = 1, C = 2, D = 3;"

        // visit children first for convenience, as we then have
        // them inside the ST's for the following steps
        for (let i = 0; i < ctx.children.length; i++) {
          this.visit(ctx.children[i])
        }

        // we are looping this way to only hit the Decl_itemContext nodes.
        for (let i = 1; i < ctx.children.length; i += 2) {
          const declItem = ctx.children[i]
          const varName = this.getVarName(
            declItem.namemaybein().var_name().text
          )
          const currIdSrcRange = this.getSrcRange(
            declItem
              .namemaybein()
              .var_name()
              .NAME()
          )
          const currAssignSrcRange = this.getSrcRange(declItem) //(declItem.namemaybein().var_name().NAME());
          const currST = this.getCurrST()

          // check if we are using $ to apply const
          let varIsConst = varName.charAt(0) === "$"
          if (varIsConst) {
            currAssignSrcRange.start.column += 1
            currIdSrcRange.start.column += 1
          }

          let varInfo
          if (currST) {
            varInfo = currST.getVar(varName)
          }

          // gauranteed to pass this check as children visited first.
          if (varInfo) {
            // for hover
            varInfo.refLocations.set(currIdSrcRange.toString(), currIdSrcRange)
            // type overried takes precedence over value reassignement.
            // should this continue being the case, or should both cases be reported?
            // for now keep it as report both.

            // take care of modifiers
            let declModifiers = ctx.decl_modifiers()
            varInfo.substanceOnly =
              declModifiers.SUB_MODIFIER() !== undefined ||
              varInfo.substanceOnly
            varInfo.isConst =
              declModifiers.VAR_MODIFIER()?.text === varTypes.Const ||
              varInfo.isConst
            let typeString = declModifiers.TYPE_MODIFIER()?.text

            if (typeString) {
              const type = getTypeFromString(typeString)

              if (varInfo.canSetType(type)) {
                varInfo.type = type
                varInfo.idSrcRange = currIdSrcRange
              } else {
                // error! trying to overried previous type decl
                const errorMessage = incompatibleTypesError(type, varInfo)
                const errorUnderline = this.getErrorUnderline(
                  currIdSrcRange,
                  errorMessage,
                  true
                )
                this.addError(errorUnderline)
              }
            }

            // check if initialize node exists
            if (declItem.decl_assignment()) {
              // check if it is initialized.
              // as the children are visited first.
              if (varInfo.initSrcRange !== undefined) {
                // warning case! reinitalization!
                if (
                  varInfo.initSrcRange &&
                  varInfo.initSrcRange.toString() !==
                    currAssignSrcRange.toString()
                ) {
                  const errorMessage1 = overriddenValueWarning(
                    varName,
                    currAssignSrcRange
                  )
                  const errorUnderline1 = this.getErrorUnderline(
                    varInfo.initSrcRange,
                    errorMessage1,
                    false
                  )
                  this.addError(errorUnderline1)

                  const errorMessage2 = overridingValueWarning(
                    varName,
                    varInfo.initSrcRange
                  )
                  const errorUnderline2 = this.getErrorUnderline(
                    currAssignSrcRange,
                    errorMessage2,
                    false
                  )
                  this.addError(errorUnderline2)
                }
              }
              varInfo.initSrcRange = currAssignSrcRange
            }
            varInfo.refLocations.set(currIdSrcRange.toString(), currIdSrcRange)
          }
        }
      }
    } catch (e) {
      // console.log(e);
      return
    }
  }

  visitAssignment(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])
      }

      // now record the assigned variable as assigned.
      const nmbi = ctx.children[0]
      const varName = nmbi.var_name().text
      const currSrcRange = this.getSrcRange(ctx)

      const currST = this.getCurrST()

      if (currST) {
        let varInfo
        // because we visit the children first, it is
        // gauranteed that the var is in the currST.
        if ((varInfo = currST.getVar(varName)) !== undefined) {
          if (varInfo.initSrcRange !== undefined) {
            // warning case! reinitalization!
            if (varInfo.initSrcRange) {
              // adds warning to current id location
              const errorMessage1 = overriddenValueWarning(
                varName,
                currSrcRange
              )
              const errorUnderline1 = this.getErrorUnderline(
                varInfo.initSrcRange,
                errorMessage1,
                false
              )
              this.addError(errorUnderline1)

              // adds warning to previous id initialization location
              const errorMessage2 = overridingValueWarning(
                varName,
                varInfo.initSrcRange
              )
              const errorUnderline2 = this.getErrorUnderline(
                currSrcRange,
                errorMessage2,
                false
              )
              this.addError(errorUnderline2)
            }
          }
          varInfo.initSrcRange = currSrcRange
          // TODO: might make sense to initialize every var to a overarrching type?
          // just straight up setting to a Paramter type here feels unelegant.
          if (
            !isSubtTypeOf(varInfo.type, varTypes.Parameter) &&
            isSubtTypeOf(varTypes.Parameter, varInfo.type)
          ) {
            varInfo.type = varTypes.Parameter
          }

          // for hovers
          varInfo.value = ctx.sum().text
          const refSrcRange = this.getSrcRange(nmbi.var_name().NAME())
          varInfo.refLocations.set(refSrcRange.toString(), refSrcRange)
        }
      }
    }
  }

  /**
   * Handles the cases: check .g4 file fill this part in
   *
   * This method SHOULD NOT error when compartment does not exist!
   * That is an error that should be taken care of by semantic checking!!!
   * DO NOT do more that is needed for the symbol table!!
   * @param ctx
   */
  visitNamemaybein(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }
    // ID case 1
    // here if ID already exists in ST than no more to be done,
    // if ID does not exist than it is added as a variable type.

    // ID in ID2 case 2
    // here if ID2 does not exist, assume it is a compartment
    // if ID2 does exist, it must be of type compartment.

    const id1 = this.getVarName(ctx.var_name().text)
    const in_compCtx = ctx.in_comp()
    let isConst = ctx.var_name().text.charAt(0) === "$"

    // case 1, we will always deal with ID
    const currST = this.getCurrST()

    if (currST) {
      // create a STVarInfo
      // we initialize as a variable before further info is known.
      let id1SrcRange = this.getSrcRange(ctx.var_name())
      if (isConst) {
        // we do this so we odn't underline the $
        id1SrcRange.start.column += 1
      }
      let id1VarInfo = new Variable(
        varTypes.Unknown,
        isConst,
        undefined,
        id1SrcRange,
        undefined,
        false
      )
      id1VarInfo.type = varTypes.Variable

      // check for case 2
      if (in_compCtx) {
        const id2 = this.getVarName(in_compCtx.var_name().text)
        const id2SrcRange = this.getSrcRange(in_compCtx.var_name())
        // check if the compartment is already defined.
        let id2VarInfo = currST.getVar(id2)
        if (id2VarInfo) {
          id2VarInfo.refLocations.set(id2SrcRange.toString(), id2SrcRange)

          // exists, check if it is a compartment
          if (id2VarInfo.canSetType(varTypes.Compartment)) {
            id2VarInfo.type = varTypes.Compartment
            id1VarInfo.compartment = id2
            //  check for const
            id1VarInfo.isConst =
              id1VarInfo.isConst || in_compCtx.var_name().text.charAt(0) === "$"
          } else {
            //error, trying to say some value is in a noncompartment type
            const errorMessage = incompatibleTypesError(
              varTypes.Compartment,
              id2VarInfo
            )
            const errorUnderline = this.getErrorUnderline(
              id2SrcRange,
              errorMessage,
              true
            )
            this.addError(errorUnderline)
          }
        } else {
          // does not exist in ST yet, add as uninitialized compartment (default value).
          let id2VarInfo = new Variable(
            varTypes.Compartment,
            false,
            undefined,
            id2SrcRange,
            undefined,
            false
          )
          currST.setVar(id2, id2VarInfo)
          id1VarInfo.compartment = id2

          // we do NOT error for unitialization! that will be taken care of
          // by the semantic visitor!
        }
      }

      // case 1
      // ST exists, check if var is already recorded.
      // if not, then add var to ST as a variable
      if (!currST.getVar(id1)) {
        // set the var in the ST
        currST.setVar(id1, id1VarInfo)
      }
    }
  }

  visitVariable_in(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    this.visitNamemaybein(ctx)
  }

  /**
   * important!! a reaction name node does NOT
   * indicate that the type is a reaction!!
   * @param ctx
   */
  visitReaction_name(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    // we call visit on nmbi because a reaction_name node
    // indicates nothing about type being a reaction
    this.visit(ctx.namemaybein())
  }

  visitReaction(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    // visiting will probably need to be done partial manually
    const reactionName = ctx.reaction_name()
    let id = ""
    if (reactionName) {
      id = reactionName.namemaybein().text
      this.handleEventOrReactionName(id, reactionName, varTypes.Reaction)
    }

    const currST = this.getCurrST()

    // check if the reaction has a rate rule
    // no need to remember rate rule for error checking?
    if (ctx.sum()) {
      // record that this reaction var has a rate rule assigned to it
      if (reactionName && currST) {
        let varInfo = currST.getVar(id)
        if (varInfo) {
          // here since this is a REACTION
          // I am choosing to have the initSrcRange
          // be just the id range, as opposed to the whole
          // assignment statement in regular assignment
          varInfo.initSrcRange = varInfo.idSrcRange
        }
      }
    }

    // go through children
    // if we have in_comp, we need to set compartment info
    // else we just visit as usual?
    if (ctx.children) {
      let reactionSpecies = new Set()
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])

        // for compartment case:
        if (ctx.children[i] instanceof Species_listContext) {
          let speciesList = ctx.children[i]
          if (speciesList.children) {
            for (let j = 0; j < speciesList.children.length; j += 2) {
              reactionSpecies.add(speciesList.children[j].text)
            }
          }
        }
      }

      const inComp = ctx.in_comp()
      if (inComp && currST) {
        // in a compartment! need to know which species are in this reaciton
        // then try to assign compartment to them.

        // get the compartment id
        const compartmentId = inComp.var_name().text
        const compartmentIDsrcRange = this.getSrcRange(inComp.var_name())
        // check if compartment id already exists;
        let compartmentInfo = currST.getVar(compartmentId)
        let validCompartment = true
        if (compartmentInfo !== undefined) {
          // add location for hover
          compartmentInfo.refLocations.set(
            compartmentIDsrcRange.toString(),
            compartmentIDsrcRange
          )

          // back to type checking
          if (compartmentInfo.canSetType(varTypes.Compartment)) {
            compartmentInfo.type = varTypes.Compartment
          } else {
            validCompartment = false
            // type issue!
            const errorMessage = incompatibleTypesError(
              varTypes.Compartment,
              compartmentInfo
            )
            this.addError(
              this.getErrorUnderline(compartmentIDsrcRange, errorMessage, true)
            )
          }
        } else {
          // compartment id does not exist as a variable yet
          compartmentInfo = new Variable(
            varTypes.Unknown,
            false,
            undefined,
            compartmentIDsrcRange,
            undefined,
            false
          )
          compartmentInfo.type = varTypes.Compartment
          currST.setVar(compartmentId, compartmentInfo)
        }

        // if there is a type issue with the compartment, we do not set.
        if (validCompartment) {
          // set reaction id's compartment
          let reactionInfo = currST.getVar(id)
          if (reactionInfo) {
            reactionInfo.compartment = compartmentId
          }

          // set compartment of species in reaction
          for (let speciesId of Array.from(reactionSpecies.values())) {
            let speciesInfo = currST.getVar(speciesId)
            if (speciesInfo && speciesInfo.compartment === undefined) {
              speciesInfo.compartment = compartmentId
            }
          }
        }
      }
    }
  }

  /**
   * // event
        event : reaction_name? 'at' event_delay? bool_exp event_trigger_list? ':' event_assignment_list;

        event_delay : bool_exp 'after';

        event_trigger_list : (',' event_trigger)*;

        // atom has to be changed to (NUMBER | var_name)
        event_trigger : 't0' '=' BOOLEAN
            | 'priority' '=' sum
            | 'fromTrigger' '=' BOOLEAN
            | 'persistent' '=' BOOLEAN;
   * @param ctx
   */
  visitEvent(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const eventName = ctx.reaction_name()
    let id = ""
    if (eventName) {
      id = eventName
        .namemaybein()
        .var_name()
        .NAME().text
      this.handleEventOrReactionName(id, eventName, varTypes.Event)
    }

    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])
      }
    }
  }

  visitEvent_assignment(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const varNameCtx = ctx.var_name()
    this.handleParameterVarNameContext(varNameCtx)
    this.visit(ctx.sum())
  }

  /**
   * Handles the reaction_nameContext that declares the
   * id of either a reaction or an event, handling error checking type
   * assignment, and inserting into the ST if needed.
   * @param id the id of the reaction/event
   * @param name
   * @param type
   */
  handleEventOrReactionName(id, name, type) {
    if (this.hasParseError(name)) {
      return
    }

    if (type === varTypes.Event) {
      debugger
    }

    this.visit(name.namemaybein())
    const currST = this.getCurrST()
    const idSrcRange = this.getSrcRange(name.namemaybein().var_name())

    if (currST) {
      const varInfo = currST.getVar(id)

      if (varInfo) {
        varInfo.refLocations.set(idSrcRange.toString(), idSrcRange)

        if (isSubtTypeOf(type, varInfo.type)) {
          varInfo.type = type
        } else {
          const errorMessage = incompatibleTypesError(type, varInfo)
          const errorUnderline = this.getErrorUnderline(
            idSrcRange,
            errorMessage,
            true
          )
          this.addError(errorUnderline)
        }
      }
    }
  }

  /**
   * deals vars that are expected to have a type of Parameter.
   * @param varNameCtx
   */
  handleParameterVarNameContext(varNameCtx) {
    if (this.hasParseError(varNameCtx)) {
      return
    }

    const varName = this.getVarName(varNameCtx.NAME().text)
    const isConst = varNameCtx.text.charAt(0) === "$"
    const idSrcRange = this.getSrcRange(varNameCtx.NAME())

    // if it exists, type checks, etc
    // if not, then add to ST as a parameter.
    const currST = this.getCurrST()
    if (currST) {
      let existingVarInfo = currST.getVar(varName)

      if (existingVarInfo) {
        // update hover
        existingVarInfo.refLocations.set(idSrcRange.toString(), idSrcRange)

        // error check
        if (existingVarInfo.canSetType(varTypes.Parameter)) {
          existingVarInfo.type = varTypes.Parameter
          existingVarInfo.idSrcRange = idSrcRange
        } else if (!isSubtTypeOf(existingVarInfo.type, varTypes.Parameter)) {
          const errorMessage = incompatibleTypesError(
            varTypes.Parameter,
            existingVarInfo
          )
          const errorUnderline = this.getErrorUnderline(
            idSrcRange,
            errorMessage,
            true
          )
          this.addError(errorUnderline)
        }
      } else {
        // does not exist.
        const varInfo = new Variable(
          varTypes.Parameter,
          isConst,
          undefined,
          idSrcRange,
          undefined,
          false
        )
        currST.setVar(varName, varInfo)
      }
    }
  }

  // this is for sum expressions
  // or perhaps "some" expressions? wink wink XD
  visitAtom(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const varNameCtx = ctx.var_name()
    if (varNameCtx) {
      this.handleParameterVarNameContext(varNameCtx)
    } else {
      // not at an atom that has a varname
      // we only care about ones with varNames because that is
      // where semantic checking is relevant, so here we just
      // continue on to the children.
      if (ctx.children) {
        for (let i = 0; i < ctx.children.length; i++) {
          this.visit(ctx.children[i])
        }
      }
    }
  }

  //TODO: make a function for the "annotation already exists" warning.
  visitAnnotation(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const varName = ctx.var_name().text // Get the species name
    const annotationLink = ctx.ESCAPED_STRING().text // Get the annotation
    const idSrcRange = this.getSrcRange(ctx.var_name().NAME())
    const annotationKeyword = ctx.ANNOT_KEYWORD().text

    const currST = this.getCurrST()
    let varInfo = currST?.getVar(varName)
    if (varInfo) {
      if (!varInfo.annotationKeywordMap.has(annotationLink)) {
        varInfo.annotationLineRange.set(annotationLink, this.getSrcRange(ctx))
        varInfo.annotations.push(annotationLink)
        varInfo.annotationKeywordMap.set(annotationLink, annotationKeyword)

        // for adding links to monaco
        this.globalST.annotationSet.add(annotationLink)
      } else {
        // case where there is only one annotation for each keyword used.
        const currAnnotSrcRange = this.getSrcRange(ctx.ESCAPED_STRING())
        const errorMessage = "this annotation already exists"
        const errorUnderline = this.getErrorUnderline(
          currAnnotSrcRange,
          errorMessage,
          false
        )
        this.addError(errorUnderline)
      }
      // update ref locations for hover
      varInfo.refLocations.set(idSrcRange.toString(), idSrcRange)
    } else {
      // var does not exist, so create one
      const varInfo = new Variable(
        varTypes.Unknown,
        false,
        undefined,
        idSrcRange,
        undefined,
        false
      )
      varInfo.annotationLineRange.set(annotationLink, this.getSrcRange(ctx))
      varInfo.annotations.push(annotationLink)
      varInfo.annotationKeywordMap.set(annotationLink, annotationKeyword)

      currST?.setVar(varName, varInfo)

      // for adding links to monaco
      this.globalST.annotationSet.add(annotationLink)
    }

    try {
      // go through possible list
      let annotList = ctx.annot_list()
      if (annotList?.children) {
        for (let i = 0; i < annotList.children.length; i++) {
          let singleAnnot = annotList.children[i]
          const currAnnotLink = singleAnnot.ESCAPED_STRING().text

          if (varInfo) {
            if (!varInfo.annotationKeywordMap.has(currAnnotLink)) {
              varInfo.annotationLineRange.set(
                currAnnotLink,
                this.getSrcRange(ctx)
              )
              varInfo.annotations.push(currAnnotLink)
              varInfo.annotationKeywordMap.set(currAnnotLink, annotationKeyword)

              // for adding links to monaco
              this.globalST.annotationSet.add(annotationLink)
            } else {
              const currAnnotSrcRange = this.getSrcRange(
                singleAnnot.ESCAPED_STRING()
              )
              const errorMessage = "this annotation already exists"
              const errorUnderline = this.getErrorUnderline(
                currAnnotSrcRange,
                errorMessage,
                false
              )
              this.addError(errorUnderline)
            }
          }
        }
      }
    } catch (e) {
      // do nothing
      console.log("parse error in annotations, prob no need to fix")
    }
  }
}
