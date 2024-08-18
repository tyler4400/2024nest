import { Request,Response,NextFunction } from "express";

function methodOverride(req:Request,res:Response,next:NextFunction){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        req.method = req.body._method.toUpperCase();
        delete req.body._method;
    }
    next();
}
export default methodOverride;