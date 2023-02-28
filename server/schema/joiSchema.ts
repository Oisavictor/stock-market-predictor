import * as Joi from 'joi'
const validator = (schema) => (payload) => 
schema.validate(payload, { abortEarly : false})
     const userSchema = Joi.object().keys({
      name: Joi.string().min(3).max(30).trim().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
      password: Joi.string().min(3).trim().max(30).required(),
      passwordConfirmation: Joi.ref('password')

   })

   const verifyCode = (schema) => (payload) => 
   schema.validate(payload, { abortEarly : false})
        const verifyForgotOtp = Joi.object().keys({
         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
         code: Joi.string().min(4).trim().max(30).required(),
})
   const Passwordvalidator = (schema) => (payload) => 
   schema.validate(payload, { abortEarly : false})
        const passwordSchema = Joi.object().keys({
         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().required(),
         NewPassword: Joi.string().min(3).trim().max(30).required(),
         passwordConfirmation: Joi.ref('NewPassword')
})
const UserValidator = validator(userSchema)
const PasswordValidatorSchema = Passwordvalidator(passwordSchema)
const forgotcodeValidator= verifyCode(verifyForgotOtp)

export {
   UserValidator,
   PasswordValidatorSchema,
   forgotcodeValidator
}
