import {Reqeust,Response,NextFunction} from 'express';

export function loggerFunction(req: Reqeust, res: Response, next: NextFunction) {
    console.log('loggerFunction');
    next();
 } 