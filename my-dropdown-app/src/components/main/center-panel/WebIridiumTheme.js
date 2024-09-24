import * as monaco from "monaco-editor/esm/vs/editor/editor.api"; // Import Monaco Editor

export const WebIridiumTheme: monaco.editor.IStandaloneThemeData = {
    base: 'vs-dark',
    inherit: true,
    colors: {},
    rules: [
      { token: 'species', foreground: '#FD7F20' },
      { token: 'compartment', foreground: '#BC96CA' },
      { token: 'const', foreground: '#dcd52b' },
      { token: 'unit', foreground: '#4954f5' },
      { token: 'var', foreground: '#9CDCFE' },
      { token: 'keywords', foreground: '#45B1A6'},
      { token: 'operator', foreground: '#45B1A6'},
      { token: 'function', foreground: '#8185C9' },
      { token: 'model', foreground: '#8185C9' },
      { token: 'end', foreground: '#8185C9' },
      { token: 'transform', foreground: '#45B1A6'},
      { token: 'annotation', foreground: '#D33682' },
      { token: 'assign', foreground: '#45B1A6'},
      { token: 'other', foreground: '#FFFFFF' },
      { token: 'react-remov', foreground: '#4DC5B9' },
      { token: 'transform', foreground: '#45B1A6'},
      { token: 'comment', foreground: '#76B947' },
      { token: 'string', foreground: '#f2ab7c' },
      { token: 'number', foreground: '#def9cb' },
      { token: 'connected-parentheses', foreground: '#ffe628' }
    ],
};