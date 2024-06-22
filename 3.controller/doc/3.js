let a = undefined;
let b = 2;
console.log(a??b)
//?? 相对于 || 有一个优点，
// 0 '' null undefined false 都是 false
//?? 会认null和undefined