import * as express from 'express'
import { StatusCodes } from 'http-status-codes'
export const authGuard = async(req, res, next) => {
    if(req.user) {
        next()
    } else {
        throw {
            ok : false,
            status: StatusCodes.UNAUTHORIZED, 
            message: 'User is not authorized'
        }
    }
} 
