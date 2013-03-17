var assert = require('assert');

// function

function returnNothing() {
	return;
}

assert.equal(returnNothing(), undefined);
assert.equal(returnNothing.__proto__, Function.prototype);


// function with parameter

function square(number) {
	return number * number;
}

assert.equal(square(10), 100);


// if you like inefficiency.

var slow = new Function('a', 'return a * a * a;');

assert.equal(slow(2), 8);


// anonymous function

var squareAnony = function (number) {
	return number * number
};

assert.equal(squareAnony(7), 49);


// named anonymous function to refer itself

var factorial = function fac(n) { //
	return n < 2 ? 1 : n * fac(n - 1);
};

assert.equal(factorial(3), 6);


// this

function func() {
	return this;
}

assert.equal(func(), global);

var foo = {
	method1: function () {
		return this;
	},
	method2: function () {
		function inner() {
			return this;
		}
		return inner();
	},
	method3: function () {
		var _this = this;
		function inner() {
			return _this;
		}
		return inner();
	}
}

assert.equal(foo.method1(), foo);
assert.equal(foo.method2(), global);
assert.equal(foo.method3(), foo);

var Constructor = function () {
	this.x = 10;
}

assert.equal(new Constructor().x, 10);



// function as arguments

function mother(a, fn) {
	return fn(a);
}

function gift(a) {
	return a * 10;
}

assert.equal(mother(10, gift), 100);


// arguments are maintained in an array-like object.

function printArg() {
	var r = [];
	for (var i = 0; i < arguments.length; i++) {
		r.push(arguments[i]);
	}
	return r;
}

assert.deepEqual(printArg('a', 'b', 'c'), [ 'a', 'b', 'c' ]);


// passing arguments through

function passArg() {
	return printArg.apply(this, arguments);
}

assert.deepEqual(passArg('d', 'e', 'f'), [ 'd', 'e', 'f' ]);


// closures are created when the inner function made available to outside of the outer function.

function outer(name) {
	function inner() {
		return name + name + name;
	}
	return inner;
}

assert.equal(outer('abc')(), 'abcabcabc');



// function declaration can be below the call

assert.equal(funcBelow(), 'below');

function funcBelow(){
	return 'below';
}


// functions should be at top level, SO, DO NOT THIS

if (true){
	function doNotThis() {
	}
}


// dump function source

assert.equal(typeof passArg.toString(), 'string');
