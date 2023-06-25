import { Request, Response, RequestHandler, NextFunction } from "express";
import Joi from "joi";

function validationMiddleware(scheme: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validateOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUknown: true
        };

        try {
            console.log("requbosdy",req.body)
            const value = await scheme.validateAsync(
                req.body,
                validateOptions
            );
            req.body = value;
            next();
        } catch (err:any) {
            console.log("error",err);
            const errors: string[] = [];
            err.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });

            res.status(400).send({ errors })
        }
    }
}


export default validationMiddleware;