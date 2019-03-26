'use strict';

import * as _ from "lodash";
import * as vscode from 'vscode';
import beautifyHtml from './beautifyHtml';
import optionsFromVSCode from './optionsFromVsCode';

class DocumentWatcher {

  private disposable: vscode.Disposable;

  constructor() {
    const subscriptions: vscode.Disposable[] = [];
    subscriptions.push(vscode.workspace.onWillSaveTextDocument(event => {
      const editor = vscode.window.activeTextEditor;
      if (editor.document.languageId === 'php') {
        const cursor = editor.selection.active;
        const last = editor.document.lineAt(editor.document.lineCount - 1);
        const range = new vscode.Range(
          new vscode.Position(0, 0),
          last.range.end
        );
        event.waitUntil(this.doPreSaveTransformations(
          event.document,
          event.reason
        ).then((content) => {
          editor.edit(edit => {
            if (content !== '') {
              edit.replace(range, content);
            }
          }).then(success => {
            if (success && content !== '') {
              const origSelection = new vscode.Selection(cursor, cursor);
              editor.selection = origSelection;
            }
          });
        }));
      }
		}));
    this.disposable = vscode.Disposable.from.apply(this, subscriptions);
  }

  public dispose() {
    this.disposable.dispose();
  }

  private async doPreSaveTransformations(
    doc: vscode.TextDocument,
    reason: vscode.TextDocumentSaveReason
  ): Promise<string> {
    const config = vscode.workspace.getConfiguration();
    const phpScopedFormat = _.has(config, '[php]');
    let phpScopedFormatVal = false;
    if (phpScopedFormat) {
      const phpScopedObj = _.get(config, '[php]');
      if (phpScopedObj['editor.formatOnSave']) {
        phpScopedFormatVal = true;
      }
    }
    if (config.editor.formatOnSave === true || phpScopedFormatVal === true) {
      const html = vscode.window.activeTextEditor.document.getText();
			const options = optionsFromVSCode(config);
      return beautifyHtml(html, options);
    }
    return '';
  }

}

export function activate(formatHtmlInPhp: vscode.ExtensionContext) {
  const docWatch = new DocumentWatcher();
  formatHtmlInPhp.subscriptions.push(docWatch);
  formatHtmlInPhp.subscriptions.push(vscode.commands.registerCommand('formatHtmlInPhp.format', () => {
    const editor = vscode.window.activeTextEditor;
    const config = vscode.workspace.getConfiguration();
    const cursor = editor.selection.active;
    const last = editor.document.lineAt(editor.document.lineCount - 1);
    const range = new vscode.Range(
      new vscode.Position(0, 0),
      last.range.end
    );
    const html = vscode.window.activeTextEditor.document.getText();
    const options = optionsFromVSCode(config);
    const formattedHtml = beautifyHtml(html, options);
    editor.edit(edit => {
      edit.replace(range, formattedHtml);
    }).then(success => {
      if (success) {
        const origSelection = new vscode.Selection(cursor, cursor);
        editor.selection = origSelection;
      }
    });
  }));
}
