import Post from "@/resources/post/post.interface";
import PostModel from "@/resources/post/post.model";
//business logic

class PostService{
    private post=PostModel;
    public async create(title:string,body:string):Promise<Post>{
        try {
            const post=await this.post.create({title,body});
            console.log("post",post);
            
            return post;
        } catch (error) {
             throw new Error("Unable to create");
            
        }
    }
}

export default PostService;