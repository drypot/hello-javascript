var assert = require('assert');

// null

assert.equal(null + '', 'null');
assert.equal('null' in global, false, 'null is keyword');

assert.equal(undefined + '', 'undefined');
assert.equal('undefined' in global, true, 'undefined is a property of global');


// empty object

var emptyObj = {};


// object literal

var foo = { a: 10, b: 20 };

assert(foo.a === 10);


// constructor

function Pair(a, b) {
	this.a = a;
	this.b = b;
}

var pair = new Pair(10, 20);

assert.deepEqual(pair, { a: 10, b: 20 });


// Object.create

// DO NOT USE, very slow on Chrome ~26.
// http://jsperf.com/create-new/2


// prototype

var emptyObj = {};

assert.equal(emptyObj.__proto__, Object.prototype);


function Super() {
	this.superX = 'super';
}

function Sub() {
	this.subX = 'sub';
}

Sub.prototype = new Super();


var su = new Super();
var sub = new Sub();

assert.notEqual(su.__proto__, Object.prototype);
assert.equal(sub.__proto__, Sub.prototype);

assert.ok(sub instanceof Sub);
assert.ok(sub instanceof Super);

assert.equal(sub.subX, 'sub');
assert.equal(sub.superX, 'super');

// prototype link is used only in retrieval.

sub.superX = 'sub';

assert.equal(sub.superX, 'sub');
assert.equal(sub.__proto__.superX, 'super');


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


// enumerating properties

var sub = new Sub();

var r = [];

for (var p in sub) {
	r.push(p);
}

assert.deepEqual(r, [ 'subX', 'superX' ]);


// enumerating own properties

var r = [];

for (var p in sub) {
	if (sub.hasOwnProperty(p)) {
		r.push(p);
	}
}

assert.deepEqual(r, [ 'subX' ]);

assert.deepEqual(Object.keys(sub), [ 'subX' ]);


// enumerating properties selectively

var obj = { a: 10, b: 20, c: 30 };
var pl = [ 'b', 'c' ];
var r = [];

for (var i = 0; i < pl.length; i ++) {
	r.push(pl[i]);
	r.push(obj[pl[i]]);
}

assert.deepEqual(r, [ 'b', 20, 'c', 30 ]);


// method on object local

var foo = {
	f: function () {
		this.a = 10;
	}
};

foo.f();
assert.equal(foo.a, 10);


// method on prototype

var Foo = function (name) {
	this.name = name;
}

Foo.prototype.goodDay = function () {
	return this.name + ', good day';
}

var foo = new Foo('dave');

assert.equal(foo.goodDay(), 'dave, good day');


// getters, setters

var foo = {
	a: 5,
	get b() {
		return this.a + 1;
	},
	set c(x) {
		this.a = x / 2;
	}
};

assert.equal(foo.a, 5);
assert.equal(foo.b, 6);
//assert.equal(foo.c, undefined);

foo.c = 20;

assert.equal(foo.a, 10);
assert.equal(foo.b, 11);
//assert.equal(foo.c, undefined);


// deleting property

var foo = { a: 10, b: 20 };

delete foo.a;
assert.deepEqual(foo, { b: 20 });



// http://ejohn.org/blog/simple-javascript-inheritance/

(function () {

	var initializing = false,
		superPattern = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

	Object.subClass = function (properties) {
		var _super = this.prototype;

		initializing = true;
		var proto = new this();
		initializing = false;

		for (var name in properties) {
			proto[name] = typeof properties[name] == "function" &&
				typeof _super[name] == "function" &&
				superPattern.test(properties[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, properties[name]) :
				properties[name];
		}

		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		Class.prototype = proto;
		Class.constructor = Class;
		Class.subClass = arguments.callee;
		return Class;
	}
})();

// TODO: 셈플 코드
