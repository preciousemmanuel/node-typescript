import Joi from "joi";

const reqister=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})


const login=Joi.object({
  
    email:Joi.string().required(),
    password:Joi.string().required(),
})


export default {reqister,login};