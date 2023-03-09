import { NextFunction, Request, Response } from "express";
import { IErrorResponse} from "./Responses/ErrorResponse"
const isLoggedIn = async (req: Request,res: Response<IErrorResponse> ,next: NextFunction) =>{
    if(!req.isAuthenticated()){
        return res.status(401).json({
            message: "You are not logged in"
        });
    } else {
        next();
    }
}