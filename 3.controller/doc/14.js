//zod可以定义复杂的嵌套结构，比如对象，数组，联合类型

let {z} = require('zod');
const userSchema = z.object({
    name:z.string(),
    age:z.number(),
    email:z.string().email()
});

let user = {
    name:'zhangsan',
    age:'18',
    email:'zhangsan@qq.com'
}
try{
    const result2= userSchema.parse(user)
    console.log(result2)
}catch(error){
  console.log(error)
  console.log(error)
}

z.array(z.number());
z.union([z.string(),z.number]);
z.enum(['Red','Yellow','Blue'])
