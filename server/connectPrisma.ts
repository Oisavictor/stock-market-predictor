import { prisma } from "./Interface/user.interface";
import { logger } from "./middleware/logger";
export const connectPrisma = async (): Promise<void> => {
    try {
       await prisma.$connect().then(() => {
            logger.info('Database is connected Successfully')
        }).catch((err) => {
            logger.error(`Reasons why Database fails to connect: ${err.message}`)
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