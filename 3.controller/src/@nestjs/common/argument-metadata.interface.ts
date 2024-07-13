export interface ArgumentMetadata{
    //代表当前是哪个类型的参数装饰器
    //Body请求体 query查询参数 param路径参数 custom自定义参数装饰器
    type:'body'|'query'|'param'|'custom',
    metatype?;
    data?:string
}