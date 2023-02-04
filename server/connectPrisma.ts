import { prisma } from "./Interface/user.interface";
import { logger } from "./middleware/logger";
export const connectPrisma = async (): Promise<void> => {
    try {
       await prisma.$connect().then(() => {
            console.log('Database is connected')
        }).catch((err) => {
            logger.error(err.message)
            prisma.$disconnect()
        })
    } catch (error) {
        if(error) 
        setTimeout(() => {
            logger.error(`${error.message} trying to reconnect`)
            prisma.$connect()
        }, 5);
        
        
    }
   
}