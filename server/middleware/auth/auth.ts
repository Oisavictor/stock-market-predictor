import * as express from 'express'
import  { logger } from '../logger'
import {StatusCodes} from "http-status-codes";
import { accessToken, refreshToken } from "../../helper/jwtToken";
import messages from "../../utils/errorMessage";
import {verifyToken, verifyRefreshToken} from '../../helper/jwtToken'
export const AuthUser = async(req, res, next) => {
  try { 
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return {
            ok : false,
            status: StatusCodes.UNAUTHORIZED,
            msg: messages.UNAUTHORIZED    
        }
    }
    const token = authHeader.split(" ")[1]
    const userToken = await verifyToken(token)
    if(!userToken) {
        return {
            ok : false,
            status: StatusCodes.FORBIDDEN,
            msg: messages.UNAUTHORIZED    
        }
    }
    req.user = userToken
    next()
  } catch (err){
     const  error = new Error(err.message)
     logger.error(error)
    return res.status(403).json({msg: err.message})
  }
}

export const refreshTokenAuthentication = async (req, res, next) => {
   try {
     const refresh_Token = req.cookies['cookie']
     const payload = await verifyRefreshToken(refresh_Token)
     if(!payload) {
      return {
        ok : false,
        status: StatusCodes.UNAUTHORIZED,
        msg: messages.UNAUTHORIZED    
    }
     }
  const access = await accessToken(payload)
  console.log(access)
  res.cookie(access, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  req.user = access
  next()
   } catch (err) {
    const  error = new Error(err.message)
    logger.error(error)
   return res.status(403).json({msg: err.message})
   }
}