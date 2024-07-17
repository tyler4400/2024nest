//导入z对象
import {z} from 'zod';
//定义一个名为createCatSchema的模式，用于验证cat对象的结构 
export const createCatSchema  = z.object({
//定义一个对象的模式
  name:z.string(),//定义对象的name属性，类型必须为字符串
  age:z.number()//定义对象的age属性，类型必须是数字
}).required();///指定对象中所有的字段为必填项

//通过zod的infer方法从createCatSchema获得或者说推导 出一个类型
export type CreateCatDto = z.infer<typeof createCatSchema>
/**
type CreateCatDto = {
    name?: string;
    age?: number;
}
 */