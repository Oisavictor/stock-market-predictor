import * as Joi from 'joi'
const validator = (schema) => (payload) => 
schema.validate(payload, { abortEarly : false})
     const userSchema = Joi.object().keys({
      name: Joi.string().min(3).max(30).trim().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
      password: Joi.string().min(3).trim().max(30).required(),
      passwordConfirmation: Joi.ref('password')

   })
export const UserValidator = validator(userSchema)