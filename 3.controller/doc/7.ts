
//在reflect-metadata中可以维护一个全局的存储区域
const metadataMap = new Map()
function defineMetadata(key,value,target,propertyKey){
   if(!metadataMap.has(target)){
    metadataMap.set(target,new Map())
   }
   const targetMetadata =metadataMap.get(target);
   if(!targetMetadata.has(propertyKey)){
    targetMetadata.set(propertyKey,new Map());
   }
   const propertyKeyMetadata = targetMetadata.get(propertyKey);
   propertyKeyMetadata.set(key,value);
}