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
        const findUser =  await prisma.user.findUnique({ where : { uniqueId : uniqueId}})
        if(!findUser) {
          return {
             ok: false,
             message: messages.CANNOT_UPLOAD_FILE,
             status: StatusCodes.UNAUTHORIZED
          }
        }
       const createProfile = await prisma.profile.create({data : { avater : avater.filename, userId : uniqueId}})
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