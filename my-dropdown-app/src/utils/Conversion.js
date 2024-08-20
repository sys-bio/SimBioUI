// Keep the require for local testing using node path/to/Conversion.js or can use npm start
// libantimony = require('./libantimony.js');

var sbmlResult = "None";

var loadAntimonyString; // libantimony function
var loadString;   // 		"
var loadSBMLString; //		"
var getSBMLString; //		"
var getAntimonyString; //	"
var getCompSBMLString; //	"
var clearPreviousLoads; //	"
var getLastError; //		"
var getWarnings;  //		"
var getSBMLInfoMessages; //	"
var getSBMLWarnings; //		"
var freeAll;      //		"
var jsFree;         // emscripten function
var jsAllocateUTF8; //

/**
 * @description Load LibAntimonyJs and use the library's functions to convert Antimony to SBML
 */
function processAntimony() {
  // Grab antimonyString global variable from AntimonyEditor to get ant model string
  let antimonyString = window.antimonyString;
  const event = new CustomEvent('grabbedSBMLResult', { detail: window.sbmlResult });
  try {
    libantimony().then((libantimony) => {
      // Load LibAntimonyJs
      // Format: libantimony.cwrap( function name, return type, input param array of types).
      loadString = libantimony.cwrap('loadString', 'number', ['string']);
      loadAntimonyString = libantimony.cwrap('loadAntimonyString', 'number', ['string']);
      loadSBMLString = libantimony.cwrap('loadSBMLString', 'number', ['string']);
      getSBMLString = libantimony.cwrap('getSBMLString', 'string', ['null']);
      getAntimonyString = libantimony.cwrap('getAntimonyString', 'string', ['null']);
      getCompSBMLString = libantimony.cwrap('getCompSBMLString', 'string', ['string']); 
      clearPreviousLoads = libantimony.cwrap('clearPreviousLoads', 'null', ['null']);
      getLastError = libantimony.cwrap('getLastError', 'string', ['null']);
      getWarnings = libantimony.cwrap('getWarnings', 'string', ['null']);
      getSBMLInfoMessages = libantimony.cwrap('getSBMLInfoMessages', 'string', ['string']);
      getSBMLWarnings = libantimony.cwrap('getSBMLWarnings', 'string', ['string']);
      freeAll = libantimony.cwrap('freeAll', 'null', ['null']);
      jsAllocateUTF8 = (newStr) => libantimony.allocateUTF8(newStr);
      jsUTF8ToString = (strPtr) => libantimony.UTF8ToString(strPtr);
      jsFree = (strPtr) => libantimony._free(strPtr);

      // Load Antimony string to the library
      var ptrAntCode = jsAllocateUTF8(antimonyString);
      var load_int = loadAntimonyString(antimonyString);

      // If Antimony string has no errors, grab sbml string and save to sbmlString global variable.
      if (load_int > 0) {
        sbmlResult = getSBMLString();
        window.sbmlResult = sbmlResult;
        window.dispatchEvent(event);
      } else {
        var errStr = getLastError();
        window.alert(errStr);
      }
      jsFree(ptrAntCode);
    });
  } catch (err) {
    console.log("Load libantimony error: ", err);
  }
}

function processSBML() {
  // Grab antimonyString global variable from AntimonyEditor to get ant model string
  let sbmlString = window.sbmlString;
  const event = new CustomEvent('grabbedAntimonyResult', { detail: window.antimonyString });
  try {
    libantimony().then((libantimony) => {
      // Load LibAntimonyJs
      // Format: libantimony.cwrap( function name, return type, input param array of types).
      loadString = libantimony.cwrap('loadString', 'number', ['string']);
      loadAntimonyString = libantimony.cwrap('loadAntimonyString', 'number', ['string']);
      loadSBMLString = libantimony.cwrap('loadSBMLString', 'number', ['string']);
      getSBMLString = libantimony.cwrap('getSBMLString', 'string', ['null']);
      getAntimonyString = libantimony.cwrap('getAntimonyString', 'string', ['null']);
      getCompSBMLString = libantimony.cwrap('getCompSBMLString', 'string', ['string']); 
      clearPreviousLoads = libantimony.cwrap('clearPreviousLoads', 'null', ['null']);
      getLastError = libantimony.cwrap('getLastError', 'string', ['null']);
      getWarnings = libantimony.cwrap('getWarnings', 'string', ['null']);
      getSBMLInfoMessages = libantimony.cwrap('getSBMLInfoMessages', 'string', ['string']);
      getSBMLWarnings = libantimony.cwrap('getSBMLWarnings', 'string', ['string']);
      freeAll = libantimony.cwrap('freeAll', 'null', ['null']);
      jsAllocateUTF8 = (newStr) => libantimony.allocateUTF8(newStr);
      jsUTF8ToString = (strPtr) => libantimony.UTF8ToString(strPtr);
      jsFree = (strPtr) => libantimony._free(strPtr);

      sbmlCode = sbmlString;
      console.log(sbmlCode);
      clearPreviousLoads();
      var ptrSBMLCode = jsAllocateUTF8(sbmlCode);
      var load_int = loadSBMLString(sbmlCode);

      if (load_int > 0) {
        antResult = getAntimonyString();
        if (window.conversion == "biomodels") {
          citation = (window.citation == null) ? "// No citation provided by PubMed" : "// Citation: " + window.citation;
          antResult = "// Link to the paper: " + window.url + "\n" + "// Link to BioModels: " + window.biomodelsUrl + "\n" +
            "// Title: " + window.title + "\n" + "// Authors: " + window.authors + "\n" + 
            "// Journal: " + window.journal + "\n" + citation + "\n" + "// Date: " + window.date + "\n" + antResult
            window.conversion = "standard";
        }
        window.antimonyResult = antResult;
        console.log(window.antimonyResult);
        window.dispatchEvent(event);
      } else {
        var errStr = getLastError();
        window.alert(errStr);
      }
      jsFree(ptrSBMLCode);
    });
  } catch (err) {
    console.log("Load libantimony error: ", err);
  }
}

// Save processAntimony and processSBML function as global function to be used in AntimonyEditor. THIS IS IMPORTANT DO NOT REMOVE.
window.processAntimony = processAntimony;
window.processSBML = processSBML;