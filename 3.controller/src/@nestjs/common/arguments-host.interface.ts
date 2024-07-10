export interface ArgumentsHost{
    switchToHttp():{
        getRequest<T>():T,
        getResponse<T>():T,
        getNext<T>():T,
    }
}