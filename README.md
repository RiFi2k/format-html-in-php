# Format HTML in PHP
This extensions concept is to provide formatting for HTML code in PHP files. There are no configurations to mess with and everything ties into the native formatter API.

Basically this extension uses all your standard configurations for html formatting, and your standard configurations for format on save, etc. It more or less works exactly how vscode should already work as it pertains to HTML in PHP files.

There are multiple issues and [long standing threads]("https://stackoverflow.com/questions/41330707/how-to-format-php-files-with-html-markup-in-visual-studio-code") about this issue and nothing seemed to work for me 100% no matter if I wanted to use PHPCBF, or any other random formatter for PHP.

## Install

Plugin installation is performed in several stages:

  * Press <kbd>F1</kbd> and select `Extensions: Install Extensions`.
  * Search and choose `format-html-in-php`.

See the [extension installation guide](https://code.visualstudio.com/docs/editor/extension-gallery) for details.

## Usage

Just activate the plugin and go about your day. Feel free to have nested HTML in .php files now, it will format as you are expecting.

## Default Settings

Note: All `html.format`, detect indentation, editor format, settings apply but you may want to tweak these...

#### html.format.enable

  * Type: `bool`
  * Default: `true`

Enable/disable default HTML formatter.

#### html.format.wrapLineLength

  * Type: `number`
  * Default: `120`

Maximum amount of characters per line (0 = disable).

#### editor.formatOnSave

  * Type: `bool`
  * Default: `false`

Format on save, if you want it turn it on.

