import * as express from 'express'
import  { logger } from '../logger'
import {StatusCodes} from "http-status-codes";
import messages from "../../utils/errorMessage";
import {verifyToken} from '../../helper/jwtToken'
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
    req.user = {
        id: userToken.token.uniqueId,
        name : userToken.token.name,
        email : userToken.token.email, 

    }
    next()
  } catch (err){
     const  error = new Error(err.message)
     logger.error(error)
    return res.status(403).json({msg: err.message})
  }
}