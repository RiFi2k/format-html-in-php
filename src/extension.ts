'use strict';

import * as vscode from 'vscode';
import beautifyHtml from './beautifyHtml';
import optionsFromVSCode from './optionsFromVsCode';

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider(
    {
      scheme: 'file',
      language: 'php'
    },
    {
      provideDocumentFormattingEdits(
        document: vscode.TextDocument
      ): vscode.TextEdit[] {
        const config = vscode.workspace.getConfiguration();
        const lastLine = document.lineAt(document.lineCount - 1);
        const range = new vscode.Range(
          new vscode.Position(0, 0),
          lastLine.range.end
        );
        return [vscode.TextEdit.replace(
          range,
          beautifyHtml(document.getText(), optionsFromVSCode(config))
        )];
      }
    }
  );
}
