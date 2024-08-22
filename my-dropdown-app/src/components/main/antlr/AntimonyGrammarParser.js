// Generated from src/language-handler/antlr/AntimonyGrammar.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from "antlr4ts/atn/ATN"
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer"
import { FailedPredicateException } from "antlr4ts/FailedPredicateException"
import { NoViableAltException } from "antlr4ts/NoViableAltException"
import { Parser } from "antlr4ts/Parser"
import { ParserRuleContext } from "antlr4ts/ParserRuleContext"
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator"
import { RecognitionException } from "antlr4ts/RecognitionException"
import { Token } from "antlr4ts/Token"
import { VocabularyImpl } from "antlr4ts/VocabularyImpl"

import * as Utils from "antlr4ts/misc/Utils"

export class AntimonyGrammarParser extends Parser {
  static T__0 = 1
  static T__1 = 2
  static T__2 = 3
  static T__3 = 4
  static T__4 = 5
  static T__5 = 6
  static T__6 = 7
  static T__7 = 8
  static T__8 = 9
  static T__9 = 10
  static T__10 = 11
  static T__11 = 12
  static T__12 = 13
  static T__13 = 14
  static T__14 = 15
  static T__15 = 16
  static T__16 = 17
  static T__17 = 18
  static T__18 = 19
  static T__19 = 20
  static T__20 = 21
  static T__21 = 22
  static T__22 = 23
  static T__23 = 24
  static T__24 = 25
  static T__25 = 26
  static T__26 = 27
  static T__27 = 28
  static T__28 = 29
  static T__29 = 30
  static T__30 = 31
  static END = 32
  static ARROW = 33
  static INTERACTION_SYMBOL = 34
  static NUMBER = 35
  static BOOLEAN = 36
  static COMPARE = 37
  static LOGICAL = 38
  static SBOTERM = 39
  static AEQ = 40
  static ANNOT_KEYWORD = 41
  static VAR_MODIFIER = 42
  static SUB_MODIFIER = 43
  static TYPE_MODIFIER = 44
  static COMMENT = 45
  static NAME = 46
  static CNAME = 47
  static LETTER = 48
  static WORD = 49
  static LCASE_LETTER = 50
  static UCASE_LETTER = 51
  static DIGIT = 52
  static NEWLINE = 53
  static WS = 54
  static ESCAPED_STRING = 55
  static RULE_root = 0
  static RULE_model = 1
  static RULE_var_name = 2
  static RULE_in_comp = 3
  static RULE_namemaybein = 4
  static RULE_event = 5
  static RULE_event_delay = 6
  static RULE_event_trigger_list = 7
  static RULE_event_trigger = 8
  static RULE_empty = 9
  static RULE_reaction_name = 10
  static RULE_reaction = 11
  static RULE_species_list = 12
  static RULE_species = 13
  static RULE_interaction = 14
  static RULE_event_assignment_list = 15
  static RULE_event_assignment = 16
  static RULE_sboterm = 17
  static RULE_assignment = 18
  static RULE_apostrophe = 19
  static RULE_rate_rule = 20
  static RULE_annotation = 21
  static RULE_annot_list = 22
  static RULE_new_annot = 23
  static RULE_declaration = 24
  static RULE_decl_modifiers = 25
  static RULE_decl_item = 26
  static RULE_decl_assignment = 27
  static RULE_unit = 28
  static RULE_unit_declaration = 29
  static RULE_unit_assignment = 30
  static RULE_mmodel_call = 31
  static RULE_bool_exp = 32
  static RULE_expressions = 33
  static RULE_sum = 34
  static RULE_product = 35
  static RULE_power = 36
  static RULE_atom = 37
  static RULE_func_call = 38
  static RULE_simple_stmt = 39
  static RULE_small_stmt = 40
  static RULE_simple_stmt_list = 41
  static RULE_import_ = 42
  static RULE_modular_model = 43
  static RULE_function = 44
  static RULE_parameters = 45
  static RULE_init_params = 46
  static RULE_variable_in = 47
  static RULE_is_assignment = 48
  // tslint:disable:no-trailing-whitespace
  static ruleNames = [
    "root",
    "model",
    "var_name",
    "in_comp",
    "namemaybein",
    "event",
    "event_delay",
    "event_trigger_list",
    "event_trigger",
    "empty",
    "reaction_name",
    "reaction",
    "species_list",
    "species",
    "interaction",
    "event_assignment_list",
    "event_assignment",
    "sboterm",
    "assignment",
    "apostrophe",
    "rate_rule",
    "annotation",
    "annot_list",
    "new_annot",
    "declaration",
    "decl_modifiers",
    "decl_item",
    "decl_assignment",
    "unit",
    "unit_declaration",
    "unit_assignment",
    "mmodel_call",
    "bool_exp",
    "expressions",
    "sum",
    "product",
    "power",
    "atom",
    "func_call",
    "simple_stmt",
    "small_stmt",
    "simple_stmt_list",
    "import_",
    "modular_model",
    "function",
    "parameters",
    "init_params",
    "variable_in",
    "is_assignment"
  ]

