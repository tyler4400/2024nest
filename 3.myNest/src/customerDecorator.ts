import { createParamDecorator } from '@nest/common';
export const User = createParamDecorator((data, ctx) => {
	const req = ctx.switchToHttp().getRequest();
	// 假设在req的body上挂了一个user对象
	return data ? req.body?.user?.[data] : req.body?.user;
})
