import * as monaco from "monaco-editor";

export const WebIridiumLanguage = {
  tokenizer: {
    root: [
      [/\/\/.*/, 'comment'], // Rule for comments starting with double slashes
      [/"[^"]*"/, 'string'], // Rule for strings within double quotes
      [/\(|\)/, 'connected-parentheses'], // Rule for connected parentheses
      [/=>|->/, 'transform'], // Rule for transform symbols (=> or ->)
      [/=|:=/, 'assign'], // Rule for assignment operators
      ['\\-|\\+|\\*|\\/|\\^|\\;', 'operator'], // Rule for operators like +, -, *, /, ^, ;
      ['\\b(at|in|import|has)\\b', 'keywords'], // Rule for specific keywords
      [
        /(?:identity|biological_entity_is|hasPart|part|isPartOf|parthood|isVersionOf|hypernym|hasVersion|version|isHomologTo|homolog|isDescribedBy|description|isEncodedBy|encoder|encodes|encodement|occursIn|container|hasProperty|property|isPropertyOf|propertyBearer|hasTaxon|taxon|sboTerm|model_entity_is|origin)/,
        'annotation'
      ], // Rule for annotations
      [/\b[a-zA-Z0-9_]+\:/, 'react-remov'], // Rule for strings starting with any letters/numbers/underscore and ending with a colon
      [/@?[a-zA-Z][\w$]*/, {
        cases: {
          const: 'const', // Rule for constants
          unit: 'unit', // Rule for units
          var: 'var', // Rule for variables
          species: 'species', // Rule for species
          function: 'function', // Rule for functions
          model: 'model', // Rule for model keyword
          end: 'end', // Rule for end keyword
          compartment: 'compartment', // Rule for compartment keyword
          '@default': 'other', // Default case for other identifiers
        },
      }],
      [
        /\b(?:\d+(\.\d*)?|\.\d+|0[xX][0-9a-fA-F]+|0o[0-7]+|0b[01]+|\d+[eE][-+]?\d+|\d+[eE][-+]?\d+f|[-+]?\d+f)\b/,
        'number',
      ], // Rule for various number formats
    ],
    whitespace: [
      [/[ \t\r\n]+/, 'white'], // Rule for whitespace characters
    ],
  },
};
