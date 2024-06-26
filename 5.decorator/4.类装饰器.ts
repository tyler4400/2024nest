

function logged(value,context){
  console.log(value)
  console.log(context)
  if(context.kind === 'class'){
    return class extends value{
        constructor(public a:number){
            super(a);
            console.log(`constructing an instance of ${context.name} with arguments ${a}`)
        }
    }
  }
}
//@ts-ignore
@logged
class Class{
    constructor(private a:number){
        
    }
}
new Class(1);
export {}