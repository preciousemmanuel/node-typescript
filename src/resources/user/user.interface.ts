import { Document } from "mongoose";

export default interface User extends Document{
    email:string;
    password:string;
    name:string;
    role:string;

    isVaildPassword(password:string):Promise<Error|boolean>

}