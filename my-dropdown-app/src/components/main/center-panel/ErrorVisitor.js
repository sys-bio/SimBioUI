import * as monaco from "monaco-editor"
import {
  AbstractParseTreeVisitor,
  ErrorNode,
  TerminalNode
} from "antlr4ts/tree"
import { SrcPosition, SrcRange } from "./Types"
import { ParserRuleContext } from "antlr4ts"

export class ErrorVisitor extends AbstractParseTreeVisitor {
  constructor(globalST) {
    super()
    this.globalST = globalST
    this.currNameAndScope = undefined
    this.errorMap = new Map()
    this.annotationMap = new Map()
    this.generalHoverInfoMap = new Map()
  }

  defaultResult() {}

  /**
   * tells a method if it is safe to error check
   * its contents.
   * @param ctx the ctx in question
   * @returns true if safe, false otherwise
   */
  hasParseError(ctx) {
    if (ctx.exception) {
      return true
    }
    // don't do anything if children contain an error node
    if (ctx.children) {
      for (let i = 0; i < ctx.children.length; i++) {
        if (ctx.children[i] instanceof ErrorNode) {
          return true
        }
      }
    }
    return false
  }

  errorToString(err) {
    let errStr =
      err.startLineNumber +
      "," +
      err.startColumn +
      "," +
      err.endLineNumber +
      "," +
      err.endColumn +
      "," +
      err.message +
      "," +
      err.severity
    return errStr
  }

  /**
   * adds a new error to our stored errors
   * @param err
   */
  addError(err) {
    let key = this.errorToString(err)
    if (!this.errorMap.has(key)) {
      this.errorMap.set(key, err)
    }
  }

  /**
   * gets the list of accumulated errors
   * @returns
   */
  getErrors() {
    return Array.from(this.errorMap.values())
  }

  /**
   * concats the input error list with the one present within the visitor
   * @param errors
   */
  addErrorList(errors) {
    // this.errorList = this.errorList.concat(errors);
    for (let i = 0; i < errors.length; i++) {
      let key = this.errorToString(errors[i])
      if (!this.errorMap.has(key)) {
        this.errorMap.set(key, errors[i])
      }
    }
  }

  /**
   * Creates a ErrorUnderline type to represent a distinct semantic error.
   * @param idSrcRange the line column range the error will give underline to
   * @param message the error message shown when hovering over idSrcRange
   * @param isError true if an error, false if a warning
   * @returns an ErrorUnderline that can be passed to monaco.editor.setModelMarkers()
   */
  getErrorUnderline(idSrcRange, message, isError) {
    let severity = monaco.MarkerSeverity.Error
    if (!isError) {
      severity = monaco.MarkerSeverity.Warning
    }
    let errorUnderline = {
      startLineNumber: idSrcRange.start.line,
      startColumn: idSrcRange.start.column,
      endLineNumber: idSrcRange.end.line,
      endColumn: idSrcRange.end.column,
      message: message,
      severity: severity
    }
    return errorUnderline
  }

  /**
   * returns the ST relevant to the current location
   * in the tree the traversal is at.
   * @returns either the symbol table or undefined (although it should never be undefined).
   */
  getCurrST() {
    let currST = undefined
    if (this.currNameAndScope) {
      // get the ST (this really needs to be a private function lol)
      if (this.currNameAndScope.scope === "model") {
        // make sure that this the symbol table this var is in exists
        currST = this.globalST.getModelST(this.currNameAndScope.name)
      } else if (this.currNameAndScope.scope === "mmodel") {
        // TODO: take care of mmodels
      } else {
        // function
        currST = this.globalST.getFunctionST(this.currNameAndScope.name)
      }
    } else {
      // this.currNameAndScope is undefined, outermost scope
      currST = this.globalST
    }

    return currST
  }

  /**
   * for now when we hit an error node just don't look through
   * it as it is from a parse error
   * @param node
   */
  visitErrorNode(node) {}
  /**
   * given a node, finds the (startline, startcolumn), (endline, endcolumn).
   * TODO: fix this method!! wrong srcRange for assignements.
   *       Also just cleanup the code, it is terrible rn.
   * @param ctx the parse tree node
   * @returns a SrcRange to represent the location range
   */
  getSrcRange(ctx) {
    if (ctx instanceof ParserRuleContext) {
      let startLine = ctx._start.line
      let startColumn = ctx._start.charPositionInLine
      let stopLine = -1
      let stopColumn = -1

      if (ctx._stop) {
        stopLine = ctx._stop.line
        stopColumn = ctx._stop.charPositionInLine + 1
      } else {
        stopLine = startLine
        stopColumn = startColumn + 1
      }

      if (stopLine === startLine && stopColumn === startColumn + 1) {
        stopColumn += ctx.text.length - 1
      }

      let srcRange = new SrcRange(
        new SrcPosition(startLine, startColumn + 1),
        new SrcPosition(stopLine, stopColumn + 1)
      )
      return srcRange
    } else if (ctx instanceof TerminalNode) {
      let start = new SrcPosition(
        ctx._symbol.line,
        ctx._symbol.charPositionInLine + 1
      )
      let end = new SrcPosition(
        ctx._symbol.line,
        ctx._symbol.charPositionInLine + ctx.text.length + 1
      )
      let srcRange = new SrcRange(start, end)

      return srcRange
    } else {
      let srcRange = new SrcRange(new SrcPosition(0, 0), new SrcPosition(0, 0))
      return srcRange
    }
  }

  /**
   * checks for the $varName case,
   * returns just the varname
   * @param id
   */
  getVarName(id) {
    if (id.length === 0) {
      return id
    }

    if (id.charAt(0) === "$") {
      return id.slice(1)
    }

    return id
  }

  /**
   *
   * @param name the name of the function or model scope
   * @param ctx
   * @param scope either "function" or "model"
   */
  setScopeVisitChildren(name, ctx, scope) {
    if (ctx.children) {
      this.currNameAndScope = { name: name, scope: scope }
      for (let i = 0; i < ctx.children.length; i++) {
        this.visit(ctx.children[i])
      }
      this.currNameAndScope = undefined
    }
  }
}

;(function(_ErrorVisitor) {})(ErrorVisitor || (ErrorVisitor = {}))
