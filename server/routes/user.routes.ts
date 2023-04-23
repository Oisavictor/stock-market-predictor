import * as express from 'express'
import {upload} from '../middleware/multer';
import {profileController, EditController} from '../controller/user.controller'

const userApi: string = '/user'
export const UserRoutes = (router: any) => {
  router.post(`${userApi}/profile`, upload.single('avater'), profileController)
 
}