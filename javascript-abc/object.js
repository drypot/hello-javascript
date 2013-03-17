var assert = require('assert');

// null

assert.equal(null + '', 'null');
assert.equal('null' in global, false, 'null is keyword');

assert.equal(undefined + '', 'undefined');
assert.equal('undefined' in global, true, 'undefined is a property of global');


// empty object

var emptyObj = {};

assert.equal(emptyObj.__proto__, Object.prototype);


// object literal

var foo = { a: 10, b: 20 };

assert(foo.a === 10);


// constructor

function Foo(a, b) {
	this.a = a;
	this.b = b;
}

var foo = new Foo(10, 20);

assert.deepEqual(foo, { a: 10, b: 20 });


// properties

var foo = {};

foo.type = 'dot syntax';
foo['date created'] = 'string with space';
foo[''] = 'even an empty string';

assert.deepEqual(foo, {
	type: 'dot syntax',
	'date created': 'string with space',
	'': 'even an empty string'
});


// safely accessing properties

var foo = {};

assert.equal(foo.missed, undefined);
assert.equal(foo.missed || 'default', 'default');

var foo = undefined;

assert.throws(function () { foo.prop; });
assert.equal(foo && foo.prop, undefined);


// TODO: Object.create


// enumerating properties

var foo = { a: 10, b: 20 };
var r = '';

for (var i in foo) {
	r += i;
}

assert.equal(r, 'ab');

assert.deepEqual(Object.keys(foo), [ 'a', 'b' ]);


// method

var foo = {
	f: function () {
		this.a = 10;
	}
};

foo.f();
assert.equal(foo.a, 10);


// method on prototype

var Foo = function () {
}

Foo.prototype.goodDay = function () {
	return 'good day';
}

var foo = new Foo();

assert.equal(foo.goodDay(), 'good day');


// getters, setters

var foo = {
	a: 7,
	get b() {
		return this.a + 1;
	},
	set c(x) {
		this.a = x / 2;
	}
};

assert.equal(foo.a, 7);
assert.equal(foo.b, 8);
//assert.equal(foo.c, undefined);

foo.c = 20;

assert.equal(foo.a, 10);
assert.equal(foo.b, 11);
//assert.equal(foo.c, undefined);


// deleting property

var foo = { a: 10, b: 20 };

delete foo.a;
assert.deepEqual(foo, { b: 20 });

