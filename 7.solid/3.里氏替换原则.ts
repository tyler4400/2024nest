/**
 * 此原则要求子类必须能够替换掉它们的基类
 * 这意味着子类应该在任何地方替换掉期父类的，并且不会导致程序出现异常
 */

/* class Bird{
    fly(){

    }
}

class Penguin extends Bird{
    fly(){
        throw new Error(`企鹅不会飞`);
    }
}
function move(bird:Bird){
    bird.fly();
}
move(new Penguin()); */

class Bird{
    move(){

    }
}
class FlyingBird extends Bird{
    move(){
        console.log('我通过飞翔移动')
    }
}
class Penguin extends Bird{
    move(){
        console.log('我通过行走移动')
    }
}
function move(bird:Bird){
    bird.move();
}
move(new FlyingBird());
move(new Penguin());