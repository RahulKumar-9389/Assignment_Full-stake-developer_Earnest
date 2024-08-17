import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface IDecode {
    id: String,
    email: String
};

interface RequestWithUserRole extends Request {
    user?: IDecode,
}


export default function isLogin(req: RequestWithUserRole, res: Response, next: NextFunction) {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send('You cannot access this page before login!');

    try {
        const decode = <IDecode>jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decode;
        next();
    } catch {
        res.status(401).send('Invalid token');
    }
};
