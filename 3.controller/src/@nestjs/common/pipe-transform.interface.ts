
export interface PipeTransform<T=any,R=any>{
    transform(value:T,metadata?:any):R
}