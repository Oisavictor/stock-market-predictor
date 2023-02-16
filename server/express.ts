//All Dev dependency are called her
import * as express from "express";
import * as cors from 'cors'
import * as config from 'config'
//Logger is called here
import { logger } from "./middleware/logger";
//All routes file is called here
import {Routes} from "./routes/route";
import {UserRoutes} from './routes/user.routes'
//import prisma to connect automatically
import { connectPrisma } from "./connectPrisma";
//Express connection  

export const ExpressConnection = async() => {

    const PORT = config.get<number>('PORT')
    const app = express()
    app.use(express.json());
    app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }))
    // app.use('/', router);
    await connectPrisma()
    Routes(app)
    UserRoutes(app)
    
    app.listen(PORT, () => {
      logger.info(`app is been listen to on http://localhost:${PORT}`)
      }
    )
    
} 
ExpressConnection()

