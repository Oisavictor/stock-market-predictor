import messages from "../utils/const";
import { prisma } from "../model/user.model";
import {Profile, User} from '../interface/user'
import {ApiResponse} from '../interface/api.response'
import { StatusCodes } from "http-status-codes";
import { logger } from "../middleware/logger";
export const uploadProfile = async (payload: Profile, user: User): Promise<ApiResponse> => {
    try 
    { 
        const uniqueId = user.token.uniqueId
        const avater = payload
       const createProfile = await prisma.profile.create({data : { avater : avater.filename, userId : uniqueId}})
      //  if(createProfile.avater !== null) {
      //   const update = await prisma.profile.update({where : {userId : uniqueId}, data : { avater : avater.filename, userId : createProfile.userId}})
      //   if(update) {
      //     return {
      //       ok: true,
      //       message: messages.FILE_UPLOADED,
      //       status: StatusCodes.OK,
      //       body: {update} 
      //     }
      //   }
      //  }
       return {
         ok: true,
         message: messages.FILE_UPLOADED,
         status: StatusCodes.OK,
         body: {createProfile} 
       }
    } catch (error) {
      const errors = new Error(error.message);
      logger.error(errors);
      return {
        ok: false,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
     
}