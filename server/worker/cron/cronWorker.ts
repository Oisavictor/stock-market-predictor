import * as cron from 'node-cron'
import { findUnique} from "../../helper/findUnique";
import { prisma } from "../../interface/user.interface";

export const cronJobber = (email: string) => {
    const cronJob =  cron.schedule('1 * * * * *', async () => {
        // expireUserOTP(email)
         await testing(email)
      });

<<<<<<< Updated upstream
      if(cronJob) {
        cronJob.stop()
      } else {
        cronJob.start()
      }

}

cronJobber("samsononifade") 
export const testing = async (payload) => {
    let {email} = payload
     let expired = false
    if(email == "samsononifade") {
        console.log(`${expired = true}`)
    } else {
        console.log(`${expired = false}`)
    }
}
export const expireUserOTP = async (payload: string)=>{
    const findUser = await findUnique(payload)
    if(findUser.confirmationCode != '') {
         await prisma.user.update({
            where: {
              email: payload,
            },
            data: {
              confirmationCode: "",
            },
          })
    }
}
    
=======
export const cronJobber = async (email: string) => {
    
    
 }


  
>>>>>>> Stashed changes

