import {Request,Response,NextFunction} from 'express';
export interface NestMiddleware{
    use(req: Request, res: Response, next: NextFunction)
}

