# doc #

Runtime documentation tool for REPL.

## Usage ##

Have you ever wished you could see docs for the given function right out of
the REPL? If so, this tool is for you!

```js
var doc = require('doc').doc
doc(doc) // Prints following output:

/*
function doc(source) { ... }
-----------------------------------------------
Prints documentanion of the given function
*/

// You can also document your own functions:

function compose() {
  doc: "Returns the composition of a list of functions, where each function"
     | "consumes the return value of the function that follows. In math"
     | "terms, composing the functions `f()`, `g()`, and `h()` produces"
     | "`f(g(h()))`."
     | "Usage:"
     | "var greet = function(name) { return 'hi: ' + name }"
     | "var exclaim = function(statement) { return statement + '!' }"
     | "var welcome = compose(exclaim, greet)"
     | "welcome('moe')"
     | "//> 'hi: moe!'"

  var funcs = Array.prototype.slice.call(arguments)
  return function composed() {
    var args = slice.call(arguments)
    var i = funcs.length
    while (0 <= --i) args = [ funcs[i].apply(this, args) ]
    return args[0]
  }
}

doc(compose) // Prints following output:

/*
function compose() { ... }
-----------------------------------------------
Returns the composition of a list of functions, where each function
consumes the return value of the function that follows. In math
terms, composing the functions `f()`, `g()`, and `h()` produces
`f(g(h()))`.
Usage:
var greet = function(name) { return 'hi: ' + name }
var exclaim = function(statement) { return statement + '!' }
var welcome = compose(exclaim, greet)
welcome('moe')
//> 'hi: moe!'
*/

// Alternative way to documenting functions (Not cross platform though):

function sum(a, b) {
  /**
  Takes arbitary number of arguments and returns their sum.
  Usage:
  sum(7, 2, 8) //> 17
  **/

  var count = arguments.length, index = 0, value = 0
  while (index < count) value += arguments[index++]
  return value
}

doc(sum) // Prints following output:

/*
function sum(a, b) { ... }
-----------------------------------------------
Takes arbitary number of arguments and returns their sum.
Usage:
sum(7, 2, 8) //> 17
*/

```

## Install ##

    npm install doc
