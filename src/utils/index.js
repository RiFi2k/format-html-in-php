const vscode = require('vscode');
const beautify = require('js-beautify').html;

export function beautifyHtml(originalText, htmlOptions) {
  return beautify(originalText, htmlOptions);
}

export function getActiveEditor() {
  return vscode.window.activeTextEditor;
}

export function getActiveDoc() {
  const editor = getActiveEditor();

  return editor.document.getText();
}

export function getWorkspaceConfig() {
  return vscode.workspace.getConfiguration();
}

export function getCursor() {
  return vscode.editor.selection.active;
}

export function getFullDocRange() {
  const editor = getActiveEditor();

  const last = editor.document.lineAt(editor.document.lineCount - 1);
  const range = new vscode.Range(new vscode.Position(0, 0), last.range.end);

  return range;
}

function arrayUnique(dirtyArray) {
  const a = dirtyArray.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
}

export function getOptions(config) {
  let extraLinersVal;
  if (typeof config.html.format.extraLiners === 'string') {
    extraLinersVal = config.html.format.extraLiners
      .split(',')
      .map(s => s.trim());
  } else {
    extraLinersVal = config.html.format.extraLiners;
  }

  let contentUnformattedVal;
  if (typeof config.html.format.contentUnformatted === 'string') {
    contentUnformattedVal = config.html.format.contentUnformatted
      .split(',')
      .map(s => s.trim());
  } else {
    contentUnformattedVal = config.html.format.contentUnformatted;
  }

  const defaultContentUnformatted = [];

  let indentTabs;
  if (config.editor.insertSpaces === true) {
    indentTabs = false;
  } else {
    indentTabs = true;
  }

  const options = {
    indent_with_tabs: indentTabs,
    indent_size: config.editor.tabSize,
    indent_char: ' ',
    extra_liners: extraLinersVal,
    content_unformatted: arrayUnique(
      defaultContentUnformatted.concat(contentUnformattedVal)
    ),
    indent_handlebars: config.html.format.indentHandlebars,
    indent_inner_html: config.html.format.indentInnerHtml,
    max_preserve_newlines: config.html.format.maxPreserveNewLines,
    preserve_newlines: config.html.format.preserveNewLines,
    wrap_line_length: config.html.format.wrapLineLength,
    wrap_attributes: config.html.format.wrapAttributes,
    indent_scripts: 'keep',
    html: {
      end_with_newline: config.html.format.endWithNewline,
      js: {
        end_with_newline: false
      }
    }
  };

  return options;
}
