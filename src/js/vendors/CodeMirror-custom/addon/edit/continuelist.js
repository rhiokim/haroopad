// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var listRE =      /^(\s*)([> ]+|[*+-]|(\d+)\.)(\s+)/,
      emptyListRE = /^(\s*)([> ]+|[*+-]|(\d+)\.)(\s*\[[x ]\])?\s*$/,
      taskRE =      /^(\s*)([> ]+|[*+-]|(\d+)\.)(\s*)\[[x ]\]\s*/,
      unorderedBullets = "*+-";

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    var ranges = cm.listSelections(), replacements = [];
    for (var i = 0; i < ranges.length; i++) {
      var pos = ranges[i].head, match;
      var eolState = cm.getStateAfter(pos.line);
      var inList = eolState.list !== false;
      var inQuote = eolState.quote !== false;

      if (!ranges[i].empty() || (!inList && !inQuote) || !(match = cm.getLine(pos.line).match(listRE))) {
        cm.execCommand("newlineAndIndent");
        return;
      }
      if (cm.getLine(pos.line).match(emptyListRE)) {
        cm.replaceRange("", {
          line: pos.line, ch: 0
        }, {
          line: pos.line, ch: pos.ch + 1
        });
        replacements[i] = "\n";

      } else {
        var task = '', indent = match[1], after = match[4];
        var bullet = unorderedBullets.indexOf(match[2]) >= 0 || match[2].indexOf(">") >= 0
          ? match[2]
          : (parseInt(match[3], 10) + 1) + ".";

        if (/^\s*(?:[*+-]|\d+\.)\s*\[[x ]\]\s*/.test(match.input)) {
          task = '[ ] ';
        }

        replacements[i] = "\n" + indent + bullet + after + task;
      }
    }

    cm.replaceSelections(replacements);
  };
});


// (function() {
//   'use strict';

//   var listRE = /^(\s*)([*+-]|(\d+)\.)(\s*)/,
//       taskRE = /^\s*(?:[*+-]|\d+\.)\s*\[[x ]\]\s*/,
//       unorderedBullets = '*+-';

//   CodeMirror.commands.newlineAndTask = function(cm) {};

//   CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
//     if (cm.getOption("disableInput")) return CodeMirror.Pass;
//     var ranges = cm.listSelections(), replacements = [];
//     for (var i = 0; i < ranges.length; i++) {
//       var pos = ranges[i].head, match;
//       var inList = cm.getStateAfter(pos.line).list !== false;

//       if (!ranges[i].empty() || !inList || !(match = cm.getLine(pos.line).match(listRE))) {
//         cm.execCommand("newlineAndIndent");
//         return;
//       }

//       if (!match.input.replace(match[0], '').trim()) {
//         //TODO previous list item check
//         pos.ch = 0;
//         cm.replaceRange('', pos, { line: pos.line, ch: match.input.length });
//         return;
//       }

//       var indent = match[1], after = match[4];
//       var bullet = unorderedBullets.indexOf(match[2]) >= 0
//         ? match[2]
//         : (parseInt(match[3], 10) + 1) + ".";

//       replacements[i] = "\n" + indent + bullet + after;
//     }

//     cm.replaceSelections(replacements);
//   };

// }());
