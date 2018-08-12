"use strict";

import * as vscode from "vscode";
const beautifyHtml = require("js-beautify").html;

function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}

function optionsFromVSCode() {
  const config = vscode.workspace.getConfiguration();
  const editorOpts = vscode.workspace.getConfiguration("editor");

  let extraLinersVal;
  if (typeof config.html.format.extraLiners === "string") {
    extraLinersVal = config.html.format.extraLiners
      .split(",")
      .map(s => s.trim());
  } else {
    extraLinersVal = config.html.format.extraLiners;
  }

  let contentUnformattedVal;
  if (typeof config.html.format.contentUnformatted === "string") {
    contentUnformattedVal = config.html.format.contentUnformatted
      .split(",")
      .map(s => s.trim());
  } else {
    contentUnformattedVal = config.html.format.contentUnformatted;
  }

  const defaultContentUnformatted = [
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
  ];

  let indentTabs;
  if (editorOpts.insertSpaces === true) {
    indentTabs = false;
  } else {
    indentTabs = true;
  }

  const options = {
    indent_with_tabs: indentTabs,
    indent_size: editorOpts.tabSize,
    indent_char: " ",
    end_with_newline: config.html.format.endWithNewline,
    extra_liners: extraLinersVal,
    indent_handlebars: config.html.format.indentHandlebars,
    indent_inner_html: config.html.format.indentInnerHtml,
    max_preserve_newlines: config.html.format.maxPreserveNewLines,
    preserve_newlines: config.html.format.preserveNewLines,
    wrap_line_length: config.html.format.wrapLineLength,
    wrap_attributes: "auto",
    content_unformatted: arrayUnique(defaultContentUnformatted.concat(contentUnformattedVal)),
  };

  return options;
}

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider(
    { scheme: "file", language: "php" },
    {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument
      ): vscode.TextEdit[] {
        const originalText = document.getText();
        const lastLine = document.lineAt(document.lineCount - 1);
        const range = new vscode.Range(
          new vscode.Position(0, 0),
          lastLine.range.end
        );
        const htmlOptions = optionsFromVSCode();
        const modifiedText = beautifyHtml(originalText, htmlOptions);
        return [vscode.TextEdit.replace(range, modifiedText)];
      }
    }
  );
}
