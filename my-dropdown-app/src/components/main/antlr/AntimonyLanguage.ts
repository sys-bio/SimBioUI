import * as monaco from "monaco-editor";

export const antimonyLanguage: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      [/\/\/.*/, 'comment'],
      [/"[^"]*"/, 'string'], // Rule for anything surrounded by double quotation marks (")
      [/\(|\)/, 'connected-parentheses'], // Rule for connected parentheses
      [/=>|->/, 'transform'],
      [/=|:=/, 'assign'],
      ['\\-|\\+|\\*|\\/|\\^|\\;', 'operator'],
      ['\\b(at|in|import|has)\\b', 'keywords'],
      [
        /(?:identity|biological_entity_is|hasPart|part|isPartOf|parthood|isVersionOf|hypernym|hasVersion|version|isHomologTo|homolog|isDescribedBy|description|isEncodedBy|encoder|encodes|encodement|occursIn|container|hasProperty|property|isPropertyOf|propertyBearer|hasTaxon|taxon|sboTerm|model_entity_is|origin)/,
        'annotation'
      ],
      [/\b[a-zA-Z0-9_]+\:/, 'react-remov'], // Add this rule for strings starting with anything except for symbols and ending with a colon
      [/@?[a-zA-Z][\w$]*/, {
        cases: {
          const: 'const',
          unit: 'unit',
          var: 'var',
          species: 'species',
          function: 'function',
          model: 'model',
          end: 'end',
          compartment: 'compartment',
          '@default': 'other',
        },
      }],
      [
        /\b(?:\d+(\.\d*)?|\.\d+|0[xX][0-9a-fA-F]+|0o[0-7]+|0b[01]+|\d+[eE][-+]?\d+|\d+[eE][-+]?\d+f|[-+]?\d+f)\b/,
        'number',
      ], // Combined regex for various number formats
    ],
    whitespace: [
      [/[ \t\r\n]+/, 'white'],
    ],
  },
};