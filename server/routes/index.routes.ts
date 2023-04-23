import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";
import * as express from 'express'


export const Routes = (router: any) => {
  router.use('/auth', AuthRoutes)
  router.use('/user', UserRoutes)
}
