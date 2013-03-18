var assert = require('assert');

// null

assert.equal(null + '', 'null');
assert.equal('null' in global, false, 'null is keyword');

assert.equal(undefined + '', 'undefined');
assert.equal('undefined' in global, true, 'undefined is a property of global');


// empty object

var emptyObj = {};


// creating object with literal

var obj = {
	x: 10,
	getX: function () {
		return this.x + 1;
	}
};

assert.equal(obj.x, 10);
assert.equal(obj.getX(), 11);


// creating object with constructor

function Obj() {
	this.x = 20;
}

Obj.prototype.getX = function () {
	return this.x + 1;
};

var obj = new Obj();

assert.equal(obj.x, 20);
assert.equal(obj.getX(), 21);


// creating object with closure

var obj = (function () {
	var x = 30;

	return {
		getX: function () { // 당연하게도 클로져를 만들려면 내부 함수 정의를 외부 함수 안에 노출해야 한다.
			return x + 1;   // getX: globalGetX, 식으로 안 된다는 말.
		}                   // 그러므로 오브젝트를 생성할 때마다 클로져 붙은 함수 오브젝트도 생성해야 한다.
	}
})();

//assert.equal(obj.x, 20); // throws Error
assert.equal(obj.getX(), 31);


// creating object with Object.create

// very slow on Chrome ~26.
// http://jsperf.com/create-new/2


// prototype

var emptyObj = {};

assert.equal(emptyObj.__proto__, Object.prototype);


var su = {
	a: 10,
	b: 20
};

var sub = {
	b: 30,
	__proto__: su
};

assert.equal(sub.a, 10);
assert.equal(sub.b, 30);

sub.a = 50;

assert.equal(sub.a, 50);
assert.equal(su.a, 10);


// prototype with constructor

function Super() {
	this.superX = 'super';
}

function Sub() {
	this.subX = 'sub';
}

Sub.prototype = new Super();

var su = new Super();
var sub = new Sub();

assert.equal(sub.__proto__, Sub.prototype);

assert.ok(sub instanceof Sub);
assert.ok(sub instanceof Super);


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
