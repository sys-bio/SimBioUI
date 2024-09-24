/**
 * Error for incompatible types, occurs when it is
 * illegal for oldVar's type to be set to newType
 * @param newType the type we are trying to set oldVar to
 * @param oldVar Variable representing oldVar
 * @returns the error message string
 */
export function incompatibleTypesError(newType, oldVar) {
  const errorMessage =
    "Unable to set the type to '" +
    newType +
    "' because it is already set to be the incompatible type '" +
    oldVar.type +
    "' on line " +
    oldVar.idSrcRange.start.toString()
  return errorMessage
}

/**
 * Error when you declare multiple models with the same name
 * @param name the name of the model
 * @param srcRange the model id location at definition
 * @returns the error message
 */
export function modelAlreadyExistsError(name, srcRange) {
  return (
    "model '" + name + "' already defined on line " + srcRange.start.toString()
  )
}

/**
 * Error when you declare multiple functions with the same name
 * @param name the name of the function
 * @param srcRange the function id location at definition
 * @returns the error message
 */
export function functionAlreadyExistsError(name, srcRange) {
  return (
    "function '" +
    name +
    "' already defined on line " +
    srcRange.start.toString()
  )
}

/**
 * Warning over the assignment being overriden
 * @param name the name of the id being overriden
 * @param srcRange the position of the new overriding value assignment
 * @returns warning message
 */
export function overriddenValueWarning(name, srcRange) {
  const warningMessage =
    "Value assignment to '" +
    name +
    "' is being overridden by a later assignment on line " +
    srcRange.start.toString()
  return warningMessage
}

/**
 * Warning over the assignemtn doing the overriding
 * @param name id being given value assignment
 * @param srcRange srcRange of the previous assignment now overriden
 * @returns warning message
 */
export function overridingValueWarning(name, srcRange) {
  const warningMessage =
    "Value assignment to '" +
    name +
    "' is overriding previous assignment on line " +
    srcRange.start.toString()
  return warningMessage
}

/**
 * Overriding, except for display names.
 * TODO: add overriden warning later, this would also
 * include adding a display name srcRange in Variable.
 * @param name
 * @returns
 */
export function overridingDisplayNameWarning(name) {
  return "overriding previous display name of '" + name + "'"
}

/**
 * Warning over a reaction that has no rate law
 * @returns warning message
 */
export function unitializedRateLawWarning(id) {
  return "Reaction '" + id + "' missing rate law"
}

/**
 * Error when a parameter is not assigned a value
 * @param id
 * @returns error message
 */
export function unitializedParameterError(id) {
  return "Parameter '" + id + "' missing value assignment"
}

/**
 * Warning for when a Species or Compartment is not initialized,
 * and so uses the default value.
 * @param id
 * @returns warning message
 */
export function defaultValueWarning(id, type) {
  return type + " '" + id + "' has not been initialized, using default value"
}

/**
 * Error for when a model or a function has a duplicate parameter name
 * @param id
 * @returns error message
 */
export function duplicateParameterError(id) {
  return "Duplicate param '" + id + "'"
}

/**
 * eg: a is "wow", where a has never been declared anywhere else.
 * @param id
 * @returns
 */
export function varNotFound(id) {
  return "Variable '" + id + "' not found"
}
