import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import { generateOTP } from "../helper/getRandomOTP";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { logger } from "../middleware/logger";
import { findUnique, updateUser } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplete } from "../templete/emailTemplete";
import { UserValidator, PasswordValidatorSchema, forgotcodeValidator } from "../schema/joiSchema";
import { registerDTO, loginDTO, verifyUserDTO, passwordForgottenDTO } from "../dto//user.dto";
import { cronJobber } from "../worker/cron/cronWorker";
export const createUser = async (payload: registerDTO) => {
  try {
    const { error, value } = UserValidator(payload);
    if (error) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: error.message,
      };
    }
    const user = await findUnique(value.email);
    if (user) {
      return {
        ok: false,
        status: StatusCodes.BAD_REQUEST,
        msg: messages.DUPLICATE_EMAIL,
      };
    }
    const OTP = generateOTP(4);
    const SendEmail = await emailTemplete(value.email, OTP);
    if (!SendEmail) {
      return {
        ok: false,
        status: StatusCodes.REQUEST_TIMEOUT,
        msg: messages.FAILED_EMAIL,
      };
    }
    const confirmationCode = await hash(OTP.toString());
    value.password = await hash(value.password);
    value.passwordConfirmation = '';
    const createUser = await prisma.user.create({
      data: { confirmationCode, ...value },
    });
    const result = {
      email : createUser.email,
      name : createUser.name,
      uniqueId : createUser.uniqueId,
    }
    return result;
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
        msg: messages.INCORRECT_OTP,
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
        msg: messages.INCORRECT_OTP,
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
     return {msg : 'Verification is successfull'};
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};

export const resendOTP = async (payload: any) => {
<<<<<<< Updated upstream
  try{
    const {email} = payload
    const findUser = await findUnique(email)
    if(findUser.confirmationCode != '' || findUser.isVerified === true) {
=======
  try {
    const { email } = payload;
    const findUser = await findUnique(email);
    if (findUser.isVerified === true || findUser.otp_expired != true) {
>>>>>>> Stashed changes
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
    findUser.confirmationCode = await hash(OTP.toString());
    const user = await updateUser(payload.email, findUser.confirmationCode);
    return {msg : 'Check your email for verification code'};;
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};
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
    const access_Token = accessToken(findUser);
    const refresh_Token = refreshToken(findUser);
 
  
    return {access_Token, refresh_Token} 
   
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};

// forgotten password
export const forgottenPassword = async (payload: any) => {
  try{
  const findUser = await findUnique(payload.email);
  if (!findUser) {
    return {
      ok: false,
      status: StatusCodes.UNAUTHORIZED,
      msg: messages.INVAILD_USER_REQUEST,
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
export const confirmCodeForPassswordConfirmation = async (payload: verifyUserDTO) => {
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
 return {msg : 'Verification is successfull'}
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
        msg: error.message,
      };
  }
  const NewPassword = await hash(payload.NewPassword)
 const changePassword = await prisma.user.update({where: {email : findUser.email}, data : {
         password: NewPassword,
         passwordConfirmation: ''
   }})
   
  return { msg : 'Password Have been successfully changed'}

  
} catch (err) {
  const errors = new Error(err.message);
  return {
    msg: err.message,
  };
}
}


