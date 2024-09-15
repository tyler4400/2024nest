declare namespace Express {
    interface Multer{
        File:Express.Multer.File
    }
    interface Request{
        session:{user:any}
        user:any
    }
}