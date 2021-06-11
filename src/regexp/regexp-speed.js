
console.time('a');
for (var i = 0; i < 1000000; i++) {
	'a&b&c&d&f'.replace(/&/g, '&amp;');
}
console.timeEnd('a');

console.time('a');
var ampRe = /&/g;
for (var i = 0; i < 1000000; i++) {
	'a&b&c&d&f'.replace(ampRe, '&amp;');
}
console.timeEnd('a');

