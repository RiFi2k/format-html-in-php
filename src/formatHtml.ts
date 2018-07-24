const beautifyHtml = require("js-beautify").html;
const phpEngine = require("php-parser");
const htmlEngine = require("htmlparser2");

function getFormatOption(options, key, dflt) {
  if (options && Object.prototype.hasOwnProperty.call(options, key)) {
    let value = options[key];
    if (value !== null) {
      return value;
    }
  }
  return dflt;
}

function getTagsFormatOption(options, key, dflt) {
  let list = getFormatOption(options, key, null);
  if (typeof list === "string") {
    if (list.length > 0) {
      return list.split(",").map(t => t.trim().toLowerCase());
    }
    return [];
  }
  return dflt;
}

/**
 * Comment PHP Code
 * Ignore php code when formatting html
 *
 * @param {php code} php
 */
function preAction(php) {
  let scriptStyleRanges = getScriptStyleRanges(php);
  let strArr = [];
  let phpParser = new phpEngine({
    parser: {
      extractDoc: true,
      php7: true
    },
    ast: {
      withPositions: true
    }
  });
  let tokens = phpParser.tokenGetAll(php);
  let c = tokens.length;
  let index = 0;
  for (let i = 0; i < c; i++) {
    let t = tokens[i];
    if (inScriptStyleTag(scriptStyleRanges, index)) {
      if (typeof t == "object") {
        if (t[0] == "T_OPEN_TAG" || t[0] == "T_OPEN_TAG_WITH_ECHO") {
          strArr.push("/*%fhip-comment-start#" + t[1]);
        } else if (t[0] == "T_CLOSE_TAG") {
          // fix new line issue
          var ms = t[1].match(/(\S+)(\s+)$/);
          if (ms) {
            strArr.push(ms[1] + "%fhip-comment-end#*/" + ms[2]);
          } else {
            strArr.push(t[1] + "%fhip-comment-end#*/");
          }
        } else {
          if (t[0] == "T_INLINE_HTML") {
            strArr.push(t[1]);
          } else {
            strArr.push(t[1].replace(/\*\//g, "*%comment-end#/"));
          }
        }
        index += t[1].length;
      } else {
        strArr.push(t);
        index += t.length;
      }
    } else {
      if (typeof t == "object") {
        if (t[0] == "T_OPEN_TAG" || t[0] == "T_OPEN_TAG_WITH_ECHO") {
          strArr.push("<!--%fhip-comment-start#" + t[1]);
        } else if (t[0] == "T_CLOSE_TAG") {
          // fix new line issue
          var ms = t[1].match(/(\S+)(\s+)$/);
          if (ms) {
            strArr.push(ms[1] + "%fhip-comment-end#-->" + ms[2]);
          } else {
            strArr.push(t[1] + "%fhip-comment-end#-->");
          }
        } else {
          if (t[0] == "T_INLINE_HTML") {
            strArr.push(t[1]);
          } else {
            strArr.push(t[1].replace(/-->/g, "-%comment-end#->"));
          }
        }
        index += t[1].length;
      } else {
        strArr.push(t);
        index += t.length;
      }
    }
  }
  if (
    typeof tokens[c - 1] == "object" &&
    (tokens[c - 1][0] != "T_CLOSE_TAG" && tokens[c - 1][0] != "T_INLINE_HTML")
  ) {
    strArr.push("?>%fhip-comment-end#-->");
  }
  return strArr.join("");
}

/**
 * Restore commented php code
 *
 * @param {php code} php
 */
function afterAction(php) {
  return php
    .replace(/\?>\s*%fhip-comment-end#-->\s*$/g, "")
    .replace(/%fhip-comment-end#-->/g, "")
    .replace(/<!--%fhip-comment-start#/g, "")
    .replace(/-%comment-end#->/g, "-->")
    .replace(/%fhip-comment-end#\*\//g, "")
    .replace(/\/\*%fhip-comment-start#/g, "")
    .replace(/\*%comment-end#\//g, "-->");
}

/**
 * Get all script/style tag ranges
 *
 * @param {php code} php
 */
function getScriptStyleRanges(php) {
  let ranges = [];
  let start = 0;
  let htmlParser = new htmlEngine.Parser({
    onopentagname: name => {
      if (name === "script" || name === "style") {
        start = htmlParser.startIndex;
      }
    },
    onclosetag: name => {
      if (name === "script" || name === "style") {
        ranges.push([start, htmlParser.endIndex]);
      }
     }
  }, { decodeEntities: true });
  htmlParser.write(php);
  htmlParser.end();
  return ranges;
}

/**
 * Check current index in script/style tag
 *
 * @param {Array} ranges
 * @param {int} index
 */
function inScriptStyleTag(ranges, index) {
  for (let i = 0, c = ranges.length; i < c; i++) {
    if (index > ranges[i][0] && index < ranges[i][1]) {
      return true;
    }
  }
  return false;
}

export default function (text, options) {
  let htmlOptions = {
    indent_size: options.insertSpaces ? options.tabSize : 1,
    indent_char: options.insertSpaces ? " " : "\t",
    wrap_line_length: getFormatOption(options, "wrapLineLength", 120),
    unformatted: getTagsFormatOption(options, "unformatted", [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "menuitem",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
      "!doctype",
      "?xml",
      "?php",
      "?=",
      "basefont",
      "isindex"
    ]),
    content_unformatted: getTagsFormatOption(
      options,
      "contentUnformatted",
      void 0
    ),
    indent_inner_html: getFormatOption(options, "indentInnerHtml", false),
    preserve_newlines: getFormatOption(options, "preserveNewLines", false),
    max_preserve_newlines: getFormatOption(
      options,
      "maxPreserveNewLines",
      void 0
    ),
    indent_handlebars: getFormatOption(options, "indentHandlebars", false),
    end_with_newline: getFormatOption(options, "endWithNewline", false),
    extra_liners: getTagsFormatOption(options, "extraLiners", void 0),
    wrap_attributes: getFormatOption(options, "wrapAttributes", "auto")
  };

  let php = preAction(text);
  return afterAction(beautifyHtml(php, htmlOptions));
}