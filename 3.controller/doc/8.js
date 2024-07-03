/* let moduleA={ // 使用 1 2 3
   providers:[1,2,3],
   exports:[1,2]
}
let moduleB={//可以使用1 2 4 5 
  imports:[moduleA],
  providers:[4,5],
  exports:[moduleA]
}

let moduleC = {// 1 2 
    imports:[moduleB]
} */

let innerModule = {
      providers:[InnerService,AddService],
      exports:[InnerService]
}
let commonModule = {
  imports:[innerModule],
  providers:[CommonService,AddService],
  exports:[CommonService,innerModule]
}
let CoreModule ={
  imports:[CommonModule],
  providers:[],
  exports:[CommonModule]//此处导出的可以是提供者，也可以是模块
}
let AppModule = {//CommonService InnerService
  imports:[CoreModule]//但是导入的只能是模块
}