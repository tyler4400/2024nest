import { Get ,Controller, UseInterceptors} from "@nestjs/common";
import { Logging1Interceptor } from "./logger1.interceptor";
import { Logging2Interceptor } from "./logger2.interceptor";
@Controller('pay')
export class PayController{
    @Get()
    @UseInterceptors(Logging1Interceptor)
    @UseInterceptors(Logging2Interceptor)
    async pay(){
       console.log('pay...');
       return 'pay'
    }
}