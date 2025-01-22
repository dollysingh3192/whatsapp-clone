import { DecodedToken } from '../middlewares/auth';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId: DecodedToken
        }
    }
}