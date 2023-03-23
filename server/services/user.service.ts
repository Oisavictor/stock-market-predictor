import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import { generateOTP } from "../helper/getRandomOTP";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { logger } from "../middleware/logger";
import { findUnique, updateUser } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplate as emailTemplate } from "../template/emailTemplate";
import { UserValidator, PasswordValidatorSchema, forgotcodeValidator } from "../schema/joiSchema";
import { registerDTO, loginDTO, verifyUserDTO, passwordForgottenDTO } from "../dto//user.dto";


export const createUser = async (payload: registerDTO): Promise<ApiResponse> => {
  try {
    const { error, value } = UserValidator(payload);
    if (error) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }
    const user = await findUnique(value.email);
    if (user) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.DUPLICATE_EMAIL,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplate(value.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        message: messages.FAILED_EMAIL,
      };
    }
    const confirmationCode = await hash(OTP.toString());
    value.password = await hash(value.password);
    value.passwordConfirmation = "";
    const createUser = await prisma.user.create({
      data: { confirmationCode, ...value },
    });

    return { ok: true,  status: StatusCodes.CREATED, body: createUser, message: messages.CREATED };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

export const VerifyUser = async (payload: verifyUserDTO): Promise<ApiResponse> => {
  try {
    const findUser = await findUnique(payload.email);
    if (!findUser) {
      return {
        ok: false,
        status: StatusCodes.NOT_FOUND,
        message: messages.INCORRECT_OTP,
      };
    }
    // Check if expirer
    await expirerTime(payload.email);
    // decode the confirmation code
    const decode = await CompareHashed(
      payload.confirmationCode,
      findUser.confirmationCode
    );

    if (!decode) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: messages.INCORRECT_OTP,
      };
    }
    //update the confirmation code to be empty and isVerified to be true
    const userConfirmed = await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        confirmationCode: "",
        isVerified: true,
      },
    });
    return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.VERIFIED_USER,
      body: userConfirmed.isVerified,
    };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

export const resendOTP = async (payload: any): Promise<ApiResponse>=> {
  try {
    const { email } = payload;
    const findUser = await findUnique(email);
    if (findUser.isVerified === true) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.VERIFIED,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplate(payload.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        message: messages.FAILED_EMAIL,
      };
    }
    findUser.confirmationCode = await hash(OTP.toString());
    const code = findUser.confirmationCode;
    await prisma.user.update({
      where: { email: email },
      data: {
        confirmationCode: code,
      },
    });
    return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.RESEND_CODE,
    };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

export const LoginUser = async (payload: loginDTO): Promise<ApiResponse> => {
  try {
    const findUser = await findUnique(payload.email);
    if (!findUser) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.INCORRECT_DETAIL,
      };
    }

    const verifyPassword = await CompareHashed(
      payload.password,
      findUser.password
    );
    if (!verifyPassword) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.INCORRECT_DETAIL,
      };
    }
    if (findUser.isVerified != true) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: messages.EMAIL_NOT_VERIFIED,
      };
    }
    const access_Token = accessToken(findUser);
    const refresh_Token = refreshToken(findUser);
    return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.USER_LOGGEDIN,
      body : { access_Token, refresh_Token,}

    };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

// forgotten password
export const forgottenPassword = async (payload: passwordForgottenDTO): Promise<ApiResponse> => {
  try {
    const findUser = await findUnique(payload.email);
    if (!findUser || findUser.isVerified === false) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: messages.INVAILD_USER_REQUEST,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplete(payload.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        message: messages.FAILED_EMAIL,
      };
    }
    const ResetCode = await hash(OTP.toString());
    await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        reset_password: ResetCode,
      },
    });
    return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.RESET_PASSWORD_OTP
    }
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      ok: false,
      status: StatusCodes.UNAUTHORIZED,
      msg: messages.INVALID_USER_REQUEST,
    };
  }
  const OTP = generateOTP(4);
  const SendEmail = await emailTemplate(payload.email, OTP);
  if (!SendEmail) {
    return {
      ok: false,
      status: StatusCodes.REQUEST_TIMEOUT,
      msg: messages.FAILED_EMAIL,
    };
  }
  const ResetCode = await hash(OTP.toString());
  await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      reset_password: ResetCode,
    },
  });
} catch (err: any) {
  const error = new Error(err.message);
  logger.error(error);
  return {
    msg: err.message,
  };
}
return {msg : 'Check your email for email verification'}
};

//Confirm Code for verification
export const changePassword = async (payload: any) => {
  try {
   const {error, value} = forgotcodeValidator(payload)
   if(error){
    return {
      ok: false,
      status: StatusCodes.BAD_REQUEST,
      msg: error.message,
    };
   }
   const findUser = await findUnique(value.email)
   const confirmCode = await CompareHashed(value.code, findUser.reset_password)
   if(!confirmCode) {
    return {
      ok: false,
      status: StatusCodes.UNAUTHORIZED,
      msg: messages.INCORRECT_OTP,
    };
   }
 return {msg : 'Verification is successful'}
 } catch (err) {
  const errors = new Error(err.message);
  logger.error(errors);
  return {
    msg: err.message,
  };
 }
 
}

export const changePassword = async (payload) => {
  try {
  const {error, value} = PasswordValidatorSchema(payload)
  const findUser = await findUnique(payload.email)

    if(error){
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }
    const findUser = await findUnique(value.email);
    const confirmCode = await CompareHashed(
      value.code,
      findUser.reset_password
    );
    if (!confirmCode) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: messages.INCORRECT_OTP,
      };
    } else {
      const NewPassword = await hash(payload.NewPassword);
      await prisma.user.update({
        where: { email: findUser.email },
        data: {
          password: NewPassword,
          passwordConfirmation: "",
          reset_password: "",
        },
      });
    }
    return { ok: true, message: "Password is changed successfully", status: StatusCodes.OK };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

