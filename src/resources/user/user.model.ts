import { Schema,model } from "mongoose";
import bycrpt from "bcrypt";
import User from "@/resources/user/user.interface";




const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String
    },
    role:{
        type:String
    }


},{timestamps:true});

UserSchema.pre<User>("save",async function (next) {
    if(!this.isModified) return next();

    const hash=await bycrpt.hash(this.password,10);
    this.password=hash;
    next();
})

UserSchema.methods.isVaildPassword=async function(
    password:string
):Promise<Error|boolean>{
return await bycrpt.compare(password,this.password)
}

export default model<User>("User",UserSchema);