import { UserPrisma } from '../interface/user.interface'
import messages from '../utils/errorMessage'

export const createUser = async(payload: any) => {
   const user =  await UserPrisma.user.create({data : payload})
   if(!user) throw {ok : false, msg: 'Not created'}
   return user
}

