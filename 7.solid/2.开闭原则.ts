//开闭原则要求实体应该对扩展开放，对修改关闭
//也就 是说应该通过扩展已有代码来实现新的功能，而不是修改原有的代码
/* 
class Rectangel{
    constructor(public width:number,public height:number){

    }
}
class Circle{
    constructor(public radius:number){

    }
}
class AreaCalculator{
    calculateArea(shape){
        if(shape instanceof Rectangel){
            return shape.width* shape.height;
        }else if(shape instanceof Circle){
            return Math.PI * shape.radius* shape.radius;
        }
    }
}
 */

interface Shape{
    calculateArea():number;
}
class Rectangel implements Shape{
    constructor(public width:number,public height:number){

    }
    calculateArea(): number {
        return this.width* this.height;
    }
}
class Circle implements Shape{
    constructor(public radius:number){

    }
    calculateArea(): number {
        return Math.PI * this.radius* this.radius;
    }
}
class AreaCalculator{
    static calculateArea(shape:Shape){
        return shape.calculateArea();
    }
}
let result = AreaCalculator.calculateArea(new Rectangel(10,20));
console.log(result)
let result2 = AreaCalculator.calculateArea(new Circle(10));
console.log(result2)