
export function def(value){
    if(typeof value === 'number'){
        return value || 0;
    }else{
        return value?'"'+value+'"':'""';//JSON.stringify
    }
}