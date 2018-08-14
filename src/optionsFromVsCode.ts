'use strict';

function arrayUnique(dirtyArray) {
  var a = dirtyArray.concat();
  for(var i=0; i<a.length; ++i) {
    for(var j=i+1; j<a.length; ++j) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}

export default function(config) {
  let extraLinersVal;
  if (typeof config.html.format.extraLiners === 'string') {
    extraLinersVal = config.html.format.extraLiners
      .split(",")
      .map(s => s.trim());
  } else {
    extraLinersVal = config.html.format.extraLiners;
  }

  let contentUnformattedVal;
  if (typeof config.html.format.contentUnformatted === 'string') {
    contentUnformattedVal = config.html.format.contentUnformatted
      .split(",")
      .map(s => s.trim());
  } else {
    contentUnformattedVal = config.html.format.contentUnformatted;
  }

  const defaultContentUnformatted = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "!doctype",
    "?xml",
    "?php",
    "?=",
    "basefont",
    "isindex"
  ];

  let indentTabs;
  if (config.editor.insertSpaces === true) {
    indentTabs = false;
  } else {
    indentTabs = true;
  }

  const options = {
    indent_with_tabs: indentTabs,
    indent_size: config.editor.tabSize,
    indent_char: " ",
    end_with_newline: config.html.format.endWithNewline,
    extra_liners: extraLinersVal,
    content_unformatted: arrayUnique(defaultContentUnformatted.concat(contentUnformattedVal)),
  };

  return options;
}
