import { Reqeust, Response, NextFunction } from 'express';
export interface NestMiddleware {
    use(req: Reqeust, res: Response, next: NextFunction): any;
}
