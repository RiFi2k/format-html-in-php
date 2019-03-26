'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const beautifyHtml_1 = require("./beautifyHtml");
const optionsFromVsCode_1 = require("./optionsFromVsCode");
    ==
        class DocumentWatcher {
            constructor() {
                const subscriptions = [];
                subscriptions.push(vscode.workspace.onWillSaveTextDocument(event => {
                    const editor = vscode.window.activeTextEditor;
                    if (editor.document.languageId === 'php') {
                        const cursor = editor.selection.active;
                        const last = editor.document.lineAt(editor.document.lineCount - 1);
                        const range = new vscode.Range(new vscode.Position(0, 0), last.range.end);
                        event.waitUntil(this.doPreSaveTransformations(event.document, event.reason).then((content) => {
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
            dispose() {
                this.disposable.dispose();
            }
            doPreSaveTransformations(doc, reason) {
                return __awaiter(this, void 0, void 0, function* () {
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
                        const options = optionsFromVsCode_1.default(config);
                        return beautifyHtml_1.default(html, options);
                    }
                    return '';
                });
            }
        };
function activate(formatHtmlInPhp) {
    const docWatch = new DocumentWatcher();
    formatHtmlInPhp.subscriptions.push(docWatch);
    formatHtmlInPhp.subscriptions.push(vscode.commands.registerCommand('formatHtmlInPhp.format', () => {
        const editor = vscode.window.activeTextEditor;
        const config = vscode.workspace.getConfiguration();
        const cursor = editor.selection.active;
        const last = editor.document.lineAt(editor.document.lineCount - 1);
        const range = new vscode.Range(new vscode.Position(0, 0), last.range.end);
        const html = vscode.window.activeTextEditor.document.getText();
        const options = optionsFromVsCode_1.default(config);
        const formattedHtml = beautifyHtml_1.default(html, options);
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
exports.activate = activate;
//# sourceMappingURL=extension.js.map