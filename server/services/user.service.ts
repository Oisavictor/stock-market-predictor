import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import {generateOTP} from '../helper/getRandomOTP'
import {hash, CompareHashed} from '../helper/hash'
import {findUnique} from '../helper/findUnique'
import {
  StatusCodes,
} from "http-status-codes";
import { sendEmail } from "../utils/sendEmail";
export const createUser = async (payload: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (user) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: messages.DUPLICATE_EMAIL,
      };
    }
    const OTP = generateOTP(4)
    const SendEmail = await sendEmail(payload.email, 'Verify', 'Veudsi', `<h1>Your verification Code is ${OTP}</h1>`)
    if(!SendEmail) {
      return{
         ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        msg: messages.FAILED_EMAIL,
      }
    } 
      let hashedOTP = await hash(OTP.toString())
      const confirmationCode = await hashedOTP
      payload.password =  await hash(payload.password)
      payload.passwordConfirmation = payload.password
      const createUser = await prisma.user.create({data: {confirmationCode, ...payload}})
      console.log(createUser )
    
   return createUser
  } catch (error: any) {
    if (error) return { msg: error };
  }
};

export const VerifyUser = async(payload: any) => {
  try {
   const findUser =  await prisma.user.findUnique({
    where: { email: payload.email },
  });
   if(!findUser) {
      return {
         ok: false,
         status: StatusCodes.NOT_FOUND,
         msg: messages.USER_NOT_FOUND,
         result: findUser
       };
   }
   // decode the confirmation code
   const decode = await CompareHashed(payload.confirmationCode, findUser.confirmationCode)

   if(!decode) {
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
      confirmationCode: '',
      isVerified: true
    },
  })
  return verifyCode 
} catch (error: any) {
  if (error) return { msg: error };
}
}

export const LoginUser = async (payload: any) => {
      const findUser = await findUnique(payload.email)
      if(!findUser) {
        return {
          ok: false,
          status: StatusCodes.UNAUTHORIZED,
          msg: messages.USER_NOT_FOUND,
        };
      }
}