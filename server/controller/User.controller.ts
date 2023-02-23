import * as express from 'express'
import { createUser, VerifyUser, LoginUser} from '../services/user.service'
import {
      StatusCodes,
    } from "http-status-codes";
export const createUserController = async(req, res, next): Promise<Object> => 
{
      const user = await createUser(req.body)
      console.log(user)
      return res.status( StatusCodes.CREATED).json({...user})
}
export const verifyUserByOTP = async(req, res, next) => {
      const user = await VerifyUser(req.body)
      return res.status( StatusCodes.OK).json({...user})
}
export const loginUser = async(req, res, next) => {
       const user =  await LoginUser(req.body)
       return res.status( StatusCodes.OK).json({...user})
}

