import { prisma } from '../interface/user.interface'
async function isOtpExpired(otp) {
    const findTime  = await prisma.user.findUnique({ where: {email: 'samsononifade07@gmail.com'}})
    const now = new Date(findTime.expirer_date).getTime();
    const otpTime = parseInt(otp.split('-')[0]);
    // console.log(otpTime)
    const otpExpiryTime = otpTime + (30 * 60 * 1000);
    // console.log(otpExpiryTime)
    return otpExpiryTime > now;
  }

const otp = '164737023600000';  // assuming this OTP was generated 5 minutes ago

if (isOtpExpired(otp)) {
  console.log('OTP has expired');
  // handle expired OTP
} else {
  console.log('OTP is still valid');
  // allow user to authenticate
}