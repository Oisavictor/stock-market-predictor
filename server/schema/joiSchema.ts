import * as Joi from "joi";
import { StatusCodes } from "http-status-codes";



export const VRegister = async (body: any) => {
   const registerSchema =  Joi.object({
      // csrf_token : Joi.string().required(),
      name : Joi.string().required().min(3).max(100),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
      passwordConfirmation: Joi.ref("password"),
    });
    const { error, value } = registerSchema .validate(body, { abortEarly: false });
    if (error) {
      throw {
        ok: false,
        message: error.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }

    return value;
  }

export const VOtpVerification = async (body: any) => {
    const OtpSchema =  Joi.object({
      // csrf_token : Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      code: Joi.string().min(4).trim().max(30).required(),
    });
    const { error, value } = OtpSchema .validate(body, { abortEarly: false });
    if (error) {
      throw {
        ok: false,
        message: error.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }

    return value;
};

export const VLogin = async (body: any) => {
   const loginSchema = Joi.object({
      // csrf_token : Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(100).required(),
    });
    const { error, value } = loginSchema.validate(body, { abortEarly: false });
    if (error) {
      throw {
        ok: false,
        message: error.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }

    return value;
};

export const VForgetPassword = async (body: any) => {
  const forgetPasswordSchema = Joi.object({
    // csrf_token : Joi.string().required(),
    email: Joi.string().email().required(),
  });
  const { error, value } = forgetPasswordSchema.validate(body, { abortEarly: false });
  if (error) {
    throw {
      ok: false,
      message: error.message,
      status: StatusCodes.BAD_REQUEST,
    };
  }

  return value;
}
export const VChangePassword = async (body: any) => {
     const changePasswordSchema = Joi.object({
      // csrf_token : Joi.string().required(),
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .trim()
      .required(),
    code: Joi.string().min(4).trim().max(30).required(),
    password: Joi.string().min(3).trim().max(30).required(),
    passwordConfirmation: Joi.ref("password"),
    });
    const { error, value } = changePasswordSchema.validate(body, { abortEarly: false });
    if (error) {
      throw {
        ok: false,
        message: error.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }
  
    return value;
 }; 