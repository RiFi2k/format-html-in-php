'use strict';

import * as get from 'lodash.get';
import * as has from 'lodash.has';
import * as vscode from 'vscode';
import beautifyHtml from './beautifyHtml';
import optionsFromVSCode from './optionsFromVsCode';

class DocumentWatcher {

  private disposable: vscode.Disposable;

  constructor() {
    const subscriptions: vscode.Disposable[] = [];
    subscriptions.push(vscode.workspace.onWillSaveTextDocument(async e => {
      const activeDoc = this.getActiveDoc(vscode.window.activeTextEditor);
      if (activeDoc.languageId === 'php') {
        const editor = vscode.window.activeTextEditor;
        const position = editor.selection.active;
        const newPosition = position.with(position.line, 0);
        console.log(position,newPosition);
        const newSelection = new vscode.Selection(newPosition, newPosition);
        const transformations = this.doPreSaveTransformations(
          e.document,
          e.reason
        );
        e.waitUntil(transformations);
        await transformations;
        editor.selection = newSelection;
      }
    }));
    this.disposable = vscode.Disposable.from.apply(this, subscriptions);
  }

  public dispose() {
    this.disposable.dispose();
  }

  private getActiveDoc(activeEditor) {
    return get(activeEditor, 'document');
  }

  private async doPreSaveTransformations(
    doc: vscode.TextDocument,
    reason: vscode.TextDocumentSaveReason
	): Promise<vscode.TextEdit[]> {
    const config = vscode.workspace.getConfiguration();
    const phpScopedFormat = has(config, '[php]');
    let phpScopedFormatVal = false;
    if (phpScopedFormat === true) {
      const phpScopedObj = get(config, '[php]');
      if (phpScopedObj['editor.formatOnSave'] === true) {
        phpScopedFormatVal = true;
      }
    }
    if (config.editor.formatOnSave === true || phpScopedFormatVal === true) {
      const activeDoc = this.getActiveDoc(vscode.window.activeTextEditor);
      const lastLine = activeDoc.lineAt(activeDoc.lineCount - 1);
      const range = new vscode.Range(
      new vscode.Position(0, 0),
        lastLine.range.end
      );
      return [vscode.TextEdit.replace(
        range,
        beautifyHtml(activeDoc.getText(), optionsFromVSCode(config))
      )];
    }
  }

}

export function activate(formatHtmlInPhp: vscode.ExtensionContext) {
  formatHtmlInPhp.subscriptions.push(new DocumentWatcher());
}
