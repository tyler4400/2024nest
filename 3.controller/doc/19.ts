//转换从函数抛出的异常

function transformException(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        try{
            return  originalMethod.apply(this, args);
        }catch(error){
            throw new Error('Transformed Exception');
        }
       
    }
    return descriptor;
}

class Example {
    @transformException
    riskMethod() {
        throw new Error('Original Exception');
    }
}
const example = new Example();
try{
    example.riskMethod()
}catch(error){
    console.log(error)
}

export { }