var assert = require('assert');


// creating

var re = /abc/; // compiled when the script is evaluated
var re = new RegExp("abc");


// flag

var re = /abc/g; // global
var re = /abc/m; // multi line
var re = /abc/i; // ignore case


// regexp methods

assert.equal(/y/.test('xyz'), true);
assert.equal(/c/.test('xyz'), false);

var re = /(1+)(2+)/g;
var str = 'x12y1122z';

assert.deepEqual(re.exec(str), { 0: '12', 1: '1', 2: '2', index: 1, input: 'x12y1122z' });
assert.equal(re.lastIndex, 3);

assert.deepEqual(re.exec(str), { 0: '1122', 1: '11', 2: '22', index: 4, input: 'x12y1122z' });
assert.equal(re.lastIndex, 8);

assert.deepEqual(re.exec(str), null);
assert.equal(re.lastIndex, 0);

assert.deepEqual(re.exec(str), { 0: '12', 1: '1', 2: '2', index: 1, input: 'x12y1122z' });
assert.equal(re.lastIndex, 3);


// string

assert.equal('abcd'.search(/cd/), 2);
assert.equal('xxxx'.search(/cd/), -1);

assert.deepEqual('xxcdexxcde'.match(/c(d)(e)/), { 0: 'cde', 1: 'd', 2: 'e', index: 2, input: 'xxcdexxcde' });
assert.deepEqual('xxcdexxcde'.match(/c(d)(e)/g), [ 'cde', 'cde' ]);
assert.deepEqual('xxcdexxcde'.match(/cdexx/g), [ 'cdexx' ]);
assert.deepEqual('xxcdexxcde'.match(/zzz/g), null);

assert.equal('xxyyxxyx'.replace(/y+/, 'Y'), 'xxYxxyx');
assert.equal('xxyyxxyx'.replace(/y+/g, 'Y'), 'xxYxxYx');

assert.equal('aabbcc'.replace(/b+/, '$$'), 'aa$cc'); // insert $
assert.equal('aabbcc'.replace(/b+/, '$&'), 'aabbcc'); // insert matched
assert.equal('aabbcc'.replace(/b+/, '$`'), 'aaaacc'); // insert preceding
assert.equal('aabbcc'.replace(/b+/, '$\''), 'aacccc'); // insert following
assert.equal('aa12cc'.replace(/(1)(2)/, '$2$1'), 'aa21cc'); // insert remembered

assert.equal('backgroundColor'.replace(/[A-Z]/g, function (match) {
	return '-' + match.toLowerCase();
}), 'background-color');

'backgroundColor'.replace(/(ground)(C)/g, function (match, p1, p2, offset, str) {
	assert.equal(match, 'groundC');
	assert.equal(p1, 'ground');
	assert.equal(p2, 'C');
	assert.equal(offset, 4);
	assert.equal(str, 'backgroundColor');
});

assert.deepEqual('xxyyzz'.split(/y+/), [ 'xx', 'zz' ]);


// pattern

//	/abc/ :
//
//	\ : special -> not special, not special -> special
//
//	^ : beginning of input, immediately after a line break.
//
//	$ : end of input, immediately before a line break.
//
//	x* : 0 or more times of x.
//
//	x+ : 1 or more times of x.
//
//	x? : 0 or 1 time of x.
//
//	x{n} : exactly n occurrences of x.
//
//	x{n,m} :
//
//	. : any single character except the newline.
//
//	(x) : matche x and remember it.
//
//	(?:x) : matche x but do not remember.
//
//	x(?=y) : lookahead. matche x only if x is followed by y.
//
//	x(?!y) : negated lookahead.
//
//	x|y : x or y
//
//	[abc] : any enclosed character. special characters do not have any special meaning.
//
//	[a-d] : [abcd]
//
//	[^abc] : negated
//
//	[\b] : backspace
//
//	\b : word boundary
//
//	\B : not \b
//
//	\cX : control character, A~Z
//
//	\d : [0-9]
//
//	\D : [~0-9]
//
//	\f :
//
//	\n :
//
//	\r :
//
//	\s : [ \f\n\r\t\v]
//
//	\S : [^ \f\n\r\t\v]
//
//	\t :
//
//	\v :
//
//	\w : [A-Za-z0-9_]
//
//	\W : [^A-Za-z0-9_]
//
//	...(x)...\1... : back reference
//
//	\0 : \u0000
//
//	\0377 : octal
//
//	\xAF :
//
//	\u0041 :