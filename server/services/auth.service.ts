import { prisma } from "../model/user.model";
import messages from "../utils/const";
import { generateOTP } from "../helper/getRandomOtp";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { findUnique } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplate } from "../template/emailTemplate";

import {
  registerDTO,
  loginDTO,
  verifyUserDTO,
  passwordForgottenDTO,
  IchangePassword,
} from "../interface/auth";

import { ApiResponse } from "../interface/api.response";

export const createUser = async (
  payload: registerDTO
): Promise<ApiResponse> => {
  
    const { name, email, password } = payload;
    const user = await findUnique(email);
    if (user) { throw { ok: false, status: StatusCodes.BAD_REQUEST, message: messages.DUPLICATE_EMAIL,}; }

    const OTP = generateOTP(4);
    // await emailTemplate(email, OTP);
    console.log(OTP)
    const token = await hash(OTP.toString());

    payload.password = await hash(password);
    payload.passwordConfirmation = '' 

    const createUser = await prisma.user.create({data: { token, ...payload }, });
     return { ok: true, status: StatusCodes.CREATED,body: createUser,message: messages.CREATED, };
  }


export const VerifyUser = async (
  payload: verifyUserDTO
): Promise<ApiResponse> => {
  
    const {email, code} = payload
    const findUser = await findUnique(email);

    const decode = await CompareHashed( payload.code, findUser.token);
    if (!decode) { throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.INCORRECT_OTP, };}
   
    const userConfirmed = await prisma.user.update({ where: { email: payload.email,},data: { token: "", isVerified: true, status: true}, });
    return { ok: true, status: StatusCodes.OK, message: messages.VERIFIED_USER,  body: userConfirmed,};
  }

export const resendOTP = async (payload: any): Promise<ApiResponse> => {
  
    const { email } = payload;
    const findUser = await findUnique(email);

    if (findUser.isVerified === true) {  throw { ok: false,  status: StatusCodes.BAD_REQUEST, message: messages.VERIFIED,};}
    const OTP = generateOTP(4);

    const SendEmail = await emailTemplate(payload.email, OTP);
    if (!SendEmail) { throw { ok: false, status: StatusCodes.REQUEST_TIMEOUT, message: messages.FAILED_EMAIL,};
  }
    findUser.token = await hash(OTP.toString());
    const code = findUser.token;

    await prisma.user.update({ where: { email: email }, data: {   token: code, }, });
    return { ok: true, status: StatusCodes.OK, message: messages.RESEND_CODE,};
  }

export const LoginUser = async (payload: loginDTO): Promise<ApiResponse> => {
    const {email, password} = payload
    const User = await prisma.user.findUnique({ where  : { email : email}}); 
    if (!User) { throw { ok: false, status: StatusCodes.BAD_REQUEST, message: messages.INCORRECT_DETAIL, }; }

    const verifyPassword = await CompareHashed( password,  User.password );
    if (!verifyPassword || User.isVerified != true) {
      throw {  ok: false, status: StatusCodes.BAD_REQUEST, message: messages.INCORRECT_DETAIL,}; }

    const access_Token = accessToken(User);
    const refresh_Token = refreshToken(User);

    await prisma.user.update({ where: { email: email }, data: {active: true, },});
    return { ok: true, status: StatusCodes.OK,message: messages.USER_LOGGEDIN, body: { access_Token, refresh_Token, User } };
   } 
  

// forgotten password
export const forgottenPassword = async (
  payload: passwordForgottenDTO
): Promise<ApiResponse> => {
  
    const findUser = await findUnique(payload.email);
    if (!findUser || findUser.isVerified === false) { throw { ok: false, status: StatusCodes.UNAUTHORIZED, message: messages.INVAILD_USER_REQUEST,};}
    const OTP = generateOTP(4);

     await emailTemplate(payload.email, OTP);
    const ResetCode = await hash(OTP.toString());

    await prisma.user.update({ where: { email: payload.email, }, data: {reset_code: ResetCode,},});
    return { ok: true, status: StatusCodes.OK, message: messages.RESET_PASSWORD_OTP, };
  }

//Confirm Code for verification
export const changePasswordService = async (
  payload: IchangePassword
): Promise<ApiResponse> => {
  
    
    const { email, password, code } = payload;
    const User = await findUnique(email);
    const confirmCode = await CompareHashed(code, User.reset_code);

    if (!confirmCode) {
      throw { ok: false,status: StatusCodes.UNAUTHORIZED,message: messages.INCORRECT_OTP,};
    }
    const Password = await hash(password);

    await prisma.user.update({ where: {  email: email, }, data: {  password: Password,  reset_code: '' },});
    return { ok: true, status: StatusCodes.OK, message: "Password is changed" };
  }