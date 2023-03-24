import * as Joi from "joi";
import messages from "../utils/errorMessage";
import { StatusCodes } from "http-status-codes";
import { logger } from "../middleware/logger";
export const VRegister = async (schema) => {
  try {
    const body = Joi.object().keys({
      name: Joi.string().min(3).max(30).trim().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
      password: Joi.string().min(3).trim().max(30).required(),
      passwordConfirmation: Joi.ref("password"),
    });
    const { error, value } = body.validate(schema, { abortEarly: false });
    if (error) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }
    return value;
  } catch (error) {
    const errors = new Error(error.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};

export const VOtpVerification = async (schema) => {
  try {
   const body = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
      code: Joi.string().min(4).trim().max(30).required()
      // NewPassword: Joi.string().min(3).trim().max(30).required(),
      // passwordConfirmation: Joi.ref("NewPassword"),
    });
    const { error, value } = body.validate(schema, { abortEarly: false });
    if (error) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }
    return value;
  } catch (error) {
    const errors = new Error(error.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};

export const VLogin = async (schema) => {
  try {
   const body = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
      password: Joi.string().min(8).trim().max(10000).required()
    });
    const { error, value } = body.validate(schema, { abortEarly: false });
    if (error) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }
    return value;
  } catch (error) {
    const errors = new Error(error.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};

export const VForgetPassword = async (schema) => {
   try {
      const body = Joi.object().keys({
         email: Joi.string()
           .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
           .trim()
           .required()
       });
       const { error, value } = body.validate(schema, { abortEarly: false });
       if (error) {
         return {
           ok: false,
           status: StatusCodes.BAD_REQUEST,
           message: error.message,
         };
       }
       return value;
     } catch (error) {
       const errors = new Error(error.message);
       logger.error(errors);
       return {
         ok: false,
         status: StatusCodes.INTERNAL_SERVER_ERROR,
         message: messages.INTERNAL_SERVER_ERROR,
       };
     }
}
export const VChangePassword = async (schema) => {
   try {
    const body = Joi.object().keys({
       email: Joi.string()
         .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
         .trim()
         .required(),
       code: Joi.string().min(4).trim().max(30).required(),
       NewPassword: Joi.string().min(3).trim().max(30).required(),
       passwordConfirmation: Joi.ref("NewPassword"),
     });
     const { error, value } = body.validate(schema, { abortEarly: false });
     if (error) {
       return {
         ok: false,
         status: StatusCodes.BAD_REQUEST,
         message: error.message,
       };
     }
     return value;
   } catch (error) {
     const errors = new Error(error.message);
     logger.error(errors);
     return {
       ok: false,
       status: StatusCodes.INTERNAL_SERVER_ERROR,
       message: messages.INTERNAL_SERVER_ERROR,
     };
   }
 };