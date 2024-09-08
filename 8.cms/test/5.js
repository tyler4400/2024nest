const {match} = require('path-to-regexp');
let path = '/user/:id';
console.log(match(path)('/user/1'))