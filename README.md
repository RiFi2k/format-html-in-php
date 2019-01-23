# Format HTML in PHP

This extension provides formatting for the HTML code in PHP files. This way this works is this extension runs right before the save action which triggers any other registered PHP formatting extensions so you are free to have one and this will not get in the way or block it.

This extension uses all your standard configurations from VSCode for HTML formatting, and your configurations for format on save.

There are multiple issues and threads about not being able to have multiple formatters per language, not being able to format the HTML in PHP files and none of the solutions seemed to work for me 100% so I decided to just figure it out and make my own solution.

> If you have any issues, ideas, feature requests go ahead and [add them here](https://github.com/RiFi2k/format-html-in-php/issues). I'm pretty much down to help, add, or fix anything because I know this is badly needed for a lot of PHP / WordPress devs and was a major annoyance for me and kept most of our WP devs from switching to VSCode until now.

**Feel free to have nested HTML in .php files now, it will format as you are expecting.**

---

## Using This Extension

### Keybinding

**CTRL + ALT + F**

> You can change this if desired through the standard Keyboard Shortcuts (*File > Preferences > Keyboard Shortcuts*) option screen the name is "Format HTML in PHP".

### Context Menu

Within a PHP file you can right click and there is a menu option to Format HTML in PHP.

### Format On Save

Turn on format on save either globally or scoped to PHP.

```json
"editor.formatOnSave": false,
"[php]": {
  "editor.formatOnSave": true
}

```

### HTML Settings

Here is the list of native vscode settings I pass to JS Beautify which control how your HTML will be formatted.

```json
"editor.insertSpaces": true,
"editor.tabSize": 4,
"html.format.contentUnformatted": "pre,code,textarea",
"html.format.endWithNewline": false,
"html.format.extraLiners": "head, body, /html",
"html.format.indentHandlebars": false,
"html.format.indentInnerHtml": false,
"html.format.maxPreserveNewLines": null,
"html.format.preserveNewLines": true,
"html.format.wrapLineLength": 120,
"html.format.wrapAttributes": "auto",
```

---

## Install

See the [extension installation guide](https://code.visualstudio.com/docs/editor/extension-gallery) for details.

---

## Release Notes

### 1.5.0

* Updating to the new JS Beautify version. If anyone notices any issues let me know!
* Upstream fixes [#14](https://github.com/RiFi2k/format-html-in-php/issues/14) - Don't format <?php tags

### 1.4.4

* Add HTML wrap attributes option.
* README and instructions overhaul.

### 1.4.3

* **Hotfix** - Saving a file without format on save enabled would replace all the code in the file with absolutly nothing. Oops...

### 1.4.1

* Update README

### 1.4.0

* Fixes [#11](https://github.com/RiFi2k/format-html-in-php/issues/11) - Fixes the cursor jumping to the end of the file on formatting.
* Fixes [#8](https://github.com/RiFi2k/format-html-in-php/issues/11) - Adding workbench command for Format HTML in PHP.
* Add right click menu option for Format HTML in PHP.
* Add keybind Ctrl + Alt + F to format HTML in a PHP file.

### 1.3.8

* Update code for checking on PHP scoped formatOnSave setting to use native vscode method.

### 1.3.7

* Update README to be more clear about how formatOnSave settings should be configured.

### 1.3.6

* Remove SVGs from README

### 1.3.5

* Fixes [#4](https://github.com/RiFi2k/format-html-in-php/issues/4) - Check for formatOnSave being set under the nested setting for just PHP files, and not just checking the main setting.
* Fixes [#5](https://github.com/RiFi2k/format-html-in-php/issues/5) - Duplicate of #4

### 1.3.4

* Fixes [#2](https://github.com/RiFi2k/format-html-in-php/issues/2) - Forgot about the fact when I switched to the save hook, it would run everytime no matter what. Duh.

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
