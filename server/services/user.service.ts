import messages from "../utils/const";
import { prisma } from "../model/user.model";
import {IProfile, IUser, IUnique} from '../interface/user'
import {ApiResponse} from '../interface/api.response'
import { StatusCodes } from "http-status-codes";
import { findUserById, updateUser } from "../helper/findUnique";
import { logger } from "../middleware/logger";
export const uploadProfile = async (payload: IProfile, user:IUser): Promise<ApiResponse> => {
   
        const uniqueId = user.token.uniqueId
        const avater = payload
        await prisma.profile.delete({ where: { userId : uniqueId}})
        const createProfile = await prisma.profile.create({data : { avater : avater.filename, userId : uniqueId}})
       return {
         ok: true,
         message: messages.FILE_UPLOADED,
         status: StatusCodes.OK,
         body: {createProfile, user} 
       }
    } 

export const EditUser = async (payload: IUnique, user:IUser): Promise<ApiResponse> => {
     const uniqueId = user.token.uniqueId
     const users = await findUserById(uniqueId)
    //  const update = await 
     return {
      ok: true,
      message: messages.FILE_UPLOADED,
      status: StatusCodes.OK,
      body: {users} 
     }
}