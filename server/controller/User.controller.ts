import * as express from 'express'
import { createUser } from '../services/user.service'

export const createUserController = async(req, res, next): Promise<Object> => 
{
      const user = await createUser(req.body)
      return res.status(201).json({ ...user })
}