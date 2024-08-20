/**
 * @class Result
 * Class holds result of an action. Holds the result, a string,
 * and a bool, indicating whether the action was successful.
 */
class Result {
    /**
     * Constructs a new Result instance.
     * @param {boolean} success of the action
     * @param {string} result if successful: the result, else error.
     * @param {string} warnings found during SBML parsing.
     */
    constructor(success = false, result = 'empty', warnings = 'empty') {
        this.success = success
        this.result = result
        this.warnings = warnings
    }

    /**
     *
     * @returns bool: true if action successful, false if failed.
     */
    isSuccess() {
        return this.success
    }

    /**
     * Returns either model or error string.
     * @returns string
     */
    getResult() {
        return this.result
    }

    /**
     * Returns any warnings found.
     * @returns string
     */
    getWarnings() {
        return this.warnings
    }
}

/**
 * @class AntimonyWrapper
 *  This class wraps all the functions exported from emscripten
 *  libantimony.js library into a simpler interface.
 */
class AntimonyWrapper {
    /**
     * Constructs a new AntimonyWrapper instance from the WASM module
     * @param AntimonyModule the WASM module
     */
    constructor(AntimonyModule) {
        // Mapping the emscripten functions
        this.loadString = AntimonyModule.cwrap('loadString', 'number', ['number']);
        this.loadAntimonyString = AntimonyModule.cwrap('loadAntimonyString', 'number', ['number']);
        this.loadSBMLString = AntimonyModule.cwrap('loadSBMLString', 'number', ['number']);
        this.getSBMLString = AntimonyModule.cwrap('getSBMLString', 'string', ['null']);
        this.getAntimonyString = AntimonyModule.cwrap('getAntimonyString', 'string', ['null']);
        this.getCompSBMLString = AntimonyModule.cwrap('getCompSBMLString', 'string', ['string']);
        this.clearPreviousLoads = AntimonyModule.cwrap('clearPreviousLoads', 'null', ['null']);
        this.getLastError = AntimonyModule.cwrap('getLastError', 'string', ['null']);
        this.getWarnings = AntimonyModule.cwrap('getWarnings', 'string', ['null']);
        this.getSBMLWarnings = AntimonyModule.cwrap('getSBMLWarnings', 'string', ['string']);
        this.freeAll = AntimonyModule.cwrap('freeAll', 'null', ['null']);

        // Emscripten functions (direct calls)
        this.jsFree = (strPtr) => AntimonyModule._free(strPtr);
        this.jsAllocateUTF8 = (newStr) => AntimonyModule.allocateUTF8(newStr);
    }

    /**
     * Converts antimony model to an SBML model.
     * @param {string} antCode the antimony model to be converted.
     * @returns Result instance of the model conversion to SBML
     */
    convertAntimonyToSBML(antCode) {
        this.clearPreviousLoads();
        let newResult;
        let sbmlResult;
        let warnings = '';
        let ptrAntCode = this.jsAllocateUTF8(antCode);
        let load_int = this.loadAntimonyString(ptrAntCode);
        warnings = this.getSBMLWarnings();

        if (load_int > 0) {
            sbmlResult = this.getSBMLString();
            newResult = new Result(true, sbmlResult, warnings);

            // Dispatch event with SBML result
            const event = new CustomEvent('grabbedSBMLResult', { detail: sbmlResult });
            window.dispatchEvent(event);
        } else {
            const errStr = this.getLastError();
            newResult = new Result(false, errStr, warnings);
        }

        this.jsFree(ptrAntCode);
        return newResult;
    }

    /**
     * Converts SBML model to an Antimony model and appends metadata if in 'biomodels' conversion mode.
     * @param {string} sbmlCode the SBML model to be converted.
     * @returns Result instance of the model conversion to Antimony
     */
convertSBMLToAntimony(sbmlCode) {
    // Clear any previously loaded models in the library
    this.clearPreviousLoads();

    let antResult;   // Variable to store the converted Antimony result
    let warnings = '';  // Variable to store any warnings from the conversion
    let newResult;   // Variable to store the result instance

    // Allocate memory in the WASM module for the SBML string
    let ptrSBMLCode = this.jsAllocateUTF8(sbmlCode);

    // Load the SBML string into the Antimony library
    let load_int = this.loadSBMLString(ptrSBMLCode);

    // Retrieve warnings, if any, from the SBML loading process
    warnings = this.getSBMLWarnings();

    // Check if the SBML loading was successful
    if (load_int > 0) {
        // Convert the loaded SBML model to an Antimony string
        antResult = this.getAntimonyString();
        // Check if the conversion mode is set to 'biomodels'
        if (window.conversion === "biomodels") {
            // Append metadata (such as citation, links, etc.) to the Antimony result
            const citation = window.citation ? `// Citation: ${window.citation}` : "// No citation provided by PubMed";
            antResult = `// Link to the paper: ${window.url}\n` +
                        `// Link to BioModels: ${window.biomodelsUrl}\n` +
                        `// Title: ${window.title}\n` +
                        `// Authors: ${window.authors}\n` +
                        `// Journal: ${window.journal}\n` +
                        `${citation}\n` +
                        `// Date: ${window.date}\n` + antResult;

            // Reset the conversion mode to 'standard' after processing
            window.conversion = "standard";
        }

        // Create a new Result instance indicating success
        newResult = new Result(true, antResult, warnings);

        // Dispatch a custom event with the Antimony result
        const event = new CustomEvent('grabbedAntimonyResult', { detail: antResult });
        window.dispatchEvent(event);

        // Store the result globally (in case it's needed elsewhere in the application)
        window.antimonyResult = antResult;

    } else {
        // If loading failed, retrieve the last error message
        const errStr = this.getLastError();

        // Create a new Result instance indicating failure
        newResult = new Result(false, errStr, warnings);

        // Optionally, you can alert the user about the error
        window.alert(errStr);
    }

    // Free the allocated memory for the SBML string in the WASM module
    this.jsFree(ptrSBMLCode);

    // Return the result instance (either success or failure)
    return newResult;
	}
}

// Export the AntimonyWrapper class if module is defined
if (typeof module !== 'undefined') {
    module.exports = AntimonyWrapper;
}