import { prisma } from "../interface/user.interface";
import messages from "../utils/errorMessage";
import { generateOTP } from "../helper/getRandomOTP";
import { accessToken, refreshToken } from "../helper/jwtToken";
import { hash, CompareHashed } from "../helper/hash";
import { logger } from "../middleware/logger";
import { findUnique, updateUser } from "../helper/findUnique";
import { StatusCodes } from "http-status-codes";
import { emailTemplete } from "../templete/emailTemplete";
import { expirerTime } from "../helper/expireOtp";
import { UserValidator, forgotcodeValidator } from "../schema/joiSchema";
import {ApiResponse} from '../dto/api.response'
import {
  registerDTO,
  loginDTO,
  verifyUserDTO,
  passwordForgottenDTO,
} from "../dto//user.dto";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
// import { open } from 'open';

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
    const SendEmail = await emailTemplete(value.email, OTP);
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
    const SendEmail = await emailTemplete(payload.email, OTP);
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
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};

//Confirm Code for verification
export const changePassword = async (payload: any) => {
  try {
    const { error, value } = forgotcodeValidator(payload);
    if (error) {
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

const CLIENT_ID = process.env.CLIENTID; // Replace with your CLIENT_ID
const CLIENT_SECRET = process.env.CLIENTSECRET; // Replace with your CLIENT_SECRET
const REDIRECT_URI = "http://localhost:5000/google-signup-callback"; // Replace with your redirect URI
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuth = async (payload: any) => {
  const getAuthUrl = () => {
    const authUrl = client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return authUrl;
  };

  const getUserInfo = async (code) => {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const people = google.people({ version: "v1", auth: client });
    const userInfo = await people.people.get({
      resourceName: "people/me",
      personFields: "emailAddresses,names",
    });
    return userInfo.data;
  };

  const createGoogleUser = async () => {
    const authUrl = getAuthUrl();
    console.log(`Please authorize this app by visiting this URL: ${authUrl}`);
    await open(authUrl);

    const code = await new Promise((resolve, reject) => {
      const server = require("http")
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf("/google-signup-callback") > -1) {
              const code = req.url.split("=")[1];
              res.end("Thank you! You can now close this window.");

              server.close();

              resolve(code);
            }
          } catch (error) {
            reject(error);
          }
        })
        .listen(3000, () => {
          console.log("Server running on port 3000");
        });
    });

    const userInfo = await getUserInfo(code);
    console.log(`User info: ${JSON.stringify(userInfo)}`);
    // Create a new user with the user info
  };

  createGoogleUser();
};
