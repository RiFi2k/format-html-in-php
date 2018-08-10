"use strict";

import * as vscode from "vscode";
import formatHtml from "./formatHtml";

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
        let options = {};
        const htmlOptions = Object.assign(
          options,
          vscode.workspace.getConfiguration("html").get("format")
        );
        const modifiedText = formatHtml(originalText, htmlOptions);
        return [vscode.TextEdit.replace(range, modifiedText)];
      }
    }
  );
}
