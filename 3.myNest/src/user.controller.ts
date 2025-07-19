import {Controller, Get, Req, Request} from '@nest/common'
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
}
