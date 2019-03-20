# Change Log

All notable changes to the "format-html-in-php" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Refactor

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
