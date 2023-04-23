import { prisma } from "../model/user.model";
import messages from "../utils/const";
import { generateOTP } from "../helper/getRandomOtp";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { findUnique } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplate } from "../template/emailTemplate";
import { ExcludeField } from "../helper/omit";
import {
  registerDTO,
  loginDTO,
  verifyUserDTO,
  passwordForgottenDTO,
  IchangePassword,
} from "../interface/auth";

import { ApiResponse } from "../interface/api.response";
import { logger } from "../middleware/logger";

export const createUser = async (
  payload: registerDTO
): Promise<ApiResponse> => {
  
    const { name, email, password } = payload;
    const user = await findUnique(email);
    if (user) { 
      throw {
         ok: false, 
         status: StatusCodes.BAD_REQUEST,
          message: messages.DUPLICATE_EMAIL,
        }; 
      }

    const OTP = generateOTP(4);
  //   try {
  // await emailTemplate(email, OTP);
  //   } catch (error) {
  //     logger.error(error)
  //     throw {
  //       ok: false, 
  //       status: StatusCodes.INTERNAL_SERVER_ERROR,
  //       message: messages.UNABLE_TO_SEND_OTP 
  //     }
  //   }
  
    const token = await hash(OTP.toString());

    payload.password = await hash(password);
    payload.passwordConfirmation = '' 

    const createUser = await prisma.user.create({data: { token, ...payload }, });
    ExcludeField(createUser,['password', 'passwordConfirmation', 'token'])
     return { ok: true, status: StatusCodes.CREATED,body: createUser,message: messages.CREATED, };
  }


export const VerifyUser = async (
  payload: verifyUserDTO
): Promise<ApiResponse> => {
  
    const {email, code} = payload
    const user = await findUnique(email);
    if (!user) { throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.UNABLE_TO_VERIFY_EMAIL, };}
    const decode = await CompareHashed( code, user.token);
    if (!user || !decode) { throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.INCORRECT_OTP, };}
    const userConfirmed = await prisma.user.update({ where: { email: email,},data: { token: "", isVerified: true, status: true}, });
    ExcludeField(userConfirmed, ['password', 'passwordConfirmation'])
    return { ok: true, status: StatusCodes.OK, message: messages.VERIFIED_USER,  body: userConfirmed,};
  }

export const resendOTP = async (payload: any): Promise<ApiResponse> => {
  
    const { email } = payload;
    const user = await findUnique(email);
    if (!user || user.isVerified === true) {  throw { ok: false,  status: StatusCodes.BAD_REQUEST, message: messages.VERIFIED,};}
    const OTP = generateOTP(4);
    try {
      await emailTemplate(email, OTP);
        } catch (error) {
          logger.error(error)
          throw {
            ok: false, 
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: messages.UNABLE_TO_SEND_OTP 
          }
        }
    user.token = await hash(OTP.toString());
    const code = user.token;

    await prisma.user.update({ where: { email: email }, data: {   token: code, }, });
    return { ok: true, status: StatusCodes.OK, message: messages.RESEND_CODE,};
  }

export const LoginUser = async (payload: loginDTO): Promise<ApiResponse> => {
    const {email, password} = payload
    const user = await prisma.user.findUnique({ where  : { email : email}}); 
    if (!user) { throw { ok: false, status: StatusCodes.BAD_REQUEST, message: messages.INCORRECT_DETAIL, }; }

    const verifyPassword = await CompareHashed( password,  user.password );
    if (!verifyPassword || user.isVerified != true) {
      throw {  ok: false, status: StatusCodes.BAD_REQUEST, message: messages.INCORRECT_DETAIL,}; }
    ExcludeField(user, ['password', 'passwordConfirmation'])
    const access_Token = accessToken(user);
    const refresh_Token = refreshToken(user);
    
    await prisma.user.update({ where: { email: email }, data: {active: true, },});
    return { ok: true, status: StatusCodes.OK,message: messages.USER_LOGGEDIN, body: { access_Token, refresh_Token, user } };
   } 
  

// forgotten password
export const forgottenPassword = async (
  payload: passwordForgottenDTO
): Promise<ApiResponse> => {
  
    const user = await findUnique(payload.email);
    if (!user || user.isVerified === false) { throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.INVAILD_USER_REQUEST,};}
    const OTP = generateOTP(4);
    try {
      await emailTemplate(payload.email, OTP);
        } catch (error) {
          logger.error(error)
          throw {
            ok: false, 
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: messages.UNABLE_TO_SEND_OTP 
          }
        }
    const ResetCode = await hash(OTP.toString());

    await prisma.user.update({ where: { email: payload.email, }, data: {reset_code: ResetCode,},});
    return { ok: true, status: StatusCodes.OK, message: messages.RESET_PASSWORD_OTP, };
  }

//Confirm Code for verification
export const changePasswordService = async (
  payload: IchangePassword
): Promise<ApiResponse> => {
  
    
    const { email, password, code } = payload;
    const user = await findUnique(email);
    if(!user) {
      throw { ok: false,status: StatusCodes.BAD_REQUEST, message: messages.UNABLE_TO_CHANGE_THIS_PASSWORD,};
    }
    const confirmCode = await CompareHashed(code, user.reset_code);

    if (!confirmCode) {
      throw { ok: false,status: StatusCodes.BAD_REQUEST, message: messages.INCORRECT_OTP,};
    }
    const Password = await hash(password);

    await prisma.user.update({ where: {  email: email, }, data: {  password: Password,  reset_code: '' },});
    return { ok: true, status: StatusCodes.OK, message: "Password is changed" };
  }