import * as fs from 'fs';

function subA(path, done) {
  console.log('subA 1');
  fs.realpath(path, (err, resolvedPath) => {
    if (err) return done(err);
    console.log('subA 3');
    done(null, resolvedPath);
  });
  console.log('subA 2');
}

function subB(path, done) {
  console.log('subB 1');
  fs.stat(path, (err, stats) => {
    if (err) return done(err);
    console.log('subB 3');
    done(null, stats);
  });
  console.log('subB 2');
}

function main() {
  console.log('main 1');
  subA('callback.js', (err, resolvedPath) => {
    if (err) process.exit(1);
    console.log('main 3');
    subB(resolvedPath, (err, stats) => {
      if (err) process.exit(1);
      console.log('main 4');
    });
  });
  console.log('main 2');
}

console.log('global 1');
main();
console.log('global 2');

/*
Result:

global 1
main 1
subA 1
subA 2
main 2
global 2
subA 3
main 3
subB 1
subB 2
subB 3
main 4
*/
