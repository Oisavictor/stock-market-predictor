function isOtpExpired(otp) {
    const now = new Date().getTime();
    const otpTime = parseInt(otp.split('-')[0]);
    const otpExpiryTime = otpTime + (30 * 60 * 1000);
    
    return otpExpiryTime < now;
  }
const otp = '164737020000000-123456'; // assuming this OTP was generated 5 minutes ago

if (isOtpExpired(otp)) {
  console.log('OTP has expired');
  // handle expired OTP
} else {
  console.log('OTP is still valid');
  // allow user to authenticate
}