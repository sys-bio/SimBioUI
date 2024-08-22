grammar AntimonyGrammar;

// Entry point for parser
root : (simple_stmt | model | function | modular_model)*;

model : NEWLINE? COMMENT? ('model' | 'module') '*'? NAME '()'? simple_stmt_list END;

// End of model
END : 'end';

// Variable names and expressions
var_name : ('$')? NAME;
in_comp : 'in' var_name;
namemaybein : var_name (in_comp)?;

// Event handling
event : reaction_name? 'at' event_delay? bool_exp event_trigger_list? ':' event_assignment_list;

event_delay : bool_exp 'after';

event_trigger_list : (',' event_trigger)*;

event_trigger : 't0' '=' BOOLEAN
    | 'priority' '=' sum
    | 'fromTrigger' '=' BOOLEAN
    | 'persistent' '=' BOOLEAN;

// Reactions
reaction_name : namemaybein ':';
reaction : (reaction_name)? species_list ARROW (species_list)? ';' (sum)? (in_comp)?
    | (reaction_name)? (species_list)? ARROW species_list ';' (sum)? (in_comp)?;
species_list : species ('+' species)*;
species : (NUMBER)? ('$')? NAME;
ARROW : '->'
    | '=>';

// Interaction
interaction : (reaction_name)? species INTERACTION_SYMBOL namemaybein;
INTERACTION_SYMBOL : '-o' | '-|' | '-(';

DOT_IDENTIFIER : '.' LETTER (LETTER | DIGIT)* ;
BACKTICK : '`'+ -> skip;

// Numbers and literals
NUMBER : [0-9]+ ('.' [0-9]+)? | '.' [0-9]+;

// Boolean literals
BOOLEAN : 'true' | 'false';

// Comparisons and logical operations
COMPARE : '>=' | '<=' | '>' | '<' | '==';
LOGICAL : '&&' | '||';

// SBO Term
sboterm: var_name '.sboTerm' '=' SBOTERM;
SBOTERM: NUMBER | 'SBO:' NUMBER;

// Assignments
assignment : namemaybein ('=' | AEQ) sum;
AEQ : ':=';

// Apostrophe and rate rule
apostrophe : '\'';
rate_rule : NAME apostrophe '=' sum;

// Annotations
annotation : var_name ANNOT_KEYWORD ESCAPED_STRING (annot_list)?;
annot_list : (new_annot)+;
new_annot : ',' NEWLINE ESCAPED_STRING;

ANNOT_KEYWORD: 'identity'
    | 'hasPart'
    | 'biological_entity_is'
    | 'parthood'
    | 'part'
    | 'isPartOf'
    | 'isVersionOf'
    | 'hypernym'
    | 'hasVersion'
    | 'version'
    | 'isHomologTo'
    | 'homolog'
    | 'isDescribedBy'
    | 'description'
    | 'isEncodedBy'
    | 'encoder'
    | 'encodes'
    | 'encodement'
    | 'occursIn'
    | 'container'
    | 'hasProperty'
    | 'propertyBearer'
    | 'property'
    | 'isPropertyOf'
    | 'hasTaxon'
    | 'taxon'
    | 'model_entity_is'
    | 'origin';

// Declarations
declaration : decl_modifiers decl_item (',' decl_item)*;
decl_modifiers : VAR_MODIFIER
    | TYPE_MODIFIER
    | VAR_MODIFIER TYPE_MODIFIER
    | SUB_MODIFIER TYPE_MODIFIER
    | VAR_MODIFIER SUB_MODIFIER TYPE_MODIFIER;
decl_item : namemaybein (decl_assignment)?;
decl_assignment : '=' sum;

// Unit declarations
unit : NAME;
unit_declaration : 'unit' var_name '=' sum;
unit_assignment : var_name 'has' sum;

// Model call
mmodel_call : (reaction_name)? NAME '(' (init_params)? ')';

// Modifiers
VAR_MODIFIER: ('var' | 'const');
SUB_MODIFIER: 'substanceOnly';
TYPE_MODIFIER: ('species' | 'compartment' | 'formula');

// Mathematical expressions
bool_exp : expressions
    | expressions (LOGICAL expressions)*;

expressions : sum
    | sum (COMPARE sum)*;

sum : product
    | sum '+' product
    | sum '-' product;

product : power
    | product '*' power
    | product '/' power;

power : atom
    | power '^' atom
    | 'exp' atom;

atom : NUMBER
    | var_name
    | NUMBER var_name
    | '-' atom
    | '+' atom
    | '(' sum ')'
    | func_call
    | '(' bool_exp ')'
    | NUMBER 'e' ('-' | '+') NUMBER
    | DOT_IDENTIFIER;  // Added DOT_IDENTIFIER to atom rule

// Function calls
func_call : var_name '(' (parameters)? ')';

// Body of model
simple_stmt : (small_stmt)? (';' | NEWLINE);
small_stmt : reaction
    | assignment
    | declaration
    | annotation
    | unit_declaration
    | unit_assignment
    | mmodel_call
    | variable_in
    | is_assignment
    | import_
    | interaction
    | rate_rule
    | sboterm
    | event;

simple_stmt_list : simple_stmt+;

// Imports
import_ : 'import' ESCAPED_STRING;

// Modular model
modular_model : 'model' ('*')? NAME '(' (init_params)? ')' simple_stmt_list END;

// Functions
function : 'function' NAME '(' (init_params)? ')' NEWLINE sum (';')? NEWLINE END;

// Parameters
parameters : (bool_exp) (',' (bool_exp))*;

// Initialization parameters
init_params : (NAME | NUMBER) (',' (NAME | NUMBER))*;

// Variable in component
variable_in : var_name in_comp;

// "is" assignments
is_assignment : NAME 'is' ESCAPED_STRING;

// Comments
COMMENT : '//' ~[\r\n]* NEWLINE -> skip;

// Identifiers and names (allow dots in names)
NAME : CNAME ('.' CNAME)*;
CNAME: ('_' | LETTER) ('_' | LETTER | DIGIT)*;
LETTER: UCASE_LETTER | LCASE_LETTER;
LCASE_LETTER: [a-z];
UCASE_LETTER: [A-Z];
DIGIT: [0-9];

// Miscellaneous
NEWLINE : [\r\n];
WS : [ \t]+ -> skip;

// Escaped strings
ESCAPED_STRING : '"' (~[\r\n\\] | '\\' .)* '"';
