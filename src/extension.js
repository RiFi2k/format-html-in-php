import { get, has } from 'lodash';
import {
  beautifyHtml,
  getActiveDoc,
  getActiveEditor,
  getCursor,
  getFullDocRange,
  getOptions,
  getWorkspaceConfig
} from './utils';

const vscode = require('vscode');

function activate(context) {
  const onDemandFormat = vscode.commands.registerCommand('context.format', () =>
    formatOnDemand()
  );
  context.subscriptions.push(onDemandFormat);

  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(event => {
      const editor = getActiveEditor();
      if (editor.document.languageId === 'php') {
        const cursor = getCursor();
        const range = getFullDocRange();

        event.waitUntil(
          doPreSave(event.document, event.reason).then(content => {
            editor
              .edit(edit => {
                if (content !== '') {
                  edit.replace(range, content);
                }
              })
              .then(success => {
                if (success && content !== '') {
                  const origSelection = new vscode.Selection(cursor, cursor);
                  editor.selection = origSelection;
                }
              });
          })
        );
      }
    })
  );
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

function formatOnDemand() {
  const editor = getActiveEditor();
  console.log(editor);
  const config = getWorkspaceConfig();
  const html = getActiveDoc();
  const options = getOptions(config);
  const cursor = getCursor();
  const range = getFullDocRange();
  const formattedHtml = beautifyHtml(html, options);
  editor
    .edit(edit => {
      edit.replace(range, formattedHtml);
    })
    .then(success => {
      if (success) {
        const origSelection = new vscode.Selection(cursor, cursor);
        editor.selection = origSelection;
      }
    });
}

function doPreSave(doc, reason) {
  const config = getWorkspaceConfig();
  console.log(config);
  const phpScopedFormat = has(config, '[php]');
  let phpScopedFormatVal = false;

  if (phpScopedFormat) {
    const phpScopedObj = get(config, '[php]');

    if (phpScopedObj['editor.formatOnSave']) {
      phpScopedFormatVal = true;
    }
  }

  if (config.editor.formatOnSave !== true || phpScopedFormatVal !== true) {
    return '';
  }

  const html = getActiveDoc();
  const options = getOptions(config);
  return beautifyHtml(html, options);
}
