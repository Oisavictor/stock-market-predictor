import {upload} from '../middleware/multer';
import { prisma } from "../interface/user.interface";
import {Profile, User} from '../dto/user.dto'
import {ApiResponse} from '../dto/api.response'
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
             message: 'Sorry you are not unauthoruized to make this request',
             status: StatusCodes.UNAUTHORIZED
          }
        }
       const createProfile = await prisma.profile.create({data : { avater : avater.filename, userId : uniqueId}})
       return {
         ok: true,
         message: 'Profile was uploaded',
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