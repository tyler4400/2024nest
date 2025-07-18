import { Controller, Get, Query, Req, Request } from '@nest/common'
import {Request as ExpressRequest} from 'express'

@Controller('users')
export class UserController{

    name =  'user tyler'

    @Get('req')
    handleRequest(@Req() req: ExpressRequest, @Request() request: ExpressRequest){
        console.log(req.url);
        console.log(request.method)
        return 'handleRequest: ' + (req === request ? 'true' : 'false');
    }

    @Get('query')
    handleQuery(@Query() query: any, @Query('id') id: string){
        console.log('query', query);
        console.log('id', id);
        return `query id:${id}`;
    }
}
