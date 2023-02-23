import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import { generateOTP } from "../helper/getRandomOTP";
import { accessToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { logger } from "../middleware/logger";
import { findUnique, updateUser } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplete } from "../templete/emailTemplete";
import {registerDTO, loginDTO, verifyUserDTO} from '../dto//user.dto'
export const createUser = async (payload: any) => {
  try {
    const user = await findUnique(payload.email);
    if (user) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: messages.DUPLICATE_EMAIL,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplete(payload.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        msg: messages.FAILED_EMAIL,
      };
    }
    const confirmationCode = await hash(OTP.toString());
    payload.password = await hash(payload.password);
    payload.passwordConfirmation = payload.password;
    const createUser = await prisma.user.create({
      data: { confirmationCode, ...payload },
    });
    console.log(createUser);

    return createUser;
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};

export const VerifyUser = async (payload: verifyUserDTO) => {
  try {
    const findUser = await findUnique(payload.email);
    if (!findUser) {
      return {
        ok: false,
        status: StatusCodes.NOT_FOUND,
        msg: messages.USER_NOT_FOUND,
        result: findUser,
      };
    }
    // decode the confirmation code
    const decode = await CompareHashed(
      payload.confirmationCode,
      findUser.confirmationCode
    );

    if (!decode) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        msg: messages.USER_NOT_FOUND,
      };
    }
    //update the confirmation code to be empty and isVerified to be true
    const verifyCode = await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        confirmationCode: "",
        isVerified: true,
      },
    });
    return verifyCode;
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};

export const resendOTP = async (payload: any) => {
  try{
    const {email} = payload
    const findUser = await findUnique(email)
    if(findUser.confirmationCode != '' || findUser.isVerified === true) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: messages.VERIFIED,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplete(payload.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        msg: messages.FAILED_EMAIL,
      };
    }
    findUser.confirmationCode = await hash(OTP.toString())
    const user = await updateUser(payload.email, findUser.confirmationCode) 
    return user

  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
 
}
}
export const LoginUser = async (payload: loginDTO) => {
  try {
    const findUser = await findUnique(payload.email);
    if (!findUser) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: messages.INCORRECT_DETAIL,
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
        msg: messages.INCORRECT_DETAIL,
      };
    }
    if (findUser.isVerified != true) {
      return {
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        msg: messages.EMAIL_NOT_VERIFIED,
      };
    }
    const getToken = await accessToken(findUser);
    const result = { getToken };
    return result;
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};
