
// string literal

console.log('abc'); // 'abc', all characters in JavaScript are 16 bits wide.
console.log("abc");

console.log('  \"  \'  \\   \/   \b   \f   \n   \r   \t  \377 \xA9 \u00A9  ');

console.log('this string \
is broken \
across multiple\
lines.');

console.log('The answer is ' + 42); // 'The answer is 42'
console.log(42 + ' is the answer'); // '42 is the answer'

console.log('37' - 7);  // 30
console.log('37' + 7);  // '377'


// string object

console.log(new String('abc')); // { '0': 'a', '1': 'b', '2': 'c' }

console.log('seven'.length); // 5, string literal automatically converted to a temporary String object.

console.log('abc'.charAt(1));         // 'b'
console.log('abc'.charCodeAt(1));     // 98
console.log(String.fromCharCode(98)); // 'b'

console.log('ababab'.indexOf('ba'));     // 1
console.log('ababab'.indexOf('x'));      // -1
console.log('ababab'.lastIndexOf('ba')); // 3

console.log('ab'.concat('cd', 'ef')); // 'abcdef'

console.log('a,b,c,d'.split(','));    // [ 'a', 'b', 'c', 'd' ]
console.log('a,b,c,d'.split(',', 3)); // [ 'a', 'b', 'c' ], limit 3

console.log('a,b.c-d'.split(/[,.-]/));   // [ 'a', 'b', 'c', 'd' ]
console.log('a,b.c-d'.split(/([,.-])/)); // [ 'a', ',', 'b', '.', 'c', '-', 'd' ]

console.log('01234'.slice(2));      // '234'
console.log('01234'.slice(2, 4));   // '23'
console.log('01234'.slice(2, 0));   // ''
console.log('01234'.slice(2, -1));  // '23'
console.log('01234'.slice(-2, -1)); // '3'
console.log('01234'.slice(-2));     // '34'

console.log('01234'.substring(2, 4)); // '23', DO NOT USE THIS, USE slice.
console.log('01234'.substr(2, 2));    // '23', DO NOT USE THIS, USE slice.

console.log('cat'.toUpperCase()); // 'CAT'
console.log('DOG'.toLowerCase()); // 'dog'

// for match, search, replace, see regexp.js.