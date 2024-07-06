//这是常用的HTTP请求方法的枚举
export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    ALL = 'ALL',//ALL能匹配所有的方法
}