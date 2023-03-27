import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import { generateOTP } from "../helper/getRandomOTP";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { logger } from "../middleware/logger";
import { findUnique, updateUser } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplate } from "../template/emailTemplate";
import {
  registerDTO,
  loginDTO,
  verifyUserDTO,
  passwordForgottenDTO,
  IchangePassword,
} from "../dto/auth.dto";

import { ApiResponse } from "../dto/api.response";

export const createUser = async (
  payload: registerDTO
): Promise<ApiResponse> => {
  try {
    const { name, email, password } = payload;
    const user = await findUnique(email);
    if (user) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        message: messages.DUPLICATE_EMAIL,
      };
    }
    const OTP = generateOTP(4);
    await emailTemplate(email, OTP);
    const confirmationCode = await hash(OTP.toString());
    payload.password = await hash(password);
    payload.passwordConfirmation = '' 
    const createUser = await prisma.user.create({
      data: { confirmationCode, ...payload },
    });

    return {
      ok: true,
      status: StatusCodes.CREATED,
      body: createUser,
      message: messages.CREATED,
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

export const VerifyUser = async (
  payload: verifyUserDTO
): Promise<ApiResponse> => {
  try {
    const {email, code} = payload
    const findUser = await findUnique(email);
    // decode the confirmation code
    const decode = await CompareHashed(
      payload.code,
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
        status: true
      },
    });
    return {
      ok: true,
      status: StatusCodes.OK,
      message: messages.VERIFIED_USER,
      body: userConfirmed,
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

export const resendOTP = async (payload: any): Promise<ApiResponse> => {
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
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};

export const LoginUser = async (payload: loginDTO): Promise<ApiResponse> => {
  try {
    const findUser = await prisma.user.findUnique({ where  : { email : payload.email}});
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
      throw {
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
      body: { access_Token, refresh_Token },
    };
  } catch (err) {
    const errors = new Error(err.message);
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};

// forgotten password
export const forgottenPassword = async (
  payload: passwordForgottenDTO
): Promise<ApiResponse> => {
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
     await emailTemplate(payload.email, OTP);
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
      message: messages.RESET_PASSWORD_OTP,
    };
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message:messages.INTERNAL_SERVER_ERROR,
    };
  }
};

//Confirm Code for verification
export const changePasswordService = async (
  payload: IchangePassword
): Promise<ApiResponse> => {
  try {
    
    const { email, password, code } = payload;
    const findUser = await findUnique(email);
    const confirmCode = await CompareHashed(code, findUser.reset_password);
    if (!confirmCode) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        message: messages.INCORRECT_OTP,
      };
    }
    const Password = await hash(password);
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: Password,
      },
    });
    return { ok: true, status: StatusCodes.OK, message: "Password is changed" };
  } catch (err) {
    const errors = new Error(err.message);
    console.log(err)
    logger.error(errors);
    return {
      ok: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: messages.INTERNAL_SERVER_ERROR,
    };
  }
};
