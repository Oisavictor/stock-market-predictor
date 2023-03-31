import { prisma } from "./model/user.model";
import { logger } from "./middleware/logger";
export const connectPrisma = async (): Promise<void> => {
    try {
       await prisma.$on('info', (e) => {
            logger.info(` ${e.message}`)
        })
       await prisma.$connect().then((e) => {
        logger.info(`Database is connected Successfully `)
           
        }).catch((err) => {
            if(err) {
                prisma.$on('error', (e) => { logger.error(`Reason why database fails to connect ${e.message}`)})
                prisma.$disconnect()
            }  
        })
    } catch (error) {
        if(error) 
        setTimeout(() => {
            logger.error(`${error.message} trying to reconnect`)
            prisma.$connect()
        }, 5);
        
        
    }
   
}