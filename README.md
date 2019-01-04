# Format HTML in PHP

This extensions concept is to provide formatting for HTML code in PHP files. There are no configurations to mess with and I'm even nice enough to do the formatting onBeforeSave so you can still activate another extension to format the actual PHP. This way the formatting getting done on the HTML should run right before the save action which triggers any other registered PHP formatting.

Basically this extension uses all your standard configurations for html formatting, and your standard configurations for format on save, etc. It more or less works exactly how vscode should already work as it pertains to HTML in PHP files.

There are multiple issues and [threads](https://stackoverflow.com/questions/41330707/how-to-format-php-files-with-html-markup-in-visual-studio-code) about this issue and nothing seemed to work for me 100%.

If you have any issues, ideas, feature requests go ahead and [add them here](https://github.com/RiFi2k/format-html-in-php/issues). I'm pretty much down to help, add, or fix anything because I know this is badly needed for a lot of PHP / WordPress devs and I'm sure it keeps a ton of people from switching to VScode.

---

## Using This Extension

There is a default registered keybinding for Ctrl + Alt + F but you can change this if desired through the standard keybindings menu.

If you are within a PHP file I added a right click context menu option to Format HTML in PHP anytime you want.

If you want it to automatically format on save...

1. Turn on format on save either globally or scoped to PHP. (Example below)
2. Go about your day.

**Feel free to have nested HTML in .php files now, it will format as you are expecting.**

---

## Settings

> Note: This extension is not a PHP formatting extension, it only formats the HTML in a PHP file, because of this the action is triggered onBeforeSave. So this means you will need to turn formatOnSave on for it to have any effect. Also you must have a PHP formatting extension enabled so that this extension can piggyback off its save hook.

Here is an example of having having formatting on save turned on for only PHP files, so you can keep the global format on save turned off.

```
"editor.formatOnSave": false,
"[php]": {
"editor.formatOnSave": true
}

```

Here is the list of native vscode settings being used to format HTML in PHP files after you activate this extension. Just change any of these settings and the next time you format your PHP file the new changes should take effect.

```
// Insert spaces when pressing Tab.
"editor.insertSpaces": true,

// The number of spaces a tab is equal to.
"editor.tabSize": 4,

// Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
"editor.formatOnSave": true,

// List of tags, comma separated, where the content shouldn't be reformatted. 'null' defaults to the 'pre' tag.
"html.format.contentUnformatted": "pre,code,textarea",

// End with a newline.
"html.format.endWithNewline": false,

// List of tags, comma separated, that should have an extra newline before them. 'null' defaults to "head, body, /html".
"html.format.extraLiners": "head, body, /html",

// Format and indent {{#foo}} and {{/foo}}.
"html.format.indentHandlebars": false,

// Indent <head> and <body> sections.
"html.format.indentInnerHtml": false,

// Maximum number of line breaks to be preserved in one chunk. Use 'null' for unlimited.
"html.format.maxPreserveNewLines": null,

// Whether existing line breaks before elements should be preserved. Only works before elements, not inside tags or for text.
"html.format.preserveNewLines": true,

// Maximum amount of characters per line (0 = disable).
"html.format.wrapLineLength": 120,
```

---

## Install

Plugin installation is performed in several stages:

* Press <kbd>F1</kbd> and select `Extensions: Install Extensions`.
* Search and choose `format-html-in-php`.

See the [extension installation guide](https://code.visualstudio.com/docs/editor/extension-gallery) for details.

---

## Release Notes

### 1.4.1

* Update README

### 1.4.0

* Fixes [#11](https://github.com/RiFi2k/format-html-in-php/issues/11) Fixes the cursor jumping to the end of the file on formatting.
* Fixes [#8](https://github.com/RiFi2k/format-html-in-php/issues/11) Adding workbench command for Format HTML in PHP.
* Add right click menu option for Format HTML in PHP.
* Add keybind Ctrl + Alt + F to format HTML in a PHP file.

### 1.3.8

* Update code for checking on PHP scoped formatOnSave setting to use native vscode method.

### 1.3.7

* Update README to be more clear about how formatOnSave settings should be configured.

### 1.3.6

* Remove SVGs from README

### 1.3.5

* Fixes [#4](https://github.com/RiFi2k/format-html-in-php/issues/4) Check for formatOnSave being set under the nested setting for just PHP files, and not just checking the main setting.
* Fixes [#5](https://github.com/RiFi2k/format-html-in-php/issues/5) Duplicate of #4

### 1.3.4

* Fixes [#2](https://github.com/RiFi2k/format-html-in-php/issues/2) Forgot about the fact when I switched to the save hook, it would run everytime no matter what. Duh.

### 1.3.2

* Figured out the root cause was some of my defaults which I removed so I was able to add back in all the configurable fields again.

### 1.3.1

* Had to remove a few options which were causing problems formating in certain situations.

### 1.3.0

Being a better neighbor!
* Change from registering as a formatting provider (which languages can only have one active), to doing the work onBeforeSave. This way if users wanted to activate an extension that formatted the actual PHP we can all live in harmony. Most likely a formatting extension like phpcbf is going to register as a format provider so I proactively moved my work out of the way, because I'm always looking out and don't want a user to have to decide "which extension to keep".

### 1.2.0

Major refactor.
* Added the ability for all of the HTML formatting settings as well as the editor settings for tabs vs spaces to be inherited and used by the formatter.
* Gutted all the things that didn't need to be there.
* Fixes [#1](https://github.com/RiFi2k/format-html-in-php/issues/1)

### 1.1.1

Initial release
