//转换从函数返回的结果

/**
 * 
 * @param target 类的原型
 * @param propertyName 字符串方法名
 * @param descriptor 属性描述器 descriptor.value就是方法
 */
function transformResult(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const result = originalMethod.apply(this, args);
        return `Tranformed Result:${result}`;
    }
    return descriptor;
}

class Example {
    @transformResult
    getResult() {
        return 'Original Result'
    }
}
const example = new Example();
console.log(example.getResult());

export { }