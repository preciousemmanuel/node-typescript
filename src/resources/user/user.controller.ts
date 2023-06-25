import Controller from "@/utils/interfaces/controller.interface";
import { Router, Response, NextFunction } from "express";
import UserService from "@/resources/user/user.service";
import validation from "@/resources/user/user.validation";
import validationMiddleware from "@middleware/validation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import authenticatedMiddleware from "@middleware/authenticated.middleware";


class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initilizeRoutes();
    }

    initilizeRoutes(): void {
        this.router.post(`${this.path}/register`, validationMiddleware(validation.reqister), this.register);
        this.router.post(`${this.path}/login`, validationMiddleware(validation.login), this.login);
        this.router.get(`${this.path}`, authenticatedMiddleware, this.getUSer);
    }

    private register=async (
        req: Request|any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>=> {

        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.register(name, email, password, "user");

            return res.status(201).send({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message))

        }
    }


    private login=async(
        req: Request|any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> =>{

        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);

            return res.status(201).send({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message))

        }
    }

    private getUSer=async(
        req: Request|any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void>=> {

       if(!req.user){
        return next(new HttpException(400,"No user found"))
       }

       return res.status(200).send({user:req.user})
    }

}

export default UserController