import messages from "../utils/const";
import { prisma } from "../model/user.model";
import {Profile, IUser} from '../interface/user'
import {ApiResponse} from '../interface/api.response'
import { StatusCodes } from "http-status-codes";


export const uploadProfile = async (payload: Profile, IUser: IUser): Promise<ApiResponse> => {
   
        const uniqueId = IUser.token.uniqueId
        const avater = payload
        const user = await prisma.profile.create({data : { avater : avater.filename, userId : uniqueId}})
      //  if(user.avater !== null) {
      //   const update = await prisma.profile.update({where : {userId : uniqueId}, data : { avater : avater.filename, userId : user.userId}})
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
         body: {user} 
       }
    } 
    