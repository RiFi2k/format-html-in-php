"use strict";
const vscode = require("vscode");
const editorconfig = require("editorconfig");

function optionsFromVSCode(doc, formattingOptions, type) {
  const config = vscode.workspace.getConfiguration();
  if (!formattingOptions) {
    formattingOptions = vscode.workspace.getConfiguration("editor");
    //if this document is open, use the settings from that window
    vscode.window.visibleTextEditors.some(editor => {
      if (editor.document && editor.document.fileName === doc.fileName) {
        return (formattingOptions = editor.options);
      }
    });
  }
  let extraLinersVal;
  if (typeof config.html.format.extra_liners === "string") {
    extraLinersVal = config.html.format.extraLiners
      .split(",")
      .map(s => s.trim());
  } else {
    extraLinersVal = config.html.format.extra_liners;
  }
  let unformattedVal;
  if (typeof config.html.format.unformatted === "string") {
    unformattedVal = config.html.format.unformatted
      .split(",")
      .map(s => s.trim());
  } else {
    unformattedVal = config.html.format.unformatted;
  }
  const options = {
    indent_with_tabs:
      formattingOptions.insertSpaces === undefined
        ? true
        : !formattingOptions.insertSpaces,
    indent_size: formattingOptions.tabSize,
    indent_char: " ",
    end_with_newline: config.html.format.endWithNewline,
    eol: config.files.eol,
    extra_liners: extraLinersVal,
    space_after_anon_function:
      config.javascript.format
        .insertSpaceAfterFunctionKeywordForAnonymousFunctions,
    space_in_paren:
      config.javascript.format
        .insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis,
    indent_handlebars: config.html.format.indentHandlebars,
    indent_inner_html: config.html.format.indentInnerHtml,
    max_preserve_newlines: config.html.format.maxPreserveNewLines,
    preserve_newlines: config.html.format.preserveNewLines,
    wrap_line_length: config.html.format.wrapLineLength,
    unformatted: unformattedVal
  };
  return options;
}

/* set_file_editorconfig_opts directly from js-beautify/lib/cli.js */
function set_file_editorconfig_opts(file, config) {
  try {
    const eConfigs = editorconfig.parseSync(file);
    if (eConfigs.indent_style === "tab") {
      config.indent_with_tabs = true;
    } else if (eConfigs.indent_style === "space") {
      config.indent_with_tabs = false;
      config.indent_char = " ";
    }

    if (eConfigs.indent_size) {
      config.indent_size = eConfigs.indent_size;
    }

    if (eConfigs.max_line_length) {
      if (eConfigs.max_line_length === "off") {
        config.wrap_line_length = 0;
      } else {
        config.wrap_line_length = parseInt(eConfigs.max_line_length);
      }
    }

    if (eConfigs.insert_final_newline === true) {
      config.end_with_newline = true;
    } else if (eConfigs.insert_final_newline === false) {
      config.end_with_newline = false;
    }

    if (eConfigs.end_of_line) {
      if (eConfigs.end_of_line === "cr") {
        config.eol = "\r";
      } else if (eConfigs.end_of_line === "lf") {
        config.eol = "\n";
      } else if (eConfigs.end_of_line === "crlf") {
        config.eol = "\r\n";
      }
    }
  } catch (e) {}
}

export default function(doc, formattingOptions) {
  let opts = optionsFromVSCode(doc, formattingOptions, "html");
  set_file_editorconfig_opts(doc.fileName, opts);
  return opts;
}
