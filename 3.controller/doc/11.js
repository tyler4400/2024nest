let set  = new Set();
set.add('A')
set.add('B')
set.add('A');
set.add('A');
set.add('A');
set.add('A');
if(!set.has('A'))
set.add('A');
console.log(set)