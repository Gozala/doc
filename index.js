/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

!(typeof(define) !== "function" ? function($) { $(typeof(require) !== 'function' ? (function() { throw Error('require unsupported'); }) : require, typeof(exports) === 'undefined' ? this : exports, typeof(module) === 'undefined' ? {} : module); } : define)(function(require, exports, module) {

"use strict";

function extractDocs(source, value) {
  doc: "Extracts documentation from the give `source` function"

  var docs
  value = value || ''

  if (!source) return value
  if (typeof(source.doc) === 'function') return extractDocs(source.doc)
  if (typeof(source.doc) === 'string') return source.doc

  if ((docs = /doc\:\s*([\s\S]*?)(\n(?!(\s*\|)))/.exec(String(source)))) {
    value = !docs[1] ? value : docs[1].split(/\n\s*\||\|/g).map(function($) {
      return $.replace(/^\s*['|"]([\s\S]*?)['|"]\s*;*$/, "$1") || $
    }).join('\n')
  } else if ((docs = /\{\s*\/\*\*\n*([\s\S]*)?\*\*\//.exec(String(source)))) {
    var indent = /^\s*/.exec(docs[1])[0].length
    value = docs[1].split('\n').map(function($) {
      return $.substr(indent)
    }).join('\n')
  }

  return value
}

function extractArgs(source) {
  doc: "Extracts documentanion from the given `source` function"

  var declaration, names, arity = source.length, index = 0

  declaration = /\(([\s\S]*?)\)/.exec(source)[1].trim()
  names = declaration ? declaration.split(/\s*,\s*/) : []

  while (++index <= arity) names[index - 1] = names[index - 1] || '$' + index

  return names
}

function doc(source) {
  doc: "Prints documentanion of the given function"

  var docs = extractDocs(source)
  var args = extractArgs(source)
  var name = source.displayName || source.name

  console.log([
    '\n',
    'function ',
    name,
    '(' + args.join(', ') + ')',
    ' { ... }',
    docs ? '\n-----------------------------------------------\n' + docs : docs,
    '\n'
  ].join(''))
}

exports.doc = doc
exports.docAsString = extractDocs
exports.docArgsAsArray = extractArgs

});
