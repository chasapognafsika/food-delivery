
import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as compression from "compression";
import * as passport from "passport";
import * as helmet from "helmet";
import Routes from "./routes";

class Express {
    public app: express.Express;

    constructor () {
        this.app = express();
        this.setupEnv();
        this.initializePassport();
        this.setupMongo();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupEnv() {
        const dotenv = require('dotenv');
        dotenv.config();
    }

    private initializePassport() {
        this.app.use(passport.initialize());
    }

    private setupMongo() {

        // Connect to mongo using mongoose
        mongoose.connect(process.env.MONGO_URI, (err)=>{
            if(err){
                console.log(err);
            }
        });      
    }

    private setupRoutes() {
        new Routes(this.app);
    }

    private setupMiddleware() {
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
    }

}

export default new Express().app;