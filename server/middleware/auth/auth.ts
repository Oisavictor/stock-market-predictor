import * as express from 'express'
import { logger } from '../logger'
import { ApiResponse } from '../../interface/api.response'
import { StatusCodes } from "http-status-codes";
import { accessToken } from "../../helper/jwtToken";
import messages from "../../utils/const";
import { verifyToken, verifyRefreshToken } from '../../helper/jwtToken';
import { ExcludeField } from '../../helper/omit';
export const AuthUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
       return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false, status: StatusCodes.UNAUTHORIZED,  message: messages.UNAUTHORIZED})
    }

    const token = authHeader.split(" ")[1];
    
    const user = await verifyToken(token)
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false, status: StatusCodes.UNAUTHORIZED,  message: messages.UNAUTHORIZED})
    }
    req.user = user
    next()
  } catch (err) {
    const error = new Error(err.message)
    logger.error(error)
    return res.status(403).json({ msg: err.message })
  }
}

export const refreshTokenAuthentication = async (req, res, next) => {
  try {
    const refresh_Token = req.cookies['cookie']
    const payload = await verifyRefreshToken(refresh_Token)
    if (!payload) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ ok: false, status: StatusCodes.UNAUTHORIZED,  message: messages.UNAUTHORIZED})
    }
  const access = await accessToken(payload)
  res.cookie(access, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  req.user = access
  next()
   } catch (err) {
    const  error = new Error(err.message)
    logger.error(error)
    return res.status(403).json({ msg: err.message })
  }
}