  static _LITERAL_NAMES = [
    undefined,
    "'model'",
    "'module'",
    "'*'",
    "'()'",
    "'$'",
    "'in'",
    "'at'",
    "':'",
    "'after'",
    "','",
    "'t0'",
    "'='",
    "'priority'",
    "'fromTrigger'",
    "'persistent'",
    "';'",
    "'+'",
    "'.sboTerm'",
    "'''",
    "'unit'",
    "'has'",
    "'('",
    "')'",
    "'-'",
    "'/'",
    "'^'",
    "'exp'",
    "'e'",
    "'import'",
    "'function'",
    "'is'",
    "'end'",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "':='",
    undefined,
    undefined,
    "'substanceOnly'"
  ]
  static _SYMBOLIC_NAMES = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "END",
    "ARROW",
    "INTERACTION_SYMBOL",
    "NUMBER",
    "BOOLEAN",
    "COMPARE",
    "LOGICAL",
    "SBOTERM",
    "AEQ",
    "ANNOT_KEYWORD",
    "VAR_MODIFIER",
    "SUB_MODIFIER",
    "TYPE_MODIFIER",
    "COMMENT",
    "NAME",
    "CNAME",
    "LETTER",
    "WORD",
    "LCASE_LETTER",
    "UCASE_LETTER",
    "DIGIT",
    "NEWLINE",
    "WS",
    "ESCAPED_STRING"
  ]
  static VOCABULARY = new VocabularyImpl(
    AntimonyGrammarParser._LITERAL_NAMES,
    AntimonyGrammarParser._SYMBOLIC_NAMES,
    []
  )

  // @Override
  // @NotNull
  get vocabulary() {
    return AntimonyGrammarParser.VOCABULARY
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  get grammarFileName() {
    return "AntimonyGrammar.g4"
  }

  // @Override
  get ruleNames() {
    return AntimonyGrammarParser.ruleNames
  }

  // @Override
  get serializedATN() {
    return AntimonyGrammarParser._serializedATN
  }

  createFailedPredicateException(predicate, message) {
    return new FailedPredicateException(this, predicate, message)
  }

  constructor(input) {
    super(input)
    this._interp = new ParserATNSimulator(AntimonyGrammarParser._ATN, this)
  }
  // @RuleVersion(0)
root() {
    let _localctx = new RootContext(this._ctx, this.state);
    this.enterRule(_localctx, 0, AntimonyGrammarParser.RULE_root);
    let _la;
    try {
        this.enterOuterAlt(_localctx, 1);
        {
            this.state = 104;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (
                ((_la & ~0x1f) === 0 &&
                    ((1 << _la) &
                        ((1 << AntimonyGrammarParser.T__0) |
                        (1 << AntimonyGrammarParser.T__1) |
                        (1 << AntimonyGrammarParser.T__4) |
                        (1 << AntimonyGrammarParser.T__6) |
                        (1 << AntimonyGrammarParser.T__15) |
                        (1 << AntimonyGrammarParser.T__19) |
                        (1 << AntimonyGrammarParser.T__28) |
                        (1 << AntimonyGrammarParser.T__29) |
                        (1 << AntimonyGrammarParser.DOT_IDENTIFIER) | // Added here
                        (1 << AntimonyGrammarParser.BACKTICK))) !== 0) ||
                (((_la - 33) & ~0x1f) === 0 &&
                    ((1 << (_la - 33)) &
                        ((1 << (AntimonyGrammarParser.ARROW - 33)) |
                        (1 << (AntimonyGrammarParser.NUMBER - 33)) |
                        (1 << (AntimonyGrammarParser.VAR_MODIFIER - 33)) |
                        (1 << (AntimonyGrammarParser.SUB_MODIFIER - 33)) |
                        (1 << (AntimonyGrammarParser.TYPE_MODIFIER - 33)) |
                        (1 << (AntimonyGrammarParser.COMMENT - 33)) |
                        (1 << (AntimonyGrammarParser.NAME - 33)) |
                        (1 << (AntimonyGrammarParser.NEWLINE - 33)))) !== 0)
            ) {
                {
                    this.state = 102;
                    this._errHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                        case 1:
                            {
                                this.state = 98;
                                this.simple_stmt();
                            }
                            break;

                        case 2:
                            {
                                this.state = 99;
                                this.model();
                            }
                            break;

                        case 3:
                            {
                                this.state = 100;
                                this.function();
                            }
                            break;

                        case 4:
                            {
                                this.state = 101;
                                this.modular_model();
                            }
                            break;
                    }
                }
                this.state = 106;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
        }
    } catch (re) {
        if (re instanceof RecognitionException) {
            _localctx.exception = re;
            this._errHandler.reportError(this, re);
            this._errHandler.recover(this, re);
        } else {
            throw re;
        }
    } finally {
        this.exitRule();
    }
    return _localctx;
}
  // @RuleVersion(0)
  model() {
    let _localctx = new ModelContext(this._ctx, this.state)
    this.enterRule(_localctx, 2, AntimonyGrammarParser.RULE_model)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 108
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.NEWLINE) {
          {
            this.state = 107
            this.match(AntimonyGrammarParser.NEWLINE)
          }
        }

        this.state = 111
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.COMMENT) {
          {
            this.state = 110
            this.match(AntimonyGrammarParser.COMMENT)
          }
        }

        this.state = 113
        _la = this._input.LA(1)
        if (
          !(
            _la === AntimonyGrammarParser.T__0 ||
            _la === AntimonyGrammarParser.T__1
          )
        ) {
          this._errHandler.recoverInline(this)
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true
          }

          this._errHandler.reportMatch(this)
          this.consume()
        }
        this.state = 115
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__2) {
          {
            this.state = 114
            this.match(AntimonyGrammarParser.T__2)
          }
        }

        this.state = 117
        this.match(AntimonyGrammarParser.NAME)
        this.state = 119
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__3) {
          {
            this.state = 118
            this.match(AntimonyGrammarParser.T__3)
          }
        }

        this.state = 121
        this.simple_stmt_list()
        this.state = 122
        this.match(AntimonyGrammarParser.END)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  var_name() {
    let _localctx = new Var_nameContext(this._ctx, this.state)
    this.enterRule(_localctx, 4, AntimonyGrammarParser.RULE_var_name)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 125
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__4) {
          {
            this.state = 124
            this.match(AntimonyGrammarParser.T__4)
          }
        }

        this.state = 127
        this.match(AntimonyGrammarParser.NAME)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  in_comp() {
    let _localctx = new In_compContext(this._ctx, this.state)
    this.enterRule(_localctx, 6, AntimonyGrammarParser.RULE_in_comp)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 129
        this.match(AntimonyGrammarParser.T__5)
        this.state = 130
        this.var_name()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  namemaybein() {
    let _localctx = new NamemaybeinContext(this._ctx, this.state)
    this.enterRule(_localctx, 8, AntimonyGrammarParser.RULE_namemaybein)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 132
        this.var_name()
        this.state = 134
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__5) {
          {
            this.state = 133
            this.in_comp()
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event() {
    let _localctx = new EventContext(this._ctx, this.state)
    this.enterRule(_localctx, 10, AntimonyGrammarParser.RULE_event)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 137
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          _la === AntimonyGrammarParser.T__4 ||
          _la === AntimonyGrammarParser.NAME
        ) {
          {
            this.state = 136
            this.reaction_name()
          }
        }

        this.state = 139
        this.match(AntimonyGrammarParser.T__6)
        this.state = 141
        this._errHandler.sync(this)
        switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
          case 1:
            {
              this.state = 140
              this.event_delay()
            }
            break
        }
        this.state = 143
        this.bool_exp()
        this.state = 145
        this._errHandler.sync(this)
        switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
          case 1:
            {
              this.state = 144
              this.event_trigger_list()
            }
            break
        }
        this.state = 147
        this.match(AntimonyGrammarParser.T__7)
        this.state = 148
        this.event_assignment_list()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event_delay() {
    let _localctx = new Event_delayContext(this._ctx, this.state)
    this.enterRule(_localctx, 12, AntimonyGrammarParser.RULE_event_delay)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 150
        this.bool_exp()
        this.state = 151
        this.match(AntimonyGrammarParser.T__8)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event_trigger_list() {
    let _localctx = new Event_trigger_listContext(this._ctx, this.state)
    this.enterRule(_localctx, 14, AntimonyGrammarParser.RULE_event_trigger_list)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 157
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__9) {
          {
            {
              this.state = 153
              this.match(AntimonyGrammarParser.T__9)
              this.state = 154
              this.event_trigger()
            }
          }
          this.state = 159
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event_trigger() {
    let _localctx = new Event_triggerContext(this._ctx, this.state)
    this.enterRule(_localctx, 16, AntimonyGrammarParser.RULE_event_trigger)
    try {
      this.state = 172
      this._errHandler.sync(this)
      switch (this._input.LA(1)) {
        case AntimonyGrammarParser.T__10:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 160
            this.match(AntimonyGrammarParser.T__10)
            this.state = 161
            this.match(AntimonyGrammarParser.T__11)
            this.state = 162
            this.match(AntimonyGrammarParser.BOOLEAN)
          }
          break
        case AntimonyGrammarParser.T__12:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 163
            this.match(AntimonyGrammarParser.T__12)
            this.state = 164
            this.match(AntimonyGrammarParser.T__11)
            this.state = 165
            this.sum(0)
          }
          break
        case AntimonyGrammarParser.T__13:
          this.enterOuterAlt(_localctx, 3)
          {
            this.state = 166
            this.match(AntimonyGrammarParser.T__13)
            this.state = 167
            this.match(AntimonyGrammarParser.T__11)
            this.state = 168
            this.match(AntimonyGrammarParser.BOOLEAN)
          }
          break
        case AntimonyGrammarParser.T__14:
          this.enterOuterAlt(_localctx, 4)
          {
            this.state = 169
            this.match(AntimonyGrammarParser.T__14)
            this.state = 170
            this.match(AntimonyGrammarParser.T__11)
            this.state = 171
            this.match(AntimonyGrammarParser.BOOLEAN)
          }
          break
        default:
          throw new NoViableAltException(this)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  empty() {
    let _localctx = new EmptyContext(this._ctx, this.state)
    this.enterRule(_localctx, 18, AntimonyGrammarParser.RULE_empty)
    try {
      this.enterOuterAlt(_localctx, 1)
      // tslint:disable-next-line:no-empty
      {
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  reaction_name() {
    let _localctx = new Reaction_nameContext(this._ctx, this.state)
    this.enterRule(_localctx, 20, AntimonyGrammarParser.RULE_reaction_name)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 176
        this.namemaybein()
        this.state = 177
        this.match(AntimonyGrammarParser.T__7)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  reaction() {
    let _localctx = new ReactionContext(this._ctx, this.state)
    this.enterRule(_localctx, 22, AntimonyGrammarParser.RULE_reaction)
    let _la
    try {
      this.state = 209
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 180
            this._errHandler.sync(this)
            switch (
              this.interpreter.adaptivePredict(this._input, 13, this._ctx)
            ) {
              case 1:
                {
                  this.state = 179
                  this.reaction_name()
                }
                break
            }
            this.state = 182
            this.species_list()
            this.state = 183
            this.match(AntimonyGrammarParser.ARROW)
            this.state = 185
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (
              _la === AntimonyGrammarParser.T__4 ||
              _la === AntimonyGrammarParser.NUMBER ||
              _la === AntimonyGrammarParser.NAME
            ) {
              {
                this.state = 184
                this.species_list()
              }
            }

            this.state = 187
            this.match(AntimonyGrammarParser.T__15)
            this.state = 189
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (
              ((_la & ~0x1f) === 0 &&
                ((1 << _la) &
                  ((1 << AntimonyGrammarParser.T__4) |
                    (1 << AntimonyGrammarParser.T__16) |
                    (1 << AntimonyGrammarParser.T__21) |
                    (1 << AntimonyGrammarParser.T__23) |
                    (1 << AntimonyGrammarParser.T__26))) !==
                  0) ||
              _la === AntimonyGrammarParser.NUMBER ||
              _la === AntimonyGrammarParser.NAME
            ) {
              {
                this.state = 188
                this.sum(0)
              }
            }

            this.state = 192
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (_la === AntimonyGrammarParser.T__5) {
              {
                this.state = 191
                this.in_comp()
              }
            }
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 195
            this._errHandler.sync(this)
            switch (
              this.interpreter.adaptivePredict(this._input, 17, this._ctx)
            ) {
              case 1:
                {
                  this.state = 194
                  this.reaction_name()
                }
                break
            }
            this.state = 198
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (
              _la === AntimonyGrammarParser.T__4 ||
              _la === AntimonyGrammarParser.NUMBER ||
              _la === AntimonyGrammarParser.NAME
            ) {
              {
                this.state = 197
                this.species_list()
              }
            }

            this.state = 200
            this.match(AntimonyGrammarParser.ARROW)
            this.state = 201
            this.species_list()
            this.state = 202
            this.match(AntimonyGrammarParser.T__15)
            this.state = 204
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (
              ((_la & ~0x1f) === 0 &&
                ((1 << _la) &
                  ((1 << AntimonyGrammarParser.T__4) |
                    (1 << AntimonyGrammarParser.T__16) |
                    (1 << AntimonyGrammarParser.T__21) |
                    (1 << AntimonyGrammarParser.T__23) |
                    (1 << AntimonyGrammarParser.T__26))) !==
                  0) ||
              _la === AntimonyGrammarParser.NUMBER ||
              _la === AntimonyGrammarParser.NAME
            ) {
              {
                this.state = 203
                this.sum(0)
              }
            }

            this.state = 207
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            if (_la === AntimonyGrammarParser.T__5) {
              {
                this.state = 206
                this.in_comp()
              }
            }
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  species_list() {
    let _localctx = new Species_listContext(this._ctx, this.state)
    this.enterRule(_localctx, 24, AntimonyGrammarParser.RULE_species_list)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 211
        this.species()
        this.state = 216
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__16) {
          {
            {
              this.state = 212
              this.match(AntimonyGrammarParser.T__16)
              this.state = 213
              this.species()
            }
          }
          this.state = 218
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  species() {
    let _localctx = new SpeciesContext(this._ctx, this.state)
    this.enterRule(_localctx, 26, AntimonyGrammarParser.RULE_species)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 220
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.NUMBER) {
          {
            this.state = 219
            this.match(AntimonyGrammarParser.NUMBER)
          }
        }

        this.state = 223
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__4) {
          {
            this.state = 222
            this.match(AntimonyGrammarParser.T__4)
          }
        }

        this.state = 225
        this.match(AntimonyGrammarParser.NAME)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  interaction() {
    let _localctx = new InteractionContext(this._ctx, this.state)
    this.enterRule(_localctx, 28, AntimonyGrammarParser.RULE_interaction)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 228
        this._errHandler.sync(this)
        switch (this.interpreter.adaptivePredict(this._input, 25, this._ctx)) {
          case 1:
            {
              this.state = 227
              this.reaction_name()
            }
            break
        }
        this.state = 230
        this.species()
        this.state = 231
        this.match(AntimonyGrammarParser.INTERACTION_SYMBOL)
        this.state = 232
        this.namemaybein()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event_assignment_list() {
    let _localctx = new Event_assignment_listContext(this._ctx, this.state)
    this.enterRule(
      _localctx,
      30,
      AntimonyGrammarParser.RULE_event_assignment_list
    )
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 234
        this.event_assignment()
        this.state = 239
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__9) {
          {
            {
              this.state = 235
              this.match(AntimonyGrammarParser.T__9)
              this.state = 236
              this.event_assignment()
            }
          }
          this.state = 241
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  event_assignment() {
    let _localctx = new Event_assignmentContext(this._ctx, this.state)
    this.enterRule(_localctx, 32, AntimonyGrammarParser.RULE_event_assignment)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 242
        this.var_name()
        this.state = 243
        this.match(AntimonyGrammarParser.T__11)
        this.state = 244
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  sboterm() {
    let _localctx = new SbotermContext(this._ctx, this.state)
    this.enterRule(_localctx, 34, AntimonyGrammarParser.RULE_sboterm)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 246
        this.var_name()
        this.state = 247
        this.match(AntimonyGrammarParser.T__17)
        this.state = 248
        this.match(AntimonyGrammarParser.T__11)
        this.state = 249
        this.match(AntimonyGrammarParser.SBOTERM)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  assignment() {
    let _localctx = new AssignmentContext(this._ctx, this.state)
    this.enterRule(_localctx, 36, AntimonyGrammarParser.RULE_assignment)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 251
        this.namemaybein()
        this.state = 252
        _la = this._input.LA(1)
        if (
          !(
            _la === AntimonyGrammarParser.T__11 ||
            _la === AntimonyGrammarParser.AEQ
          )
        ) {
          this._errHandler.recoverInline(this)
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true
          }

          this._errHandler.reportMatch(this)
          this.consume()
        }
        this.state = 253
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  apostrophe() {
    let _localctx = new ApostropheContext(this._ctx, this.state)
    this.enterRule(_localctx, 38, AntimonyGrammarParser.RULE_apostrophe)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 255
        this.match(AntimonyGrammarParser.T__18)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  rate_rule() {
    let _localctx = new Rate_ruleContext(this._ctx, this.state)
    this.enterRule(_localctx, 40, AntimonyGrammarParser.RULE_rate_rule)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 257
        this.match(AntimonyGrammarParser.NAME)
        this.state = 258
        this.apostrophe()
        this.state = 259
        this.match(AntimonyGrammarParser.T__11)
        this.state = 260
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  annotation() {
    let _localctx = new AnnotationContext(this._ctx, this.state)
    this.enterRule(_localctx, 42, AntimonyGrammarParser.RULE_annotation)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 262
        this.var_name()
        this.state = 263
        this.match(AntimonyGrammarParser.ANNOT_KEYWORD)
        this.state = 264
        this.match(AntimonyGrammarParser.ESCAPED_STRING)
        this.state = 266
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__9) {
          {
            this.state = 265
            this.annot_list()
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  annot_list() {
    let _localctx = new Annot_listContext(this._ctx, this.state)
    this.enterRule(_localctx, 44, AntimonyGrammarParser.RULE_annot_list)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 269
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        do {
          {
            {
              this.state = 268
              this.new_annot()
            }
          }
          this.state = 271
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        } while (_la === AntimonyGrammarParser.T__9)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  new_annot() {
    let _localctx = new New_annotContext(this._ctx, this.state)
    this.enterRule(_localctx, 46, AntimonyGrammarParser.RULE_new_annot)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 273
        this.match(AntimonyGrammarParser.T__9)
        this.state = 274
        this.match(AntimonyGrammarParser.NEWLINE)
        this.state = 275
        this.match(AntimonyGrammarParser.ESCAPED_STRING)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  declaration() {
    let _localctx = new DeclarationContext(this._ctx, this.state)
    this.enterRule(_localctx, 48, AntimonyGrammarParser.RULE_declaration)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 277
        this.decl_modifiers()
        this.state = 278
        this.decl_item()
        this.state = 283
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__9) {
          {
            {
              this.state = 279
              this.match(AntimonyGrammarParser.T__9)
              this.state = 280
              this.decl_item()
            }
          }
          this.state = 285
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  decl_modifiers() {
    let _localctx = new Decl_modifiersContext(this._ctx, this.state)
    this.enterRule(_localctx, 50, AntimonyGrammarParser.RULE_decl_modifiers)
    try {
      this.state = 295
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 30, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 286
            this.match(AntimonyGrammarParser.VAR_MODIFIER)
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 287
            this.match(AntimonyGrammarParser.TYPE_MODIFIER)
          }
          break

        case 3:
          this.enterOuterAlt(_localctx, 3)
          {
            this.state = 288
            this.match(AntimonyGrammarParser.VAR_MODIFIER)
            this.state = 289
            this.match(AntimonyGrammarParser.TYPE_MODIFIER)
          }
          break

        case 4:
          this.enterOuterAlt(_localctx, 4)
          {
            this.state = 290
            this.match(AntimonyGrammarParser.SUB_MODIFIER)
            this.state = 291
            this.match(AntimonyGrammarParser.TYPE_MODIFIER)
          }
          break

        case 5:
          this.enterOuterAlt(_localctx, 5)
          {
            this.state = 292
            this.match(AntimonyGrammarParser.VAR_MODIFIER)
            this.state = 293
            this.match(AntimonyGrammarParser.SUB_MODIFIER)
            this.state = 294
            this.match(AntimonyGrammarParser.TYPE_MODIFIER)
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  decl_item() {
    let _localctx = new Decl_itemContext(this._ctx, this.state)
    this.enterRule(_localctx, 52, AntimonyGrammarParser.RULE_decl_item)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 297
        this.namemaybein()
        this.state = 299
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__11) {
          {
            this.state = 298
            this.decl_assignment()
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  decl_assignment() {
    let _localctx = new Decl_assignmentContext(this._ctx, this.state)
    this.enterRule(_localctx, 54, AntimonyGrammarParser.RULE_decl_assignment)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 301
        this.match(AntimonyGrammarParser.T__11)
        this.state = 302
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  unit() {
    let _localctx = new UnitContext(this._ctx, this.state)
    this.enterRule(_localctx, 56, AntimonyGrammarParser.RULE_unit)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 304
        this.match(AntimonyGrammarParser.NAME)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  unit_declaration() {
    let _localctx = new Unit_declarationContext(this._ctx, this.state)
    this.enterRule(_localctx, 58, AntimonyGrammarParser.RULE_unit_declaration)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 306
        this.match(AntimonyGrammarParser.T__19)
        this.state = 307
        this.var_name()
        this.state = 308
        this.match(AntimonyGrammarParser.T__11)
        this.state = 309
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  unit_assignment() {
    let _localctx = new Unit_assignmentContext(this._ctx, this.state)
    this.enterRule(_localctx, 60, AntimonyGrammarParser.RULE_unit_assignment)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 311
        this.var_name()
        this.state = 312
        this.match(AntimonyGrammarParser.T__20)
        this.state = 313
        this.sum(0)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  mmodel_call() {
    let _localctx = new Mmodel_callContext(this._ctx, this.state)
    this.enterRule(_localctx, 62, AntimonyGrammarParser.RULE_mmodel_call)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 316
        this._errHandler.sync(this)
        switch (this.interpreter.adaptivePredict(this._input, 32, this._ctx)) {
          case 1:
            {
              this.state = 315
              this.reaction_name()
            }
            break
        }
        this.state = 318
        this.match(AntimonyGrammarParser.NAME)
        this.state = 319
        this.match(AntimonyGrammarParser.T__21)
        this.state = 321
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          _la === AntimonyGrammarParser.NUMBER ||
          _la === AntimonyGrammarParser.NAME
        ) {
          {
            this.state = 320
            this.init_params()
          }
        }

        this.state = 323
        this.match(AntimonyGrammarParser.T__22)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  bool_exp() {
    let _localctx = new Bool_expContext(this._ctx, this.state)
    this.enterRule(_localctx, 64, AntimonyGrammarParser.RULE_bool_exp)
    let _la
    try {
      this.state = 334
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 35, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 325
            this.expressions()
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 326
            this.expressions()
            this.state = 331
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            while (_la === AntimonyGrammarParser.LOGICAL) {
              {
                {
                  this.state = 327
                  this.match(AntimonyGrammarParser.LOGICAL)
                  this.state = 328
                  this.expressions()
                }
              }
              this.state = 333
              this._errHandler.sync(this)
              _la = this._input.LA(1)
            }
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  expressions() {
    let _localctx = new ExpressionsContext(this._ctx, this.state)
    this.enterRule(_localctx, 66, AntimonyGrammarParser.RULE_expressions)
    let _la
    try {
      this.state = 345
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 37, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 336
            this.sum(0)
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 337
            this.sum(0)
            this.state = 342
            this._errHandler.sync(this)
            _la = this._input.LA(1)
            while (_la === AntimonyGrammarParser.COMPARE) {
              {
                {
                  this.state = 338
                  this.match(AntimonyGrammarParser.COMPARE)
                  this.state = 339
                  this.sum(0)
                }
              }
              this.state = 344
              this._errHandler.sync(this)
              _la = this._input.LA(1)
            }
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }

  // @RuleVersion(0)
  sum(_p) {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx = this._ctx
    let _parentState = this.state
    let _localctx = new SumContext(this._ctx, _parentState)
    let _prevctx = _localctx
    let _startState = 68
    this.enterRecursionRule(_localctx, 68, AntimonyGrammarParser.RULE_sum, _p)
    try {
      let _alt
      this.enterOuterAlt(_localctx, 1)
      {
        {
          this.state = 348
          this.product(0)
        }
        this._ctx._stop = this._input.tryLT(-1)
        this.state = 358
        this._errHandler.sync(this)
        _alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = _localctx
            {
              this.state = 356
              this._errHandler.sync(this)
              switch (
                this.interpreter.adaptivePredict(this._input, 38, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new SumContext(_parentctx, _parentState)
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      AntimonyGrammarParser.RULE_sum
                    )
                    this.state = 350
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 2)"
                      )
                    }
                    this.state = 351
                    this.match(AntimonyGrammarParser.T__16)
                    this.state = 352
                    this.product(0)
                  }
                  break

                case 2:
                  {
                    _localctx = new SumContext(_parentctx, _parentState)
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      AntimonyGrammarParser.RULE_sum
                    )
                    this.state = 353
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 1)"
                      )
                    }
                    this.state = 354
                    this.match(AntimonyGrammarParser.T__23)
                    this.state = 355
                    this.product(0)
                  }
                  break
              }
            }
          }
          this.state = 360
          this._errHandler.sync(this)
          _alt = this.interpreter.adaptivePredict(this._input, 39, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return _localctx
  }

  // @RuleVersion(0)
  product(_p) {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx = this._ctx
    let _parentState = this.state
    let _localctx = new ProductContext(this._ctx, _parentState)
    let _prevctx = _localctx
    let _startState = 70
    this.enterRecursionRule(
      _localctx,
      70,
      AntimonyGrammarParser.RULE_product,
      _p
    )
    try {
      let _alt
      this.enterOuterAlt(_localctx, 1)
      {
        {
          this.state = 362
          this.power(0)
        }
        this._ctx._stop = this._input.tryLT(-1)
        this.state = 372
        this._errHandler.sync(this)
        _alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = _localctx
            {
              this.state = 370
              this._errHandler.sync(this)
              switch (
                this.interpreter.adaptivePredict(this._input, 40, this._ctx)
              ) {
                case 1:
                  {
                    _localctx = new ProductContext(_parentctx, _parentState)
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      AntimonyGrammarParser.RULE_product
                    )
                    this.state = 364
                    if (!this.precpred(this._ctx, 2)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 2)"
                      )
                    }
                    this.state = 365
                    this.match(AntimonyGrammarParser.T__2)
                    this.state = 366
                    this.power(0)
                  }
                  break

                case 2:
                  {
                    _localctx = new ProductContext(_parentctx, _parentState)
                    this.pushNewRecursionContext(
                      _localctx,
                      _startState,
                      AntimonyGrammarParser.RULE_product
                    )
                    this.state = 367
                    if (!this.precpred(this._ctx, 1)) {
                      throw this.createFailedPredicateException(
                        "this.precpred(this._ctx, 1)"
                      )
                    }
                    this.state = 368
                    this.match(AntimonyGrammarParser.T__24)
                    this.state = 369
                    this.power(0)
                  }
                  break
              }
            }
          }
          this.state = 374
          this._errHandler.sync(this)
          _alt = this.interpreter.adaptivePredict(this._input, 41, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return _localctx
  }

  // @RuleVersion(0)
  power(_p) {
    if (_p === undefined) {
      _p = 0
    }

    let _parentctx = this._ctx
    let _parentState = this.state
    let _localctx = new PowerContext(this._ctx, _parentState)
    let _prevctx = _localctx
    let _startState = 72
    this.enterRecursionRule(_localctx, 72, AntimonyGrammarParser.RULE_power, _p)
    try {
      let _alt
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 379
        this._errHandler.sync(this)
        switch (this._input.LA(1)) {
          case AntimonyGrammarParser.T__4:
          case AntimonyGrammarParser.T__16:
          case AntimonyGrammarParser.T__21:
          case AntimonyGrammarParser.T__23:
          case AntimonyGrammarParser.NUMBER:
          case AntimonyGrammarParser.NAME:
            {
              this.state = 376
              this.atom()
            }
            break
          case AntimonyGrammarParser.T__26:
            {
              this.state = 377
              this.match(AntimonyGrammarParser.T__26)
              this.state = 378
              this.atom()
            }
            break
          default:
            throw new NoViableAltException(this)
        }
        this._ctx._stop = this._input.tryLT(-1)
        this.state = 386
        this._errHandler.sync(this)
        _alt = this.interpreter.adaptivePredict(this._input, 43, this._ctx)
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent()
            }
            _prevctx = _localctx
            {
              {
                _localctx = new PowerContext(_parentctx, _parentState)
                this.pushNewRecursionContext(
                  _localctx,
                  _startState,
                  AntimonyGrammarParser.RULE_power
                )
                this.state = 381
                if (!this.precpred(this._ctx, 2)) {
                  throw this.createFailedPredicateException(
                    "this.precpred(this._ctx, 2)"
                  )
                }
                this.state = 382
                this.match(AntimonyGrammarParser.T__25)
                this.state = 383
                this.atom()
              }
            }
          }
          this.state = 388
          this._errHandler.sync(this)
          _alt = this.interpreter.adaptivePredict(this._input, 43, this._ctx)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.unrollRecursionContexts(_parentctx)
    }
    return _localctx
  }
  // @RuleVersion(0)
  atom() {
    let _localctx = new AtomContext(this._ctx, this.state)
    this.enterRule(_localctx, 74, AntimonyGrammarParser.RULE_atom)
    let _la
    try {
      this.state = 410
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 44, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 389
            this.match(AntimonyGrammarParser.NUMBER)
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 390
            this.var_name()
          }
          break

        case 3:
          this.enterOuterAlt(_localctx, 3)
          {
            this.state = 391
            this.match(AntimonyGrammarParser.NUMBER)
            this.state = 392
            this.var_name()
          }
          break

        case 4:
          this.enterOuterAlt(_localctx, 4)
          {
            this.state = 393
            this.match(AntimonyGrammarParser.T__23)
            this.state = 394
            this.atom()
          }
          break

        case 5:
          this.enterOuterAlt(_localctx, 5)
          {
            this.state = 395
            this.match(AntimonyGrammarParser.T__16)
            this.state = 396
            this.atom()
          }
          break

        case 6:
          this.enterOuterAlt(_localctx, 6)
          {
            this.state = 397
            this.match(AntimonyGrammarParser.T__21)
            this.state = 398
            this.sum(0)
            this.state = 399
            this.match(AntimonyGrammarParser.T__22)
          }
          break

        case 7:
          this.enterOuterAlt(_localctx, 7)
          {
            this.state = 401
            this.func_call()
          }
          break

        case 8:
          this.enterOuterAlt(_localctx, 8)
          {
            this.state = 402
            this.match(AntimonyGrammarParser.T__21)
            this.state = 403
            this.bool_exp()
            this.state = 404
            this.match(AntimonyGrammarParser.T__22)
          }
          break

        case 9:
          this.enterOuterAlt(_localctx, 9)
          {
            this.state = 406
            this.match(AntimonyGrammarParser.NUMBER)
            this.state = 407
            this.match(AntimonyGrammarParser.T__27)
            this.state = 408
            _la = this._input.LA(1)
            if (
              !(
                _la === AntimonyGrammarParser.T__16 ||
                _la === AntimonyGrammarParser.T__23
              )
            ) {
              this._errHandler.recoverInline(this)
            } else {
              if (this._input.LA(1) === Token.EOF) {
                this.matchedEOF = true
              }

              this._errHandler.reportMatch(this)
              this.consume()
            }
            this.state = 409
            this.match(AntimonyGrammarParser.NUMBER)
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  func_call() {
    let _localctx = new Func_callContext(this._ctx, this.state)
    this.enterRule(_localctx, 76, AntimonyGrammarParser.RULE_func_call)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 412
        this.var_name()
        this.state = 413
        this.match(AntimonyGrammarParser.T__21)
        this.state = 415
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << AntimonyGrammarParser.T__4) |
                (1 << AntimonyGrammarParser.T__16) |
                (1 << AntimonyGrammarParser.T__21) |
                (1 << AntimonyGrammarParser.T__23) |
                (1 << AntimonyGrammarParser.T__26))) !==
              0) ||
          _la === AntimonyGrammarParser.NUMBER ||
          _la === AntimonyGrammarParser.NAME
        ) {
          {
            this.state = 414
            this.parameters()
          }
        }

        this.state = 417
        this.match(AntimonyGrammarParser.T__22)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  simple_stmt() {
    let _localctx = new Simple_stmtContext(this._ctx, this.state)
    this.enterRule(_localctx, 78, AntimonyGrammarParser.RULE_simple_stmt)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 420
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << AntimonyGrammarParser.T__4) |
                (1 << AntimonyGrammarParser.T__6) |
                (1 << AntimonyGrammarParser.T__19) |
                (1 << AntimonyGrammarParser.T__28))) !==
              0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) &
              ((1 << (AntimonyGrammarParser.ARROW - 33)) |
                (1 << (AntimonyGrammarParser.NUMBER - 33)) |
                (1 << (AntimonyGrammarParser.VAR_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.SUB_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.TYPE_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.NAME - 33)))) !==
              0)
        ) {
          {
            this.state = 419
            this.small_stmt()
          }
        }

        this.state = 422
        _la = this._input.LA(1)
        if (
          !(
            _la === AntimonyGrammarParser.T__15 ||
            _la === AntimonyGrammarParser.NEWLINE
          )
        ) {
          this._errHandler.recoverInline(this)
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true
          }

          this._errHandler.reportMatch(this)
          this.consume()
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  small_stmt() {
    let _localctx = new Small_stmtContext(this._ctx, this.state)
    this.enterRule(_localctx, 80, AntimonyGrammarParser.RULE_small_stmt)
    try {
      this.state = 438
      this._errHandler.sync(this)
      switch (this.interpreter.adaptivePredict(this._input, 47, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1)
          {
            this.state = 424
            this.reaction()
          }
          break

        case 2:
          this.enterOuterAlt(_localctx, 2)
          {
            this.state = 425
            this.assignment()
          }
          break

        case 3:
          this.enterOuterAlt(_localctx, 3)
          {
            this.state = 426
            this.declaration()
          }
          break

        case 4:
          this.enterOuterAlt(_localctx, 4)
          {
            this.state = 427
            this.annotation()
          }
          break

        case 5:
          this.enterOuterAlt(_localctx, 5)
          {
            this.state = 428
            this.unit_declaration()
          }
          break

        case 6:
          this.enterOuterAlt(_localctx, 6)
          {
            this.state = 429
            this.unit_assignment()
          }
          break

        case 7:
          this.enterOuterAlt(_localctx, 7)
          {
            this.state = 430
            this.mmodel_call()
          }
          break

        case 8:
          this.enterOuterAlt(_localctx, 8)
          {
            this.state = 431
            this.variable_in()
          }
          break

        case 9:
          this.enterOuterAlt(_localctx, 9)
          {
            this.state = 432
            this.is_assignment()
          }
          break

        case 10:
          this.enterOuterAlt(_localctx, 10)
          {
            this.state = 433
            this.import_()
          }
          break

        case 11:
          this.enterOuterAlt(_localctx, 11)
          {
            this.state = 434
            this.interaction()
          }
          break

        case 12:
          this.enterOuterAlt(_localctx, 12)
          {
            this.state = 435
            this.rate_rule()
          }
          break

        case 13:
          this.enterOuterAlt(_localctx, 13)
          {
            this.state = 436
            this.sboterm()
          }
          break

        case 14:
          this.enterOuterAlt(_localctx, 14)
          {
            this.state = 437
            this.event()
          }
          break
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  simple_stmt_list() {
    let _localctx = new Simple_stmt_listContext(this._ctx, this.state)
    this.enterRule(_localctx, 82, AntimonyGrammarParser.RULE_simple_stmt_list)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 441
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        do {
          {
            {
              this.state = 440
              this.simple_stmt()
            }
          }
          this.state = 443
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        } while (
          ((_la & ~0x1f) === 0 &&
            ((1 << _la) &
              ((1 << AntimonyGrammarParser.T__4) |
                (1 << AntimonyGrammarParser.T__6) |
                (1 << AntimonyGrammarParser.T__15) |
                (1 << AntimonyGrammarParser.T__19) |
                (1 << AntimonyGrammarParser.T__28))) !==
              0) ||
          (((_la - 33) & ~0x1f) === 0 &&
            ((1 << (_la - 33)) &
              ((1 << (AntimonyGrammarParser.ARROW - 33)) |
                (1 << (AntimonyGrammarParser.NUMBER - 33)) |
                (1 << (AntimonyGrammarParser.VAR_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.SUB_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.TYPE_MODIFIER - 33)) |
                (1 << (AntimonyGrammarParser.NAME - 33)) |
                (1 << (AntimonyGrammarParser.NEWLINE - 33)))) !==
              0)
        )
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  import_() {
    let _localctx = new Import_Context(this._ctx, this.state)
    this.enterRule(_localctx, 84, AntimonyGrammarParser.RULE_import_)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 445
        this.match(AntimonyGrammarParser.T__28)
        this.state = 446
        this.match(AntimonyGrammarParser.ESCAPED_STRING)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  modular_model() {
    let _localctx = new Modular_modelContext(this._ctx, this.state)
    this.enterRule(_localctx, 86, AntimonyGrammarParser.RULE_modular_model)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 448
        this.match(AntimonyGrammarParser.T__0)
        this.state = 450
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__2) {
          {
            this.state = 449
            this.match(AntimonyGrammarParser.T__2)
          }
        }

        this.state = 452
        this.match(AntimonyGrammarParser.NAME)
        this.state = 453
        this.match(AntimonyGrammarParser.T__21)
        this.state = 455
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          _la === AntimonyGrammarParser.NUMBER ||
          _la === AntimonyGrammarParser.NAME
        ) {
          {
            this.state = 454
            this.init_params()
          }
        }

        this.state = 457
        this.match(AntimonyGrammarParser.T__22)
        this.state = 458
        this.simple_stmt_list()
        this.state = 459
        this.match(AntimonyGrammarParser.END)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  function() {
    let _localctx = new FunctionContext(this._ctx, this.state)
    this.enterRule(_localctx, 88, AntimonyGrammarParser.RULE_function)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 461
        this.match(AntimonyGrammarParser.T__29)
        this.state = 462
        this.match(AntimonyGrammarParser.NAME)
        this.state = 463
        this.match(AntimonyGrammarParser.T__21)
        this.state = 465
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (
          _la === AntimonyGrammarParser.NUMBER ||
          _la === AntimonyGrammarParser.NAME
        ) {
          {
            this.state = 464
            this.init_params()
          }
        }

        this.state = 467
        this.match(AntimonyGrammarParser.T__22)
        this.state = 468
        this.match(AntimonyGrammarParser.NEWLINE)
        this.state = 469
        this.sum(0)
        this.state = 471
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        if (_la === AntimonyGrammarParser.T__15) {
          {
            this.state = 470
            this.match(AntimonyGrammarParser.T__15)
          }
        }

        this.state = 473
        this.match(AntimonyGrammarParser.NEWLINE)
        this.state = 474
        this.match(AntimonyGrammarParser.END)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  parameters() {
    let _localctx = new ParametersContext(this._ctx, this.state)
    this.enterRule(_localctx, 90, AntimonyGrammarParser.RULE_parameters)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        {
          this.state = 476
          this.bool_exp()
        }
        this.state = 481
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__9) {
          {
            {
              this.state = 477
              this.match(AntimonyGrammarParser.T__9)
              {
                this.state = 478
                this.bool_exp()
              }
            }
          }
          this.state = 483
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  init_params() {
    let _localctx = new Init_paramsContext(this._ctx, this.state)
    this.enterRule(_localctx, 92, AntimonyGrammarParser.RULE_init_params)
    let _la
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 484
        _la = this._input.LA(1)
        if (
          !(
            _la === AntimonyGrammarParser.NUMBER ||
            _la === AntimonyGrammarParser.NAME
          )
        ) {
          this._errHandler.recoverInline(this)
        } else {
          if (this._input.LA(1) === Token.EOF) {
            this.matchedEOF = true
          }

          this._errHandler.reportMatch(this)
          this.consume()
        }
        this.state = 489
        this._errHandler.sync(this)
        _la = this._input.LA(1)
        while (_la === AntimonyGrammarParser.T__9) {
          {
            {
              this.state = 485
              this.match(AntimonyGrammarParser.T__9)
              this.state = 486
              _la = this._input.LA(1)
              if (
                !(
                  _la === AntimonyGrammarParser.NUMBER ||
                  _la === AntimonyGrammarParser.NAME
                )
              ) {
                this._errHandler.recoverInline(this)
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true
                }

                this._errHandler.reportMatch(this)
                this.consume()
              }
            }
          }
          this.state = 491
          this._errHandler.sync(this)
          _la = this._input.LA(1)
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  variable_in() {
    let _localctx = new Variable_inContext(this._ctx, this.state)
    this.enterRule(_localctx, 94, AntimonyGrammarParser.RULE_variable_in)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 492
        this.var_name()
        this.state = 493
        this.in_comp()
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }
  // @RuleVersion(0)
  is_assignment() {
    let _localctx = new Is_assignmentContext(this._ctx, this.state)
    this.enterRule(_localctx, 96, AntimonyGrammarParser.RULE_is_assignment)
    try {
      this.enterOuterAlt(_localctx, 1)
      {
        this.state = 495
        this.match(AntimonyGrammarParser.NAME)
        this.state = 496
        this.match(AntimonyGrammarParser.T__30)
        this.state = 497
        this.match(AntimonyGrammarParser.ESCAPED_STRING)
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re
        this._errHandler.reportError(this, re)
        this._errHandler.recover(this, re)
      } else {
        throw re
      }
    } finally {
      this.exitRule()
    }
    return _localctx
  }

  sempred(_localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 34:
        return this.sum_sempred(_localctx, predIndex)

      case 35:
        return this.product_sempred(_localctx, predIndex)

      case 36:
        return this.power_sempred(_localctx, predIndex)
    }
    return true
  }
  sum_sempred(_localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 2)

      case 1:
        return this.precpred(this._ctx, 1)
    }
    return true
  }
  product_sempred(_localctx, predIndex) {
    switch (predIndex) {
      case 2:
        return this.precpred(this._ctx, 2)

      case 3:
        return this.precpred(this._ctx, 1)
    }
    return true
  }
  power_sempred(_localctx, predIndex) {
    switch (predIndex) {
      case 4:
        return this.precpred(this._ctx, 2)
    }
    return true
  }

  static _serializedATN =
    "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x039\u01F6\x04\x02" +
    "\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
    "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
    "\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
    "\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
    "\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
    '\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04"\t"\x04#' +
    "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
    "\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x03\x02\x03\x02" +
    "\x03\x02\x03\x02\x07\x02i\n\x02\f\x02\x0E\x02l\v\x02\x03\x03\x05\x03o" +
    "\n\x03\x03\x03\x05\x03r\n\x03\x03\x03\x03\x03\x05\x03v\n\x03\x03\x03\x03" +
    "\x03\x05\x03z\n\x03\x03\x03\x03\x03\x03\x03\x03\x04\x05\x04\x80\n\x04" +
    "\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x05\x06\x89\n" +
    "\x06\x03\x07\x05\x07\x8C\n\x07\x03\x07\x03\x07\x05\x07\x90\n\x07\x03\x07" +
    "\x03\x07\x05\x07\x94\n\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03" +
    "\t\x03\t\x07\t\x9E\n\t\f\t\x0E\t\xA1\v\t\x03\n\x03\n\x03\n\x03\n\x03\n" +
    "\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\xAF\n\n\x03\v\x03\v\x03" +
    "\f\x03\f\x03\f\x03\r\x05\r\xB7\n\r\x03\r\x03\r\x03\r\x05\r\xBC\n\r\x03" +
    "\r\x03\r\x05\r\xC0\n\r\x03\r\x05\r\xC3\n\r\x03\r\x05\r\xC6\n\r\x03\r\x05" +
    "\r\xC9\n\r\x03\r\x03\r\x03\r\x03\r\x05\r\xCF\n\r\x03\r\x05\r\xD2\n\r\x05" +
    "\r\xD4\n\r\x03\x0E\x03\x0E\x03\x0E\x07\x0E\xD9\n\x0E\f\x0E\x0E\x0E\xDC" +
    "\v\x0E\x03\x0F\x05\x0F\xDF\n\x0F\x03\x0F\x05\x0F\xE2\n\x0F\x03\x0F\x03" +
    "\x0F\x03\x10\x05\x10\xE7\n\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11" +
    "\x03\x11\x03\x11\x07\x11\xF0\n\x11\f\x11\x0E\x11\xF3\v\x11\x03\x12\x03" +
    "\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x14\x03" +
    "\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
    "\x16\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\u010D\n\x17\x03\x18\x06\x18" +
    "\u0110\n\x18\r\x18\x0E\x18\u0111\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A" +
    "\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u011C\n\x1A\f\x1A\x0E\x1A\u011F\v\x1A" +
    "\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
    "\x05\x1B\u012A\n\x1B\x03\x1C\x03\x1C\x05\x1C\u012E\n\x1C\x03\x1D\x03\x1D" +
    "\x03\x1D\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03 " +
    "\x03 \x03 \x03 \x03!\x05!\u013F\n!\x03!\x03!\x03!\x05!\u0144\n!\x03!\x03" +
    '!\x03"\x03"\x03"\x03"\x07"\u014C\n"\f"\x0E"\u014F\v"\x05"\u0151' +
    '\n"\x03#\x03#\x03#\x03#\x07#\u0157\n#\f#\x0E#\u015A\v#\x05#\u015C\n#' +
    "\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x07$\u0167\n$\f$\x0E$\u016A" +
    "\v$\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x07%\u0175\n%\f%\x0E" +
    "%\u0178\v%\x03&\x03&\x03&\x03&\x05&\u017E\n&\x03&\x03&\x03&\x07&\u0183" +
    "\n&\f&\x0E&\u0186\v&\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03" +
    "'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03'\x03" +
    "'\x05'\u019D\n'\x03(\x03(\x03(\x05(\u01A2\n(\x03(\x03(\x03)\x05)\u01A7" +
    "\n)\x03)\x03)\x03*\x03*\x03*\x03*\x03*\x03*\x03*\x03*\x03*\x03*\x03*\x03" +
    "*\x03*\x03*\x05*\u01B9\n*\x03+\x06+\u01BC\n+\r+\x0E+\u01BD\x03,\x03,\x03" +
    ",\x03-\x03-\x05-\u01C5\n-\x03-\x03-\x03-\x05-\u01CA\n-\x03-\x03-\x03-" +
    "\x03-\x03.\x03.\x03.\x03.\x05.\u01D4\n.\x03.\x03.\x03.\x03.\x05.\u01DA" +
    "\n.\x03.\x03.\x03.\x03/\x03/\x03/\x07/\u01E2\n/\f/\x0E/\u01E5\v/\x030" +
    "\x030\x030\x070\u01EA\n0\f0\x0E0\u01ED\v0\x031\x031\x031\x032\x032\x03" +
    "2\x032\x032\x02\x02\x05FHJ3\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
    "\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
    ' \x02"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02' +
    "<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02" +
    "X\x02Z\x02\\\x02^\x02`\x02b\x02\x02\x07\x03\x02\x03\x04\x04\x02\x0E\x0E" +
    "**\x04\x02\x13\x13\x1A\x1A\x04\x02\x12\x1277\x04\x02%%00\x02\u0215\x02" +
    "j\x03\x02\x02\x02\x04n\x03\x02\x02\x02\x06\x7F\x03\x02\x02\x02\b\x83\x03" +
    "\x02\x02\x02\n\x86\x03\x02\x02\x02\f\x8B\x03\x02\x02\x02\x0E\x98\x03\x02" +
    "\x02\x02\x10\x9F\x03\x02\x02\x02\x12\xAE\x03\x02\x02\x02\x14\xB0\x03\x02" +
    "\x02\x02\x16\xB2\x03\x02\x02\x02\x18\xD3\x03\x02\x02\x02\x1A\xD5\x03\x02" +
    "\x02\x02\x1C\xDE\x03\x02\x02\x02\x1E\xE6\x03\x02\x02\x02 \xEC\x03\x02" +
    '\x02\x02"\xF4\x03\x02\x02\x02$\xF8\x03\x02\x02\x02&\xFD\x03\x02\x02\x02' +
    "(\u0101\x03\x02\x02\x02*\u0103\x03\x02\x02\x02,\u0108\x03\x02\x02\x02" +
    ".\u010F\x03\x02\x02\x020\u0113\x03\x02\x02\x022\u0117\x03\x02\x02\x02" +
    "4\u0129\x03\x02\x02\x026\u012B\x03\x02\x02\x028\u012F\x03\x02\x02\x02" +
    ":\u0132\x03\x02\x02\x02<\u0134\x03\x02\x02\x02>\u0139\x03\x02\x02\x02" +
    "@\u013E\x03\x02\x02\x02B\u0150\x03\x02\x02\x02D\u015B\x03\x02\x02\x02" +
    "F\u015D\x03\x02\x02\x02H\u016B\x03\x02\x02\x02J\u017D\x03\x02\x02\x02" +
    "L\u019C\x03\x02\x02\x02N\u019E\x03\x02\x02\x02P\u01A6\x03\x02\x02\x02" +
    "R\u01B8\x03\x02\x02\x02T\u01BB\x03\x02\x02\x02V\u01BF\x03\x02\x02\x02" +
    "X\u01C2\x03\x02\x02\x02Z\u01CF\x03\x02\x02\x02\\\u01DE\x03\x02\x02\x02" +
    "^\u01E6\x03\x02\x02\x02`\u01EE\x03\x02\x02\x02b\u01F1\x03\x02\x02\x02" +
    "di\x05P)\x02ei\x05\x04\x03\x02fi\x05Z.\x02gi\x05X-\x02hd\x03\x02\x02\x02" +
    "he\x03\x02\x02\x02hf\x03\x02\x02\x02hg\x03\x02\x02\x02il\x03\x02\x02\x02" +
    "jh\x03\x02\x02\x02jk\x03\x02\x02\x02k\x03\x03\x02\x02\x02lj\x03\x02\x02" +
    "\x02mo\x077\x02\x02nm\x03\x02\x02\x02no\x03\x02\x02\x02oq\x03\x02\x02" +
    "\x02pr\x07/\x02\x02qp\x03\x02\x02\x02qr\x03\x02\x02\x02rs\x03\x02\x02" +
    "\x02su\t\x02\x02\x02tv\x07\x05\x02\x02ut\x03\x02\x02\x02uv\x03\x02\x02" +
    "\x02vw\x03\x02\x02\x02wy\x070\x02\x02xz\x07\x06\x02\x02yx\x03\x02\x02" +
    '\x02yz\x03\x02\x02\x02z{\x03\x02\x02\x02{|\x05T+\x02|}\x07"\x02\x02}' +
    "\x05\x03\x02\x02\x02~\x80\x07\x07\x02\x02\x7F~\x03\x02\x02\x02\x7F\x80" +
    "\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81\x82\x070\x02\x02\x82\x07" +
    "\x03\x02\x02\x02\x83\x84\x07\b\x02\x02\x84\x85\x05\x06\x04\x02\x85\t\x03" +
    "\x02\x02\x02\x86\x88\x05\x06\x04\x02\x87\x89\x05\b\x05\x02\x88\x87\x03" +
    "\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\v\x03\x02\x02\x02\x8A\x8C\x05" +
    "\x16\f\x02\x8B\x8A\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C\x8D\x03" +
    "\x02\x02\x02\x8D\x8F\x07\t\x02\x02\x8E\x90\x05\x0E\b\x02\x8F\x8E\x03\x02" +
    "\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91\x93\x05B" +
    '"\x02\x92\x94\x05\x10\t\x02\x93\x92\x03\x02\x02\x02\x93\x94\x03\x02\x02' +
    "\x02\x94\x95\x03\x02\x02\x02\x95\x96\x07\n\x02\x02\x96\x97\x05 \x11\x02" +
    '\x97\r\x03\x02\x02\x02\x98\x99\x05B"\x02\x99\x9A\x07\v\x02\x02\x9A\x0F' +
    "\x03\x02\x02\x02\x9B\x9C\x07\f\x02\x02\x9C\x9E\x05\x12\n\x02\x9D\x9B\x03" +
    "\x02\x02\x02\x9E\xA1\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02\x9F\xA0\x03" +
    "\x02\x02\x02\xA0\x11\x03\x02\x02\x02\xA1\x9F\x03\x02\x02\x02\xA2\xA3\x07" +
    "\r\x02\x02\xA3\xA4\x07\x0E\x02\x02\xA4\xAF\x07&\x02\x02\xA5\xA6\x07\x0F" +
    "\x02\x02\xA6\xA7\x07\x0E\x02\x02\xA7\xAF\x05F$\x02\xA8\xA9\x07\x10\x02" +
    "\x02\xA9\xAA\x07\x0E\x02\x02\xAA\xAF\x07&\x02\x02\xAB\xAC\x07\x11\x02" +
    "\x02\xAC\xAD\x07\x0E\x02\x02\xAD\xAF\x07&\x02\x02\xAE\xA2\x03\x02\x02" +
    "\x02\xAE\xA5\x03\x02\x02\x02\xAE\xA8\x03\x02\x02\x02\xAE\xAB\x03\x02\x02" +
    "\x02\xAF\x13\x03\x02\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\x15\x03\x02\x02" +
    "\x02\xB2\xB3\x05\n\x06\x02\xB3\xB4\x07\n\x02\x02\xB4\x17\x03\x02\x02\x02" +
    "\xB5\xB7\x05\x16\f\x02\xB6\xB5\x03\x02\x02\x02\xB6\xB7\x03\x02\x02\x02" +
    "\xB7\xB8\x03\x02\x02\x02\xB8\xB9\x05\x1A\x0E\x02\xB9\xBB\x07#\x02\x02" +
    "\xBA\xBC\x05\x1A\x0E\x02\xBB\xBA\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02" +
    "\xBC\xBD\x03\x02\x02\x02\xBD\xBF\x07\x12\x02\x02\xBE\xC0\x05F$\x02\xBF" +
    "\xBE\x03\x02\x02\x02\xBF\xC0\x03\x02\x02\x02\xC0\xC2\x03\x02\x02\x02\xC1" +
    "\xC3\x05\b\x05\x02\xC2\xC1\x03\x02\x02\x02\xC2\xC3\x03\x02\x02\x02\xC3" +
    "\xD4\x03\x02\x02\x02\xC4\xC6\x05\x16\f\x02\xC5\xC4\x03\x02\x02\x02\xC5" +
    "\xC6\x03\x02\x02\x02\xC6\xC8\x03\x02\x02\x02\xC7\xC9\x05\x1A\x0E\x02\xC8" +
    "\xC7\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA" +
    "\xCB\x07#\x02\x02\xCB\xCC\x05\x1A\x0E\x02\xCC\xCE\x07\x12\x02\x02\xCD" +
    "\xCF\x05F$\x02\xCE\xCD\x03\x02\x02\x02\xCE\xCF\x03\x02\x02\x02\xCF\xD1" +
    "\x03\x02\x02\x02\xD0\xD2\x05\b\x05\x02\xD1\xD0\x03\x02\x02\x02\xD1\xD2" +
    "\x03\x02\x02\x02\xD2\xD4\x03\x02\x02\x02\xD3\xB6\x03\x02\x02\x02\xD3\xC5" +
    "\x03\x02\x02\x02\xD4\x19\x03\x02\x02\x02\xD5\xDA\x05\x1C\x0F\x02\xD6\xD7" +
    "\x07\x13\x02\x02\xD7\xD9\x05\x1C\x0F\x02\xD8\xD6\x03\x02\x02\x02\xD9\xDC" +
    "\x03\x02\x02\x02\xDA\xD8\x03\x02\x02\x02\xDA\xDB\x03\x02\x02\x02\xDB\x1B" +
    "\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD\xDF\x07%\x02\x02\xDE\xDD" +
    "\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\xE1\x03\x02\x02\x02\xE0\xE2" +
    "\x07\x07\x02\x02\xE1\xE0\x03\x02\x02\x02\xE1\xE2\x03\x02\x02\x02\xE2\xE3" +
    "\x03\x02\x02\x02\xE3\xE4\x070\x02\x02\xE4\x1D\x03\x02\x02\x02\xE5\xE7" +
    "\x05\x16\f\x02\xE6\xE5\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7\xE8" +
    "\x03\x02\x02\x02\xE8\xE9\x05\x1C\x0F\x02\xE9\xEA\x07$\x02\x02\xEA\xEB" +
    '\x05\n\x06\x02\xEB\x1F\x03\x02\x02\x02\xEC\xF1\x05"\x12\x02\xED\xEE\x07' +
    '\f\x02\x02\xEE\xF0\x05"\x12\x02\xEF\xED\x03\x02\x02\x02\xF0\xF3\x03\x02' +
    "\x02\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2!\x03\x02" +
    "\x02\x02\xF3\xF1\x03\x02\x02\x02\xF4\xF5\x05\x06\x04\x02\xF5\xF6\x07\x0E" +
    "\x02\x02\xF6\xF7\x05F$\x02\xF7#\x03\x02\x02\x02\xF8\xF9\x05\x06\x04\x02" +
    "\xF9\xFA\x07\x14\x02\x02\xFA\xFB\x07\x0E\x02\x02\xFB\xFC\x07)\x02\x02" +
    "\xFC%\x03\x02\x02\x02\xFD\xFE\x05\n\x06\x02\xFE\xFF\t\x03\x02\x02\xFF" +
    "\u0100\x05F$\x02\u0100'\x03\x02\x02\x02\u0101\u0102\x07\x15\x02\x02\u0102" +
    ")\x03\x02\x02\x02\u0103\u0104\x070\x02\x02\u0104\u0105\x05(\x15\x02\u0105" +
    "\u0106\x07\x0E\x02\x02\u0106\u0107\x05F$\x02\u0107+\x03\x02\x02\x02\u0108" +
    "\u0109\x05\x06\x04\x02\u0109\u010A\x07+\x02\x02\u010A\u010C\x079\x02\x02" +
    "\u010B\u010D\x05.\x18\x02\u010C\u010B\x03\x02\x02\x02\u010C\u010D\x03" +
    "\x02\x02\x02\u010D-\x03\x02\x02\x02\u010E\u0110\x050\x19\x02\u010F\u010E" +
    "\x03\x02\x02\x02\u0110\u0111\x03\x02\x02\x02\u0111\u010F\x03\x02\x02\x02" +
    "\u0111\u0112\x03\x02\x02\x02\u0112/\x03\x02\x02\x02\u0113\u0114\x07\f" +
    "\x02\x02\u0114\u0115\x077\x02\x02\u0115\u0116\x079\x02\x02\u01161\x03" +
    "\x02\x02\x02\u0117\u0118\x054\x1B\x02\u0118\u011D\x056\x1C\x02\u0119\u011A" +
    "\x07\f\x02\x02\u011A\u011C\x056\x1C\x02\u011B\u0119\x03\x02\x02\x02\u011C" +
    "\u011F\x03\x02\x02\x02\u011D\u011B\x03\x02\x02\x02\u011D\u011E\x03\x02" +
    "\x02\x02\u011E3\x03\x02\x02\x02\u011F\u011D\x03\x02\x02\x02\u0120\u012A" +
    "\x07,\x02\x02\u0121\u012A\x07.\x02\x02\u0122\u0123\x07,\x02\x02\u0123" +
    "\u012A\x07.\x02\x02\u0124\u0125\x07-\x02\x02\u0125\u012A\x07.\x02\x02" +
    "\u0126\u0127\x07,\x02\x02\u0127\u0128\x07-\x02\x02\u0128\u012A\x07.\x02" +
    "\x02\u0129\u0120\x03\x02\x02\x02\u0129\u0121\x03\x02\x02\x02\u0129\u0122" +
    "\x03\x02\x02\x02\u0129\u0124\x03\x02\x02\x02\u0129\u0126\x03\x02\x02\x02" +
    "\u012A5\x03\x02\x02\x02\u012B\u012D\x05\n\x06\x02\u012C\u012E\x058\x1D" +
    "\x02\u012D\u012C\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E7\x03" +
    "\x02\x02\x02\u012F\u0130\x07\x0E\x02\x02\u0130\u0131\x05F$\x02\u01319" +
    "\x03\x02\x02\x02\u0132\u0133\x070\x02\x02\u0133;\x03\x02\x02\x02\u0134" +
    "\u0135\x07\x16\x02\x02\u0135\u0136\x05\x06\x04\x02\u0136\u0137\x07\x0E" +
    "\x02\x02\u0137\u0138\x05F$\x02\u0138=\x03\x02\x02\x02\u0139\u013A\x05" +
    "\x06\x04\x02\u013A\u013B\x07\x17\x02\x02\u013B\u013C\x05F$\x02\u013C?" +
    "\x03\x02\x02\x02\u013D\u013F\x05\x16\f\x02\u013E\u013D\x03\x02\x02\x02" +
    "\u013E\u013F\x03\x02\x02\x02\u013F\u0140\x03\x02\x02\x02\u0140\u0141\x07" +
    "0\x02\x02\u0141\u0143\x07\x18\x02\x02\u0142\u0144\x05^0\x02\u0143\u0142" +
    "\x03\x02\x02\x02\u0143\u0144\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02" +
    "\u0145\u0146\x07\x19\x02\x02\u0146A\x03\x02\x02\x02\u0147\u0151\x05D#" +
    "\x02\u0148\u014D\x05D#\x02\u0149\u014A\x07(\x02\x02\u014A\u014C\x05D#" +
    "\x02\u014B\u0149\x03\x02\x02\x02\u014C\u014F\x03\x02\x02\x02\u014D\u014B" +
    "\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E\u0151\x03\x02\x02\x02" +
    "\u014F\u014D\x03\x02\x02\x02\u0150\u0147\x03\x02\x02\x02\u0150\u0148\x03" +
    "\x02\x02\x02\u0151C\x03\x02\x02\x02\u0152\u015C\x05F$\x02\u0153\u0158" +
    "\x05F$\x02\u0154\u0155\x07'\x02\x02\u0155\u0157\x05F$\x02\u0156\u0154" +
    "\x03\x02\x02\x02\u0157\u015A\x03\x02\x02\x02\u0158\u0156\x03\x02\x02\x02" +
    "\u0158\u0159\x03\x02\x02\x02\u0159\u015C\x03\x02\x02\x02\u015A\u0158\x03" +
    "\x02\x02\x02\u015B\u0152\x03\x02\x02\x02\u015B\u0153\x03\x02\x02\x02\u015C" +
    "E\x03\x02\x02\x02\u015D\u015E\b$\x01\x02\u015E\u015F\x05H%\x02\u015F\u0168" +
    "\x03\x02\x02\x02\u0160\u0161\f\x04\x02\x02\u0161\u0162\x07\x13\x02\x02" +
    "\u0162\u0167\x05H%\x02\u0163\u0164\f\x03\x02\x02\u0164\u0165\x07\x1A\x02" +
    "\x02\u0165\u0167\x05H%\x02\u0166\u0160\x03\x02\x02\x02\u0166\u0163\x03" +
    "\x02\x02\x02\u0167\u016A\x03\x02\x02\x02\u0168\u0166\x03\x02\x02\x02\u0168" +
    "\u0169\x03\x02\x02\x02\u0169G\x03\x02\x02\x02\u016A\u0168\x03\x02\x02" +
    "\x02\u016B\u016C\b%\x01\x02\u016C\u016D\x05J&\x02\u016D\u0176\x03\x02" +
    "\x02\x02\u016E\u016F\f\x04\x02\x02\u016F\u0170\x07\x05\x02\x02\u0170\u0175" +
    "\x05J&\x02\u0171\u0172\f\x03\x02\x02\u0172\u0173\x07\x1B\x02\x02\u0173" +
    "\u0175\x05J&\x02\u0174\u016E\x03\x02\x02\x02\u0174\u0171\x03\x02\x02\x02" +
    "\u0175\u0178\x03\x02\x02\x02\u0176\u0174\x03\x02\x02\x02\u0176\u0177\x03" +
    "\x02\x02\x02\u0177I\x03\x02\x02\x02\u0178\u0176\x03\x02\x02\x02\u0179" +
    "\u017A\b&\x01\x02\u017A\u017E\x05L'\x02\u017B\u017C\x07\x1D\x02\x02\u017C" +
    "\u017E\x05L'\x02\u017D\u0179\x03\x02\x02\x02\u017D\u017B\x03\x02\x02" +
    "\x02\u017E\u0184\x03\x02\x02\x02\u017F\u0180\f\x04\x02\x02\u0180\u0181" +
    "\x07\x1C\x02\x02\u0181\u0183\x05L'\x02\u0182\u017F\x03\x02\x02\x02\u0183" +
    "\u0186\x03\x02\x02\x02\u0184\u0182\x03\x02\x02\x02\u0184\u0185\x03\x02" +
    "\x02\x02\u0185K\x03\x02\x02\x02\u0186\u0184\x03\x02\x02\x02\u0187\u019D" +
    "\x07%\x02\x02\u0188\u019D\x05\x06\x04\x02\u0189\u018A\x07%\x02\x02\u018A" +
    "\u019D\x05\x06\x04\x02\u018B\u018C\x07\x1A\x02\x02\u018C\u019D\x05L'" +
    "\x02\u018D\u018E\x07\x13\x02\x02\u018E\u019D\x05L'\x02\u018F\u0190\x07" +
    "\x18\x02\x02\u0190\u0191\x05F$\x02\u0191\u0192\x07\x19\x02\x02\u0192\u019D" +
    "\x03\x02\x02\x02\u0193\u019D\x05N(\x02\u0194\u0195\x07\x18\x02\x02\u0195" +
    '\u0196\x05B"\x02\u0196\u0197\x07\x19\x02\x02\u0197\u019D\x03\x02\x02' +
    "\x02\u0198\u0199\x07%\x02\x02\u0199\u019A\x07\x1E\x02\x02\u019A\u019B" +
    "\t\x04\x02\x02\u019B\u019D\x07%\x02\x02\u019C\u0187\x03\x02\x02\x02\u019C" +
    "\u0188\x03\x02\x02\x02\u019C\u0189\x03\x02\x02\x02\u019C\u018B\x03\x02" +
    "\x02\x02\u019C\u018D\x03\x02\x02\x02\u019C\u018F\x03\x02\x02\x02\u019C" +
    "\u0193\x03\x02\x02\x02\u019C\u0194\x03\x02\x02\x02\u019C\u0198\x03\x02" +
    "\x02\x02\u019DM\x03\x02\x02\x02\u019E\u019F\x05\x06\x04\x02\u019F\u01A1" +
    "\x07\x18\x02\x02\u01A0\u01A2\x05\\/\x02\u01A1\u01A0\x03\x02\x02\x02\u01A1" +
    "\u01A2\x03\x02\x02\x02\u01A2\u01A3\x03\x02\x02\x02\u01A3\u01A4\x07\x19" +
    "\x02\x02\u01A4O\x03\x02\x02\x02\u01A5\u01A7\x05R*\x02\u01A6\u01A5\x03" +
    "\x02\x02\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8" +
    "\u01A9\t\x05\x02\x02\u01A9Q\x03\x02\x02\x02\u01AA\u01B9\x05\x18\r\x02" +
    "\u01AB\u01B9\x05&\x14\x02\u01AC\u01B9\x052\x1A\x02\u01AD\u01B9\x05,\x17" +
    "\x02\u01AE\u01B9\x05<\x1F\x02\u01AF\u01B9\x05> \x02\u01B0\u01B9\x05@!" +
    "\x02\u01B1\u01B9\x05`1\x02\u01B2\u01B9\x05b2\x02\u01B3\u01B9\x05V,\x02" +
    "\u01B4\u01B9\x05\x1E\x10\x02\u01B5\u01B9\x05*\x16\x02\u01B6\u01B9\x05" +
    "$\x13\x02\u01B7\u01B9\x05\f\x07\x02\u01B8\u01AA\x03\x02\x02\x02\u01B8" +
    "\u01AB\x03\x02\x02\x02\u01B8\u01AC\x03\x02\x02\x02\u01B8\u01AD\x03\x02" +
    "\x02\x02\u01B8\u01AE\x03\x02\x02\x02\u01B8\u01AF\x03\x02\x02\x02\u01B8" +
    "\u01B0\x03\x02\x02\x02\u01B8\u01B1\x03\x02\x02\x02\u01B8\u01B2\x03\x02" +
    "\x02\x02\u01B8\u01B3\x03\x02\x02\x02\u01B8\u01B4\x03\x02\x02\x02\u01B8" +
    "\u01B5\x03\x02\x02\x02\u01B8\u01B6\x03\x02\x02\x02\u01B8\u01B7\x03\x02" +
    "\x02\x02\u01B9S\x03\x02\x02\x02\u01BA\u01BC\x05P)\x02\u01BB\u01BA\x03" +
    "\x02\x02\x02\u01BC\u01BD\x03\x02\x02\x02\u01BD\u01BB\x03\x02\x02\x02\u01BD" +
    "\u01BE\x03\x02\x02\x02\u01BEU\x03\x02\x02\x02\u01BF\u01C0\x07\x1F\x02" +
    "\x02\u01C0\u01C1\x079\x02\x02\u01C1W\x03\x02\x02\x02\u01C2\u01C4\x07\x03" +
    "\x02\x02\u01C3\u01C5\x07\x05\x02\x02\u01C4\u01C3\x03\x02\x02\x02\u01C4" +
    "\u01C5\x03\x02\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01C7\x070\x02" +
    "\x02\u01C7\u01C9\x07\x18\x02\x02\u01C8\u01CA\x05^0\x02\u01C9\u01C8\x03" +
    "\x02\x02\x02\u01C9\u01CA\x03\x02\x02\x02\u01CA\u01CB\x03\x02\x02\x02\u01CB" +
    '\u01CC\x07\x19\x02\x02\u01CC\u01CD\x05T+\x02\u01CD\u01CE\x07"\x02\x02' +
    "\u01CEY\x03\x02\x02\x02\u01CF\u01D0\x07 \x02\x02\u01D0\u01D1\x070\x02" +
    "\x02\u01D1\u01D3\x07\x18\x02\x02\u01D2\u01D4\x05^0\x02\u01D3\u01D2\x03" +
    "\x02\x02\x02\u01D3\u01D4\x03\x02\x02\x02\u01D4\u01D5\x03\x02\x02\x02\u01D5" +
    "\u01D6\x07\x19\x02\x02\u01D6\u01D7\x077\x02\x02\u01D7\u01D9\x05F$\x02" +
    "\u01D8\u01DA\x07\x12\x02\x02\u01D9\u01D8\x03\x02\x02\x02\u01D9\u01DA\x03" +
    "\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB\u01DC\x077\x02\x02\u01DC" +
    '\u01DD\x07"\x02\x02\u01DD[\x03\x02\x02\x02\u01DE\u01E3\x05B"\x02\u01DF' +
    '\u01E0\x07\f\x02\x02\u01E0\u01E2\x05B"\x02\u01E1\u01DF\x03\x02\x02\x02' +
    "\u01E2\u01E5\x03\x02\x02\x02\u01E3\u01E1\x03\x02\x02\x02\u01E3\u01E4\x03" +
    "\x02\x02\x02\u01E4]\x03\x02\x02\x02\u01E5\u01E3\x03\x02\x02\x02\u01E6" +
    "\u01EB\t\x06\x02\x02\u01E7\u01E8\x07\f\x02\x02\u01E8\u01EA\t\x06\x02\x02" +
    "\u01E9\u01E7\x03\x02\x02\x02\u01EA\u01ED\x03\x02\x02\x02\u01EB\u01E9\x03" +
    "\x02\x02\x02\u01EB\u01EC\x03\x02\x02\x02\u01EC_\x03\x02\x02\x02\u01ED" +
    "\u01EB\x03\x02\x02\x02\u01EE\u01EF\x05\x06\x04\x02\u01EF\u01F0\x05\b\x05" +
    "\x02\u01F0a\x03\x02\x02\x02\u01F1\u01F2\x070\x02\x02\u01F2\u01F3\x07!" +
    "\x02\x02\u01F3\u01F4\x079\x02\x02\u01F4c\x03\x02\x02\x029hjnquy\x7F\x88" +
    "\x8B\x8F\x93\x9F\xAE\xB6\xBB\xBF\xC2\xC5\xC8\xCE\xD1\xD3\xDA\xDE\xE1\xE6" +
    "\xF1\u010C\u0111\u011D\u0129\u012D\u013E\u0143\u014D\u0150\u0158\u015B" +
    "\u0166\u0168\u0174\u0176\u017D\u0184\u019C\u01A1\u01A6\u01B8\u01BD\u01C4" +
    "\u01C9\u01D3\u01D9\u01E3\u01EB"
  static get _ATN() {
    if (!AntimonyGrammarParser.__ATN) {
      AntimonyGrammarParser.__ATN = new ATNDeserializer().deserialize(
        Utils.toCharArray(AntimonyGrammarParser._serializedATN)
      )
    }

    return AntimonyGrammarParser.__ATN
  }
}

export class RootContext extends ParserRuleContext {
  simple_stmt(i) {
    if (i === undefined) {
      return this.getRuleContexts(Simple_stmtContext)
    } else {
      return this.getRuleContext(i, Simple_stmtContext)
    }
  }
  model(i) {
    if (i === undefined) {
      return this.getRuleContexts(ModelContext)
    } else {
      return this.getRuleContext(i, ModelContext)
    }
  }
  function(i) {
    if (i === undefined) {
      return this.getRuleContexts(FunctionContext)
    } else {
      return this.getRuleContext(i, FunctionContext)
    }
  }
  modular_model(i) {
    if (i === undefined) {
      return this.getRuleContexts(Modular_modelContext)
    } else {
      return this.getRuleContext(i, Modular_modelContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_root
  }
  // @Override
  enterRule(listener) {
    if (listener.enterRoot) {
      listener.enterRoot(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitRoot) {
      listener.exitRoot(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitRoot) {
      return visitor.visitRoot(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ModelContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  simple_stmt_list() {
    return this.getRuleContext(0, Simple_stmt_listContext)
  }
  END() {
    return this.getToken(AntimonyGrammarParser.END, 0)
  }
  NEWLINE() {
    return this.tryGetToken(AntimonyGrammarParser.NEWLINE, 0)
  }
  COMMENT() {
    return this.tryGetToken(AntimonyGrammarParser.COMMENT, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_model
  }
  // @Override
  enterRule(listener) {
    if (listener.enterModel) {
      listener.enterModel(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitModel) {
      listener.exitModel(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitModel) {
      return visitor.visitModel(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Var_nameContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_var_name
  }
  // @Override
  enterRule(listener) {
    if (listener.enterVar_name) {
      listener.enterVar_name(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitVar_name) {
      listener.exitVar_name(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitVar_name) {
      return visitor.visitVar_name(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class In_compContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_in_comp
  }
  // @Override
  enterRule(listener) {
    if (listener.enterIn_comp) {
      listener.enterIn_comp(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitIn_comp) {
      listener.exitIn_comp(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitIn_comp) {
      return visitor.visitIn_comp(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class NamemaybeinContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  in_comp() {
    return this.tryGetRuleContext(0, In_compContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_namemaybein
  }
  // @Override
  enterRule(listener) {
    if (listener.enterNamemaybein) {
      listener.enterNamemaybein(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitNamemaybein) {
      listener.exitNamemaybein(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitNamemaybein) {
      return visitor.visitNamemaybein(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class EventContext extends ParserRuleContext {
  bool_exp() {
    return this.getRuleContext(0, Bool_expContext)
  }
  event_assignment_list() {
    return this.getRuleContext(0, Event_assignment_listContext)
  }
  reaction_name() {
    return this.tryGetRuleContext(0, Reaction_nameContext)
  }
  event_delay() {
    return this.tryGetRuleContext(0, Event_delayContext)
  }
  event_trigger_list() {
    return this.tryGetRuleContext(0, Event_trigger_listContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent) {
      listener.enterEvent(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent) {
      listener.exitEvent(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent) {
      return visitor.visitEvent(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Event_delayContext extends ParserRuleContext {
  bool_exp() {
    return this.getRuleContext(0, Bool_expContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event_delay
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent_delay) {
      listener.enterEvent_delay(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent_delay) {
      listener.exitEvent_delay(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent_delay) {
      return visitor.visitEvent_delay(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Event_trigger_listContext extends ParserRuleContext {
  event_trigger(i) {
    if (i === undefined) {
      return this.getRuleContexts(Event_triggerContext)
    } else {
      return this.getRuleContext(i, Event_triggerContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event_trigger_list
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent_trigger_list) {
      listener.enterEvent_trigger_list(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent_trigger_list) {
      listener.exitEvent_trigger_list(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent_trigger_list) {
      return visitor.visitEvent_trigger_list(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Event_triggerContext extends ParserRuleContext {
  BOOLEAN() {
    return this.tryGetToken(AntimonyGrammarParser.BOOLEAN, 0)
  }
  sum() {
    return this.tryGetRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event_trigger
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent_trigger) {
      listener.enterEvent_trigger(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent_trigger) {
      listener.exitEvent_trigger(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent_trigger) {
      return visitor.visitEvent_trigger(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class EmptyContext extends ParserRuleContext {
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_empty
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEmpty) {
      listener.enterEmpty(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEmpty) {
      listener.exitEmpty(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEmpty) {
      return visitor.visitEmpty(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Reaction_nameContext extends ParserRuleContext {
  namemaybein() {
    return this.getRuleContext(0, NamemaybeinContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_reaction_name
  }
  // @Override
  enterRule(listener) {
    if (listener.enterReaction_name) {
      listener.enterReaction_name(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitReaction_name) {
      listener.exitReaction_name(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitReaction_name) {
      return visitor.visitReaction_name(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ReactionContext extends ParserRuleContext {
  species_list(i) {
    if (i === undefined) {
      return this.getRuleContexts(Species_listContext)
    } else {
      return this.getRuleContext(i, Species_listContext)
    }
  }
  ARROW() {
    return this.getToken(AntimonyGrammarParser.ARROW, 0)
  }
  reaction_name() {
    return this.tryGetRuleContext(0, Reaction_nameContext)
  }
  sum() {
    return this.tryGetRuleContext(0, SumContext)
  }
  in_comp() {
    return this.tryGetRuleContext(0, In_compContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_reaction
  }
  // @Override
  enterRule(listener) {
    if (listener.enterReaction) {
      listener.enterReaction(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitReaction) {
      listener.exitReaction(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitReaction) {
      return visitor.visitReaction(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Species_listContext extends ParserRuleContext {
  species(i) {
    if (i === undefined) {
      return this.getRuleContexts(SpeciesContext)
    } else {
      return this.getRuleContext(i, SpeciesContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_species_list
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSpecies_list) {
      listener.enterSpecies_list(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSpecies_list) {
      listener.exitSpecies_list(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSpecies_list) {
      return visitor.visitSpecies_list(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SpeciesContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  NUMBER() {
    return this.tryGetToken(AntimonyGrammarParser.NUMBER, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_species
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSpecies) {
      listener.enterSpecies(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSpecies) {
      listener.exitSpecies(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSpecies) {
      return visitor.visitSpecies(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class InteractionContext extends ParserRuleContext {
  species() {
    return this.getRuleContext(0, SpeciesContext)
  }
  INTERACTION_SYMBOL() {
    return this.getToken(AntimonyGrammarParser.INTERACTION_SYMBOL, 0)
  }
  namemaybein() {
    return this.getRuleContext(0, NamemaybeinContext)
  }
  reaction_name() {
    return this.tryGetRuleContext(0, Reaction_nameContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_interaction
  }
  // @Override
  enterRule(listener) {
    if (listener.enterInteraction) {
      listener.enterInteraction(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitInteraction) {
      listener.exitInteraction(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitInteraction) {
      return visitor.visitInteraction(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Event_assignment_listContext extends ParserRuleContext {
  event_assignment(i) {
    if (i === undefined) {
      return this.getRuleContexts(Event_assignmentContext)
    } else {
      return this.getRuleContext(i, Event_assignmentContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event_assignment_list
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent_assignment_list) {
      listener.enterEvent_assignment_list(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent_assignment_list) {
      listener.exitEvent_assignment_list(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent_assignment_list) {
      return visitor.visitEvent_assignment_list(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Event_assignmentContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_event_assignment
  }
  // @Override
  enterRule(listener) {
    if (listener.enterEvent_assignment) {
      listener.enterEvent_assignment(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitEvent_assignment) {
      listener.exitEvent_assignment(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitEvent_assignment) {
      return visitor.visitEvent_assignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SbotermContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  SBOTERM() {
    return this.getToken(AntimonyGrammarParser.SBOTERM, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_sboterm
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSboterm) {
      listener.enterSboterm(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSboterm) {
      listener.exitSboterm(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSboterm) {
      return visitor.visitSboterm(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class AssignmentContext extends ParserRuleContext {
  namemaybein() {
    return this.getRuleContext(0, NamemaybeinContext)
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  AEQ() {
    return this.getToken(AntimonyGrammarParser.AEQ, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_assignment
  }
  // @Override
  enterRule(listener) {
    if (listener.enterAssignment) {
      listener.enterAssignment(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitAssignment) {
      listener.exitAssignment(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitAssignment) {
      return visitor.visitAssignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ApostropheContext extends ParserRuleContext {
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_apostrophe
  }
  // @Override
  enterRule(listener) {
    if (listener.enterApostrophe) {
      listener.enterApostrophe(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitApostrophe) {
      listener.exitApostrophe(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitApostrophe) {
      return visitor.visitApostrophe(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Rate_ruleContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  apostrophe() {
    return this.getRuleContext(0, ApostropheContext)
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_rate_rule
  }
  // @Override
  enterRule(listener) {
    if (listener.enterRate_rule) {
      listener.enterRate_rule(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitRate_rule) {
      listener.exitRate_rule(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitRate_rule) {
      return visitor.visitRate_rule(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class AnnotationContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  ANNOT_KEYWORD() {
    return this.getToken(AntimonyGrammarParser.ANNOT_KEYWORD, 0)
  }
  ESCAPED_STRING() {
    return this.getToken(AntimonyGrammarParser.ESCAPED_STRING, 0)
  }
  annot_list() {
    return this.tryGetRuleContext(0, Annot_listContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_annotation
  }
  // @Override
  enterRule(listener) {
    if (listener.enterAnnotation) {
      listener.enterAnnotation(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitAnnotation) {
      listener.exitAnnotation(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitAnnotation) {
      return visitor.visitAnnotation(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Annot_listContext extends ParserRuleContext {
  new_annot(i) {
    if (i === undefined) {
      return this.getRuleContexts(New_annotContext)
    } else {
      return this.getRuleContext(i, New_annotContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_annot_list
  }
  // @Override
  enterRule(listener) {
    if (listener.enterAnnot_list) {
      listener.enterAnnot_list(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitAnnot_list) {
      listener.exitAnnot_list(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitAnnot_list) {
      return visitor.visitAnnot_list(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class New_annotContext extends ParserRuleContext {
  NEWLINE() {
    return this.getToken(AntimonyGrammarParser.NEWLINE, 0)
  }
  ESCAPED_STRING() {
    return this.getToken(AntimonyGrammarParser.ESCAPED_STRING, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_new_annot
  }
  // @Override
  enterRule(listener) {
    if (listener.enterNew_annot) {
      listener.enterNew_annot(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitNew_annot) {
      listener.exitNew_annot(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitNew_annot) {
      return visitor.visitNew_annot(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class DeclarationContext extends ParserRuleContext {
  decl_modifiers() {
    return this.getRuleContext(0, Decl_modifiersContext)
  }
  decl_item(i) {
    if (i === undefined) {
      return this.getRuleContexts(Decl_itemContext)
    } else {
      return this.getRuleContext(i, Decl_itemContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_declaration
  }
  // @Override
  enterRule(listener) {
    if (listener.enterDeclaration) {
      listener.enterDeclaration(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitDeclaration) {
      listener.exitDeclaration(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitDeclaration) {
      return visitor.visitDeclaration(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Decl_modifiersContext extends ParserRuleContext {
  VAR_MODIFIER() {
    return this.tryGetToken(AntimonyGrammarParser.VAR_MODIFIER, 0)
  }
  TYPE_MODIFIER() {
    return this.tryGetToken(AntimonyGrammarParser.TYPE_MODIFIER, 0)
  }
  SUB_MODIFIER() {
    return this.tryGetToken(AntimonyGrammarParser.SUB_MODIFIER, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_decl_modifiers
  }
  // @Override
  enterRule(listener) {
    if (listener.enterDecl_modifiers) {
      listener.enterDecl_modifiers(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitDecl_modifiers) {
      listener.exitDecl_modifiers(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitDecl_modifiers) {
      return visitor.visitDecl_modifiers(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Decl_itemContext extends ParserRuleContext {
  namemaybein() {
    return this.getRuleContext(0, NamemaybeinContext)
  }
  decl_assignment() {
    return this.tryGetRuleContext(0, Decl_assignmentContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_decl_item
  }
  // @Override
  enterRule(listener) {
    if (listener.enterDecl_item) {
      listener.enterDecl_item(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitDecl_item) {
      listener.exitDecl_item(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitDecl_item) {
      return visitor.visitDecl_item(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Decl_assignmentContext extends ParserRuleContext {
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_decl_assignment
  }
  // @Override
  enterRule(listener) {
    if (listener.enterDecl_assignment) {
      listener.enterDecl_assignment(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitDecl_assignment) {
      listener.exitDecl_assignment(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitDecl_assignment) {
      return visitor.visitDecl_assignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class UnitContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_unit
  }
  // @Override
  enterRule(listener) {
    if (listener.enterUnit) {
      listener.enterUnit(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitUnit) {
      listener.exitUnit(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitUnit) {
      return visitor.visitUnit(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Unit_declarationContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_unit_declaration
  }
  // @Override
  enterRule(listener) {
    if (listener.enterUnit_declaration) {
      listener.enterUnit_declaration(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitUnit_declaration) {
      listener.exitUnit_declaration(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitUnit_declaration) {
      return visitor.visitUnit_declaration(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Unit_assignmentContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_unit_assignment
  }
  // @Override
  enterRule(listener) {
    if (listener.enterUnit_assignment) {
      listener.enterUnit_assignment(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitUnit_assignment) {
      listener.exitUnit_assignment(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitUnit_assignment) {
      return visitor.visitUnit_assignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Mmodel_callContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  reaction_name() {
    return this.tryGetRuleContext(0, Reaction_nameContext)
  }
  init_params() {
    return this.tryGetRuleContext(0, Init_paramsContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_mmodel_call
  }
  // @Override
  enterRule(listener) {
    if (listener.enterMmodel_call) {
      listener.enterMmodel_call(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitMmodel_call) {
      listener.exitMmodel_call(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitMmodel_call) {
      return visitor.visitMmodel_call(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Bool_expContext extends ParserRuleContext {
  expressions(i) {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionsContext)
    } else {
      return this.getRuleContext(i, ExpressionsContext)
    }
  }
  LOGICAL(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.LOGICAL)
    } else {
      return this.getToken(AntimonyGrammarParser.LOGICAL, i)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_bool_exp
  }
  // @Override
  enterRule(listener) {
    if (listener.enterBool_exp) {
      listener.enterBool_exp(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitBool_exp) {
      listener.exitBool_exp(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitBool_exp) {
      return visitor.visitBool_exp(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ExpressionsContext extends ParserRuleContext {
  sum(i) {
    if (i === undefined) {
      return this.getRuleContexts(SumContext)
    } else {
      return this.getRuleContext(i, SumContext)
    }
  }
  COMPARE(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.COMPARE)
    } else {
      return this.getToken(AntimonyGrammarParser.COMPARE, i)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_expressions
  }
  // @Override
  enterRule(listener) {
    if (listener.enterExpressions) {
      listener.enterExpressions(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitExpressions) {
      listener.exitExpressions(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitExpressions) {
      return visitor.visitExpressions(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class SumContext extends ParserRuleContext {
  product() {
    return this.getRuleContext(0, ProductContext)
  }
  sum() {
    return this.tryGetRuleContext(0, SumContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_sum
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSum) {
      listener.enterSum(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSum) {
      listener.exitSum(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSum) {
      return visitor.visitSum(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ProductContext extends ParserRuleContext {
  power() {
    return this.getRuleContext(0, PowerContext)
  }
  product() {
    return this.tryGetRuleContext(0, ProductContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_product
  }
  // @Override
  enterRule(listener) {
    if (listener.enterProduct) {
      listener.enterProduct(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitProduct) {
      listener.exitProduct(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitProduct) {
      return visitor.visitProduct(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class PowerContext extends ParserRuleContext {
  atom() {
    return this.getRuleContext(0, AtomContext)
  }
  power() {
    return this.tryGetRuleContext(0, PowerContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_power
  }
  // @Override
  enterRule(listener) {
    if (listener.enterPower) {
      listener.enterPower(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitPower) {
      listener.exitPower(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitPower) {
      return visitor.visitPower(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class AtomContext extends ParserRuleContext {
  NUMBER(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.NUMBER)
    } else {
      return this.getToken(AntimonyGrammarParser.NUMBER, i)
    }
  }
  var_name() {
    return this.tryGetRuleContext(0, Var_nameContext)
  }
  atom() {
    return this.tryGetRuleContext(0, AtomContext)
  }
  sum() {
    return this.tryGetRuleContext(0, SumContext)
  }
  func_call() {
    return this.tryGetRuleContext(0, Func_callContext)
  }
  bool_exp() {
    return this.tryGetRuleContext(0, Bool_expContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_atom
  }
  // @Override
  enterRule(listener) {
    if (listener.enterAtom) {
      listener.enterAtom(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitAtom) {
      listener.exitAtom(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitAtom) {
      return visitor.visitAtom(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Func_callContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  parameters() {
    return this.tryGetRuleContext(0, ParametersContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_func_call
  }
  // @Override
  enterRule(listener) {
    if (listener.enterFunc_call) {
      listener.enterFunc_call(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitFunc_call) {
      listener.exitFunc_call(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitFunc_call) {
      return visitor.visitFunc_call(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Simple_stmtContext extends ParserRuleContext {
  NEWLINE() {
    return this.getToken(AntimonyGrammarParser.NEWLINE, 0)
  }
  small_stmt() {
    return this.tryGetRuleContext(0, Small_stmtContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_simple_stmt
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSimple_stmt) {
      listener.enterSimple_stmt(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSimple_stmt) {
      listener.exitSimple_stmt(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSimple_stmt) {
      return visitor.visitSimple_stmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Small_stmtContext extends ParserRuleContext {
  reaction() {
    return this.tryGetRuleContext(0, ReactionContext)
  }
  assignment() {
    return this.tryGetRuleContext(0, AssignmentContext)
  }
  declaration() {
    return this.tryGetRuleContext(0, DeclarationContext)
  }
  annotation() {
    return this.tryGetRuleContext(0, AnnotationContext)
  }
  unit_declaration() {
    return this.tryGetRuleContext(0, Unit_declarationContext)
  }
  unit_assignment() {
    return this.tryGetRuleContext(0, Unit_assignmentContext)
  }
  mmodel_call() {
    return this.tryGetRuleContext(0, Mmodel_callContext)
  }
  variable_in() {
    return this.tryGetRuleContext(0, Variable_inContext)
  }
  is_assignment() {
    return this.tryGetRuleContext(0, Is_assignmentContext)
  }
  import_() {
    return this.tryGetRuleContext(0, Import_Context)
  }
  interaction() {
    return this.tryGetRuleContext(0, InteractionContext)
  }
  rate_rule() {
    return this.tryGetRuleContext(0, Rate_ruleContext)
  }
  sboterm() {
    return this.tryGetRuleContext(0, SbotermContext)
  }
  event() {
    return this.tryGetRuleContext(0, EventContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_small_stmt
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSmall_stmt) {
      listener.enterSmall_stmt(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSmall_stmt) {
      listener.exitSmall_stmt(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSmall_stmt) {
      return visitor.visitSmall_stmt(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Simple_stmt_listContext extends ParserRuleContext {
  simple_stmt(i) {
    if (i === undefined) {
      return this.getRuleContexts(Simple_stmtContext)
    } else {
      return this.getRuleContext(i, Simple_stmtContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_simple_stmt_list
  }
  // @Override
  enterRule(listener) {
    if (listener.enterSimple_stmt_list) {
      listener.enterSimple_stmt_list(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitSimple_stmt_list) {
      listener.exitSimple_stmt_list(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitSimple_stmt_list) {
      return visitor.visitSimple_stmt_list(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Import_Context extends ParserRuleContext {
  ESCAPED_STRING() {
    return this.getToken(AntimonyGrammarParser.ESCAPED_STRING, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_import_
  }
  // @Override
  enterRule(listener) {
    if (listener.enterImport_) {
      listener.enterImport_(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitImport_) {
      listener.exitImport_(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitImport_) {
      return visitor.visitImport_(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Modular_modelContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  simple_stmt_list() {
    return this.getRuleContext(0, Simple_stmt_listContext)
  }
  END() {
    return this.getToken(AntimonyGrammarParser.END, 0)
  }
  init_params() {
    return this.tryGetRuleContext(0, Init_paramsContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_modular_model
  }
  // @Override
  enterRule(listener) {
    if (listener.enterModular_model) {
      listener.enterModular_model(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitModular_model) {
      listener.exitModular_model(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitModular_model) {
      return visitor.visitModular_model(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class FunctionContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  NEWLINE(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.NEWLINE)
    } else {
      return this.getToken(AntimonyGrammarParser.NEWLINE, i)
    }
  }
  sum() {
    return this.getRuleContext(0, SumContext)
  }
  END() {
    return this.getToken(AntimonyGrammarParser.END, 0)
  }
  init_params() {
    return this.tryGetRuleContext(0, Init_paramsContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_function
  }
  // @Override
  enterRule(listener) {
    if (listener.enterFunction) {
      listener.enterFunction(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitFunction) {
      listener.exitFunction(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitFunction) {
      return visitor.visitFunction(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class ParametersContext extends ParserRuleContext {
  bool_exp(i) {
    if (i === undefined) {
      return this.getRuleContexts(Bool_expContext)
    } else {
      return this.getRuleContext(i, Bool_expContext)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_parameters
  }
  // @Override
  enterRule(listener) {
    if (listener.enterParameters) {
      listener.enterParameters(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitParameters) {
      listener.exitParameters(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitParameters) {
      return visitor.visitParameters(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Init_paramsContext extends ParserRuleContext {
  NAME(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.NAME)
    } else {
      return this.getToken(AntimonyGrammarParser.NAME, i)
    }
  }
  NUMBER(i) {
    if (i === undefined) {
      return this.getTokens(AntimonyGrammarParser.NUMBER)
    } else {
      return this.getToken(AntimonyGrammarParser.NUMBER, i)
    }
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_init_params
  }
  // @Override
  enterRule(listener) {
    if (listener.enterInit_params) {
      listener.enterInit_params(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitInit_params) {
      listener.exitInit_params(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitInit_params) {
      return visitor.visitInit_params(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Variable_inContext extends ParserRuleContext {
  var_name() {
    return this.getRuleContext(0, Var_nameContext)
  }
  in_comp() {
    return this.getRuleContext(0, In_compContext)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_variable_in
  }
  // @Override
  enterRule(listener) {
    if (listener.enterVariable_in) {
      listener.enterVariable_in(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitVariable_in) {
      listener.exitVariable_in(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitVariable_in) {
      return visitor.visitVariable_in(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}

export class Is_assignmentContext extends ParserRuleContext {
  NAME() {
    return this.getToken(AntimonyGrammarParser.NAME, 0)
  }
  ESCAPED_STRING() {
    return this.getToken(AntimonyGrammarParser.ESCAPED_STRING, 0)
  }
  constructor(parent, invokingState) {
    super(parent, invokingState)
  }
  // @Override
  get ruleIndex() {
    return AntimonyGrammarParser.RULE_is_assignment
  }
  // @Override
  enterRule(listener) {
    if (listener.enterIs_assignment) {
      listener.enterIs_assignment(this)
    }
  }
  // @Override
  exitRule(listener) {
    if (listener.exitIs_assignment) {
      listener.exitIs_assignment(this)
    }
  }
  // @Override
  accept(visitor) {
    if (visitor.visitIs_assignment) {
      return visitor.visitIs_assignment(this)
    } else {
      return visitor.visitChildren(this)
    }
  }
}