import * as express from 'express'
import {upload} from '../middleware/multer';
import {profileController} from '../controller/user.controller'
import { AuthUser } from "../middleware/auth/auth";
import { csrfProtection } from '../express'
const api = '/api/user'
export const UserRoutes = (router: any) => {
   router.put(`${api}/profile`, AuthUser,upload.single('avater'), profileController)
}