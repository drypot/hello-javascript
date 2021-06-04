
const funcs = [];

for (let i = 0; i < 5; i++) {
  funcs[i] = function () {
    return i;
  }
}

for (let i = 0; i < 5; i++) {
  console.log(`funcs[${i}] : ${funcs[i]()}`);
}

/*
결과
funcs[0] : 0
funcs[1] : 1
funcs[2] : 2
funcs[3] : 3
funcs[4] : 4
 */
