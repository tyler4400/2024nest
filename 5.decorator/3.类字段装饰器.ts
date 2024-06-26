function logged(value,context){
  console.log(value);
  console.log(context)
  if(context.kind === 'field'){
    return function(initialValue){
        console.log(`initializing ${context.name} with value ${initialValue}`)
        return initialValue+1;
    }
  }
}
class Class{
    @logged   x = 1
}
//console.log(new Class().x)
export {}