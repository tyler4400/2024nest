import { Get, Controller, UseInterceptors, BadRequestException } from "@nestjs/common";
import { Logging1Interceptor } from "./interceptors/logger1.interceptor";
import { Logging2Interceptor } from "./interceptors/logger2.interceptor";
import { Logging3Interceptor } from "./interceptors/logger3.interceptor";
import { Logging4Interceptor } from "./interceptors/logger4.interceptor";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { ExcludeNullInterceptor } from "./interceptors/excludeNull.interceptor";
import { ErrorsInterceptor } from "./interceptors/errors.interceptor";
import { CacheInterceptor } from "./interceptors/cache.interceptor";
import { TimeoutInterceptor } from "./interceptors/timeout.interceptor";
@Controller('pay')
@UseInterceptors(Logging3Interceptor)
@UseInterceptors(Logging4Interceptor)
export class PayController {
    @Get()
    @UseInterceptors(Logging1Interceptor)
    @UseInterceptors(Logging2Interceptor)
    async pay() {
        console.log('pay...');
        return 'pay'
    }
    @Get('data')
    @UseInterceptors(TransformInterceptor)
    async data() {
        console.log('data...');
        return 'data'
    }
    @Get('null')
    @UseInterceptors(ExcludeNullInterceptor)
    @UseInterceptors(TransformInterceptor)
    async null() {
        console.log('null...');
        return null
    }
    @Get('exception')
    @UseInterceptors(ErrorsInterceptor)
    async exception() {
        console.log('exception...');
        throw new BadRequestException('some error');
    }
    @Get('user')
    @UseInterceptors(CacheInterceptor)
    async user() {
        console.log('user...');
        return {id:1,name:'user1'}
    }
    @Get('timeout')
    @UseInterceptors(TimeoutInterceptor)
    async timeout() {
        console.log('timeout...');
        await new Promise<void>((resolve)=>{
            setTimeout(()=>{
                resolve()
            },3000);
        });
    }
}
/**
Before2...
Before1...
pay...
After1... 3ms
After2... 6ms
 */