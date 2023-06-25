import UserModel from "@/resources/user/user.model";
import { createToken } from "@/utils/token";



class UserService {
    private user = UserModel;

    //register
    public async register  (
        name: string,
        email: string,
        password: string,
        role:string
    ): Promise<string | Error>  {
        try {

            const user =await this.user.create({ name, email, password,role });
            const token = createToken(user);
            return token;

        } catch (error) {
            throw new Error("unable to register");
        }
    }

    public async login  (
       
        email: string,
        password: string
    ): Promise<string | Error>  {
        try {

            const user =await this.user.findOne({  email });
            if(!user){
                throw new Error("Email does not exist");
            }
            if(await user.isVaildPassword(password)){
                return createToken(user);
            }else{
                throw new Error("unable to login");
            }
            

        } catch (error) {
            throw new Error("unable to login");
        }
    }
}

export default UserService;