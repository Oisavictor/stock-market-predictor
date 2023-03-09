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
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { open } from 'open';

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
     return {verifyCode}; 
  } catch (err: any) {
    const error = new Error(err.message);
    logger.error(error);
    return {
      msg: err.message,
    };
  }
};

export const resendOTP = async (payload: any) => {
  try {
    const { email } = payload;
    const findUser = await findUnique(email);
    if (findUser.isVerified === true) {
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
    const code = findUser.confirmationCode 
    await prisma.user.update({where: {email: email}, data : {
      confirmationCode : code
  }}); 
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
export const forgottenPassword = async (payload: passwordForgottenDTO) => {
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

const CLIENT_ID = process.env.CLIENTID; // Replace with your CLIENT_ID
const CLIENT_SECRET = process.env.CLIENTSECRET; // Replace with your CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:5000/google-signup-callback'; // Replace with your redirect URI
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuth = async (payload: any) => {
const getAuthUrl = () => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  return authUrl;
};

const getUserInfo = async (code) => {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const people = google.people({ version: 'v1', auth: client });
  const userInfo = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names',
  });
  return userInfo.data;
};

const createGoogleUser = async () => {
  const authUrl = getAuthUrl();
  console.log(`Please authorize this app by visiting this URL: ${authUrl}`);
  await open(authUrl);

  const code = await new Promise((resolve, reject) => {
    const server = require('http').createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/google-signup-callback') > -1) {
          const code = req.url.split('=')[1];
          res.end('Thank you! You can now close this window.');

          server.close();

          resolve(code);
        }
      } catch (error) {
        reject(error);
      }
    }).listen(3000, () => {
      console.log('Server running on port 3000');
    });
  });

  const userInfo = await getUserInfo(code);
  console.log(`User info: ${JSON.stringify(userInfo)}`);
  // Create a new user with the user info
};

createGoogleUser();
}



