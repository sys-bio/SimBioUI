/**
 * represents a single location
 * in the web editor, ie (line, col)
 */
export class SrcPosition {
  constructor(line, column) {
    this.line = line
    this.column = column
  }

  toString() {
    return this.line + ":" + this.column
  }
}

/**
 * represents a range consisting of a
 * starting and ending SrcPosition
 */
export class SrcRange {
  constructor(start, stop) {
    this.start = start
    this.end = stop
  }

  toString() {
    return this.start.toString() + " - " + this.end.toString()
  }
}

//---------------------------------------//

// copied from vscode-antimony types file.
export let varTypes

;(function(varTypes) {
  varTypes["Unknown"] = "unknown"
  varTypes["Const"] = "const"
  varTypes["Variable"] = "variable"
  varTypes["Submodel"] = "submodel"
  varTypes["Model"] = "model"
  varTypes["Function"] = "function"
  varTypes["Unit"] = "unit"
  varTypes["ModularModel"] = "mmodel"
  varTypes["Import"] = "import"
  varTypes["Parameter"] = "parameter"
  varTypes["Species"] = "species"
  varTypes["Compartment"] = "compartment"
  varTypes["Reaction"] = "reaction"
  varTypes["Interaction"] = "interaction"
  varTypes["Event"] = "event"
  varTypes["Constraint"] = "constraint"
  varTypes["Deleted"] = "deleted"
})(varTypes || (varTypes = {}))

export function getTypeFromString(type) {
  switch (type) {
    case "species":
      return varTypes.Species
    case "compartment":
      return varTypes.Compartment
    case "const":
      return varTypes.Const
    case "var":
      return varTypes.Variable
    default:
      // this *should* be caught by parsing.
      // error out for now
      console.error("weird/bad type found " + type)
      return varTypes.Unknown
  }
}

/**
 * returns if type1 is a subtype (derives from) type2
 * copy of 'derives_from' method in vscode-antimony types file for now
 * https://github.com/sys-bio/vscode-antimony/blob/master/vscode-antimony/src/server/stibium/stibium/types.py
 * @param type1
 * @param type2
 */
export function isSubtTypeOf(type1, type2) {
  if (type1 === type2) {
    return true
  }

  if (type2 === varTypes.Unknown) {
    return true
  }

  let set = new Set()
  set.add(varTypes.Species)
  set.add(varTypes.Compartment)
  set.add(varTypes.Reaction)
  set.add(varTypes.Constraint)
  set.add(varTypes.Event)

  let derives_from_param = set.has(type1)

  if (type2 === varTypes.Variable) {
    return derives_from_param || type1 === varTypes.Parameter
  }

  if (type2 === varTypes.Parameter) {
    return derives_from_param
  }

  return false
}