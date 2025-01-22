import jwt, { JwtPayload, VerifyCallback, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { secret } from "../constants";

// Define the type for the JWT payload
interface DecodedToken extends JwtPayload {
    id: string;
    name?: string;
    email?: string;
    // Add other fields if needed
}

function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token) {
        const payload = jwt.verify(token, secret);
        if (payload) {
            req.userId = payload as DecodedToken;
            next();
        } else {
            res.status(401).send({
                message: "Unauthorized"
            });
        }
    } else {
        res.status(401).send({
            message: "Unauthorized"
        });
    }
}

export default auth;