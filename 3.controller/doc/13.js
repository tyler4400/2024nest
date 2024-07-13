/**
 * zod是一个声明式模式验证库
 * 
 */
//import {z} from 'zod';
//zod允许你定义模式schema,然后使用这些模式来验证数据
let {z} = require('zod');
//定义模式
//定义一个字符串模式
const stringSchema = z.string();
const numberSchema = z.number();
//验证数据
//定义了模式后，就可以使用parse方法来验证数据，数据验证成功后返回数据本身，否则 抛出错误
const result1= stringSchema.parse('hello')
console.log(result1)
const result2= numberSchema.parse(18)
console.log(result2)
try{
    const result2= numberSchema.parse('18')
    console.log(result2)
}catch(error){
  console.log(error)
}
