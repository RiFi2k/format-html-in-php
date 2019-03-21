<h1 align="center">Format HTML in PHP</h1>

<h4 align="center">Formatting for the HTML code in PHP files.</h4>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=rifi2k.format-html-in-php"><img src="https://vsmarketplacebadge.apphb.com/version-short/rifi2k.format-html-in-php.svg?label=Format%20HTML%20in%20PHP" alt="Marketplace Badge"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=rifi2k.format-html-in-php"><img src="https://vsmarketplacebadge.apphb.com/installs-short/rifi2k.format-html-in-php.svg?label=Installs" alt="Marketplace Badge"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=rifi2k.format-html-in-php"><img src="https://vsmarketplacebadge.apphb.com/rating-star/rifi2k.format-html-in-php.svg?label=Rating" alt="Marketplace Badge"></a>
</p>

This extension provides formatting for the HTML code in PHP files. This way this works is this extension runs right before the save action which triggers any other registered PHP formatting extensions so you are free to have one and this will not get in the way or block it.

![Demo](https://github.com/RiFi2k/format-html-in-php/blob/master/format-html-in-php.gif?raw=true)

**Supported Features**
* Uses VSCode configurations for HTML formatting
* Uses VSCode format on save setting
* Custom keybinding for anytime formatting
* Right click context menu option on PHP files
* Command Palette option for formatting

There are multiple issues and Stackoverflow posts about not being able to format the HTML in PHP files and none of the solutions proposed anywhere really worked 100% so I decided to fix it.

> Issues, Ideas, Feature Requests? Go ahead and [add them](https://github.com/RiFi2k/format-html-in-php/issues). I'm down to help, add, or fix anything because I know this is badly needed for a lot of PHP / WordPress devs and was a major annoyance for me.

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

Here is the list of native vscode settings I pass to JS Beautify which control how your HTML will be formatted. You can change any of these to configure how the HTML will be formatted.

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

### 1.5.3

* JS Beautify to stable 1.9.0

### 1.5.2

* Documentation update about HTML settings - [#17](https://github.com/RiFi2k/format-html-in-php/issues/17)
* JS Beautify bump to latest beta

### 1.5.0

* Updating to the new JS Beautify version. If anyone notices any issues let me know!
* Upstream fixes [#14](https://github.com/RiFi2k/format-html-in-php/issues/14) - Don't format <?php tags

### 1.4.6

* Don't add empty newline inside HTML script tags when html.format.endWithNewline is true.

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
