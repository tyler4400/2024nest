//单一职责原则要求一个类应该只有一个引起变化的原因，换句话说，就是一个类应该只有一个职责

/*
这样的话不符合单一职责原则  
class User{
    constructor(public name:string,public email:string){

    }
    save(){

    }
    sendEmail(){

    }
} */


class User{
    constructor(public name:string,public email:string){

    }
}
class UserRepository{
  save(user:User){
    //可以把user保存到数据库
  }
}
class EmalService{
    sendEmail(user:User){
        //可以向此user用户发送邮件
    }
}