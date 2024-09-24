import { ErrorVisitor } from "./ErrorVisitor"
import { isSubtTypeOf, varTypes } from "./Types"
import {
  defaultValueWarning,
  overridingDisplayNameWarning,
  unitializedParameterError,
  unitializedRateLawWarning,
  varNotFound
} from "./SemanticErrors"
import { ErrorNode } from "antlr4ts/tree"

// goal is to loop through and look at all variables, classes,
export class SemanticVisitor extends ErrorVisitor {
  visitIs_assignment(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    // note: we do not check for initialization error
    // on id in is assignment (for now at least).
    const varName = ctx.NAME().text
    const displayName = ctx.ESCAPED_STRING().text
    const currST = this.getCurrST()
    if (currST) {
      const varInfo = currST.getVar(varName)
      const idSrcRange = this.getSrcRange(ctx.NAME())
      varInfo?.refLocations.set(idSrcRange.toString(), idSrcRange)
      if (varInfo !== undefined) {
        // check if there was already a display name assigned
        if (varInfo.displayName === undefined) {
          varInfo.displayName = displayName
        } else {
          // warning for overriding
          const warnMessage = overridingDisplayNameWarning(varName)
          const warnUnderline = this.getErrorUnderline(
            idSrcRange,
            warnMessage,
            false
          )
          this.addError(warnUnderline)
        }
      } else {
        const warnMessage = varNotFound(varName)
        const warnUnderline = this.getErrorUnderline(
          idSrcRange,
          warnMessage,
          false
        )
        this.addError(warnUnderline)
      }
    }
  }

  /**
   * TODO: this whole method
   * @param ctx
   */
  visitAnnotation(ctx) {}

  visitModel(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const name = ctx.NAME().text
    this.setScopeVisitChildren(name, ctx, "model")
  }

  visitModular_model(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const name = ctx.NAME().text
    this.setScopeVisitChildren(name, ctx, "model")
  }

  visitFunction(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    const name = ctx.NAME().text
    this.setScopeVisitChildren(name, ctx, "function")
  }

  visitVar_name(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    this.varInitializationCheck(ctx)
  }

  visitSpecies(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    this.varInitializationCheck(ctx)
  }

  visitReaction(ctx) {
    if (this.hasParseError(ctx)) {
      return
    }

    // don't do anything if children contain an error node
    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        if (ctx.children[i] instanceof ErrorNode) {
          return
        }
      }
    }

    let id = ctx.reaction_name()?.namemaybein().text
    if (id === undefined) {
      id = ""
    }
    if (!ctx.sum()) {
      // although it might make more sense to check in the semantic visitor
      // it really doesn't matter here I think.
      const errorMessage = unitializedRateLawWarning(id)
      this.addError(
        this.getErrorUnderline(this.getSrcRange(ctx), errorMessage, false)
      )
    }

    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])
      }
    }
  }

  /**
   * checks for if the var is initialized, and if
   * not records appropriate errors or warnings.
   * @param ctx context of an variable
   * @requires ctx does not have an exception.
   */
  varInitializationCheck(ctx) {
    const currST = this.getCurrST()
    const varName = ctx.NAME().text
    const idSrcRange = this.getSrcRange(ctx.NAME())
    if (currST) {
      const varInfo = currST.getVar(varName)
      if (
        this.currNameAndScope?.scope !== "function" &&
        varInfo &&
        varInfo.initSrcRange === undefined
      ) {
        if (varInfo.type === varTypes.Parameter) {
          // error, needs initialized value
          //Parameter 'k' missing value assignment
          const errorMessage = unitializedParameterError(varName)
          const errorUnderline = this.getErrorUnderline(
            idSrcRange,
            errorMessage,
            true
          )
          this.addError(errorUnderline)
        } else if (
          isSubtTypeOf(varInfo.type, varTypes.Parameter) &&
          varInfo.type !== varTypes.Reaction &&
          varInfo.type !== varTypes.Event
        ) {
          // warning, using default value
          // Species 'Z' has not been initialized, using default value
          const errorMessage = defaultValueWarning(varName, varInfo.type)
          const errorUnderline = this.getErrorUnderline(
            idSrcRange,
            errorMessage,
            false
          )
          this.addError(errorUnderline)
        }
      }
    }
  }
}
