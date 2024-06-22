import { createParamDecorator } from '@nestjs/common';
export const User = createParamDecorator((data, ctx) => {
    const req = ctx.swithToHttp().getRequest();
    return data?req.user[data]:req.user;
})