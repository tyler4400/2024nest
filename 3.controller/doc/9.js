let CommonModule = {
    providers:[CommonService],
    exports:[CommonService]
}
class OtherService{
    CommonService
}
let OtherModule={
    providers:[OtherService],
    exports:[OtherService]
}
class AppController{
    OtherService
}
let appModule = {
    imports:[CommonModule,OtherModule],
    controllers:[AppController]
}
let providerInstances = {
    CommonService:new CommonService(),
    OtherService:new OtherService()
}
let moduleProviers = {
    appModule:new Set(OtherService),
    CommonModule:new Set(CommonService),
    OtherModule:new Set(OtherService)
}

function getProviderByToken(CommonService,CommonModule){
    moduleProviers.get(CommonModule).has(CommonService)
    providerInstances.get(CommonService);
}



// A模块引用B模块 B模块导入导出C模块 C模块导入并导出D模块 D模块里有一个exports[DService]
//A B C D模块 都可以使用DService