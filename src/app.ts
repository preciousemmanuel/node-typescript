import express,{Application} from "express";
import mongoose from "mongoose";
import comporession from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/interfaces/controller.interface";
import ErrorHandling from "@middleware/error.middleware";
import helmet from "helmet";

class App{
    public express:Application;
    public port:number;
    
    constructor(controllers:Controller[], port:number){
        this.express=express();
        this.port=port;

        this.initializeDBConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        
        
        this.initializeErrorHandling();



    }   

   private initializeMiddlewares():void{
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({extended:false}));
    this.express.use(comporession())

   }

   private initializeControllers(controllers:Controller[]):void{
    controllers.forEach((controller:Controller)=>{
        this.express.use("/api",controller.router);
    })
   }

   private initializeErrorHandling():void{
    this.express.use(ErrorHandling)
   }
   private initializeDBConnection():void{
    const {MONGO_URI}=process.env;

    mongoose.connect(`${MONGO_URI}`,()=>{
        console.log("DB CONNECTED");
    });
   }

   public listen():void{
    this.express.listen(this.port,()=>{
        console.log("SERVER IS RUNING");
    })
   }

}

export default App;