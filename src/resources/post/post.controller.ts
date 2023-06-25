import Controller from "@/utils/interfaces/controller.interface";
import { Router,Request,Response,NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";
import validate from "@/resources/post/post.validation";
import validationMiddleware from "@middleware/validation.middleware";
import PostService from "@/resources/post/post.services";

class PostController implements Controller{
    public path="/posts";
    public router=Router();
    PostService= new PostService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes():void{
        this.router.post(`${this.path}`,validationMiddleware(validate.create),this.create)
    }

    private create=async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response|void>=>{
        try {
            const {title,body}=req.body;
            const post=await this.PostService.create(title,body);

            res.status(201).send({post});

        } catch (error:any) {
            console.log("posterror",error)
            next(new HttpException(400,"Cannot create post"))
        }
    }

}


export default PostController;