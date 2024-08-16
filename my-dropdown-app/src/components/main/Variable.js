import { isSubtTypeOf } from "./Types"

export class Variable {
  constructor(
    type,
    isConst,
    compartment,
    idSrcRange,
    initSrcRange,
    substanceOnly
  ) {
    // this.id = id;
    this.type = type
    this.isConst = isConst
    this.compartment = compartment
    this.idSrcRange = idSrcRange
    this.initSrcRange = initSrcRange
    this.substanceOnly = substanceOnly
    this.value = undefined
    this.displayName = undefined
    this.annotations = []
    this.annotationKeywordMap = new Map()
    this.annotationLineRange = new Map()
    this.refLocations = new Map()
    this.refLocations.set(idSrcRange.toString(), idSrcRange)
  }

  /**
   * returns true when the variable can be set to
   * newType, false otherwise. Only checks if the type
   * can be set, does not actually set the type.
   *
   * @param newType
   * @returns true or false
   */
  canSetType(newType) {
    return isSubtTypeOf(newType, this.type)
  }
}

export {}