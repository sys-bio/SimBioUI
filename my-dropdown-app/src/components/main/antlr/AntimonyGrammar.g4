grammar AntimonyGrammar;

// entry point for parser
root : (simple_stmt | model | function | modular_model)*;

model : NEWLINE? COMMENT? ('model' | 'module') '*'? NAME '()'? simple_stmt_list END;

// end of model
END : 'end';

var_name : ('$')? NAME;
in_comp : 'in' var_name;
namemaybein : var_name (in_comp)?;

// event
event : reaction_name? 'at' event_delay? bool_exp event_trigger_list? ':' event_assignment_list;

event_delay : bool_exp 'after';

event_trigger_list : (',' event_trigger)*;

// atom has to be changed to (NUMBER | var_name)
event_trigger : 't0' '=' BOOLEAN
    | 'priority' '=' sum
    | 'fromTrigger' '=' BOOLEAN
    | 'persistent' '=' BOOLEAN;

empty : ;
// reactions
reaction_name : namemaybein ':';
reaction : (reaction_name)? species_list ARROW (species_list)? ';' (sum)? (in_comp)?
    | (reaction_name)? (species_list)? ARROW species_list ';' (sum)? (in_comp)?;
species_list : species ('+' species)*;
species : (NUMBER)? ('$')? NAME;
ARROW : '->' 
    | '=>';

// interaction
interaction : (reaction_name)? species INTERACTION_SYMBOL namemaybein;
INTERACTION_SYMBOL : '-o' | '-|' | '-(';

// manual coding of import number from lark
NUMBER: [0-9]+ ('.' [0-9]+)? | '.' [0-9]+;

event_assignment_list : event_assignment (',' event_assignment)*;
event_assignment : var_name '=' sum;

// boolean
BOOLEAN : 'true' | 'false';

// compare
COMPARE : '>=' | '<=' | '>' | '<' | '==';

// logical
LOGICAL : '&&' | '||';

// sboterm
sboterm: var_name '.sboTerm' '=' SBOTERM;
SBOTERM: NUMBER
    | 'SBO:' NUMBER;

// assignment
assignment : namemaybein ('=' | AEQ) sum;
AEQ : ':=';

// apostrophe and rate rule
apostrophe : '\'';
rate_rule : NAME apostrophe '=' sum;

// annotation
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

// declaration
declaration : decl_modifiers decl_item (',' decl_item)*;
decl_modifiers : VAR_MODIFIER
    | TYPE_MODIFIER
    | VAR_MODIFIER TYPE_MODIFIER
    | SUB_MODIFIER TYPE_MODIFIER
    | VAR_MODIFIER SUB_MODIFIER TYPE_MODIFIER;
decl_item : namemaybein (decl_assignment)?;
decl_assignment : '=' sum;

// unit

// unit
// builtin_unit : ('liter' | 'mole' | 'second' | 'item' | 'meter' | 'liters' | 'moles' | 'seconds' | 'items' | 'meters')

unit : NAME;

unit_declaration : 'unit' var_name '=' sum;

unit_assignment : var_name 'has' sum;

// model call, reaction name?
// this should not be a reaction name, I'm just being lazy (Steve's comment from lark)
mmodel_call : (reaction_name)? NAME '(' (init_params)? ')';

// modifiers
VAR_MODIFIER: ('var' | 'const');
SUB_MODIFIER: 'substanceOnly';
TYPE_MODIFIER: ('species' | 'compartment' | 'formula');

// math
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
    | NUMBER 'e' ('-' | '+') NUMBER;

func_call : var_name '(' (parameters)? ')';

// body of model
// optimizations possible when there are multiple empty lines (Steve's comment from lark)
// example: https://docs.python.org/3/reference/grammar.html (Steve's comment from lark)
// Now note that NEWLINE is already doing that, but ';' is not (Steve's comment from lark)
simple_stmt : (small_stmt)? (';' | NEWLINE);

small_stmt : reaction 
    | assignment
    | declaration
    | annotation
    | unit_declaration
    | unit_assignment
    | mmodel_call
    // | function_call
    | variable_in
    | is_assignment
    | import_
    | interaction
    | rate_rule
    | sboterm
    | event;

simple_stmt_list : simple_stmt+;

// import
import_ : 'import' ESCAPED_STRING;

// Modular Model
modular_model : 'model' ('*')? NAME '(' (init_params)? ')' simple_stmt_list END;

// function
function : 'function' NAME '(' (init_params)? ')' NEWLINE sum (';')? NEWLINE END;

// parameters
parameters : (bool_exp) (',' (bool_exp))*;

// init params
init_params : (NAME | NUMBER) (',' (NAME | NUMBER))*;

// var in
variable_in : var_name in_comp;

// is assignment
is_assignment : NAME 'is' ESCAPED_STRING;

// comment
// fix this later for the multiline comment and #
COMMENT : '//' ~[\r\n]* NEWLINE -> skip;

// name 
NAME : ('species' | 'compartment' | 'var' | 'const' | 'formula' | 'function' | 'end' | 'model' | 'substanceOnly' | 'in')? CNAME;

// manual coding of import cname from lark
CNAME: ('_' | LETTER) ('_' | LETTER | DIGIT)*;
LETTER: UCASE_LETTER | LCASE_LETTER;
WORD: LETTER+;
LCASE_LETTER: [a-z];
UCASE_LETTER: [A-Z];
DIGIT: [0-9];

// etc
NEWLINE : [\r\n] ;
WS : [ \t]+ -> skip;

// Lexer rules for STRING_INNER and STRING_ESC_INNER
// STRING_INNER : ~'\''*; // Matches any character except single quotes
// STRING_ESC_INNER : STRING_INNER ~('\\' STRING_INNER)*; // Matches STRING_INNER not preceded by a backslash

// // Lexer rule for ESCAPED_STRING
// ESCAPED_STRING : '\'' STRING_ESC_INNER '\''; // Matches a single-quoted string with escaped characters

// STRING_INNER : .+?;
// STRING_ESC_INNER : STRING_INNER ( ~('\\') | '\\' '\\')*?;

// ESCAPED_STRING : '"' STRING_ESC_INNER '"';

ESCAPED_STRING : '"' (~[\r\n\\] | '\\' .)* '"';