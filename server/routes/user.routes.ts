import * as express from 'express'
import {upload} from '../middleware/multer';
import {profileController, EditController} from '../controller/user.controller'
import { AuthUser } from "../middleware/auth/auth";

const api = '/api/user'
export const UserRoutes = (router: any) => {
   router.post(`${api}/profile`, AuthUser,upload.single('avater'), profileController)
   router.put(`${api}/edit`, AuthUser,  EditController)
}