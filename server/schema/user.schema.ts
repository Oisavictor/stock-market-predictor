import * as Joi from 'Joi'
import {StatusCodes} from 'http-status-codes'
export const VAvater = async (body) => {
     const file = Joi.object({
       avater :  Joi.string().required()
     })
     const {error, value} = file.validate(body, {abortEarly: false})
     if(error){
        throw {
            ok: false,
            status: StatusCodes.BAD_REQUEST,
            message: error.message
        }
     }
     return value
}