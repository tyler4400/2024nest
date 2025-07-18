interface Obj {
    a: number;
    b: string
}
const obj: Obj = { a: 1, b: 'hello' }

console.log(Reflect.get(obj, 'a'))

Reflect.set(obj, 'b', 'hi')
console.log(obj.b)
//deleteProperty
//has
//defineProperty
//apply Function
//construct
//getPrototypeOf setPrototypeOf  Object
//Object Function
