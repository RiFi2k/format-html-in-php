'use strict';

var beautifyHtml = require('js-beautify').html;

export default function (originalText, htmlOptions) {
  return beautifyHtml(originalText, htmlOptions);
}
