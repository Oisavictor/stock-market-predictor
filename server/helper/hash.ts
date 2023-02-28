import * as bcrypt from 'bcrypt'
// import  {cryptoRandomString }from 'crypto-random-string';
// import {moment} from 'moment'
// const otp = cryptoRandomString({ length: 6, type: 'numeric' });
// const otpExpirationTime = moment().add(5, 'minutes');
export const  hash = async(data:any) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(data, salt)
    return hash
}

export const CompareHashed = async(userData:any, data:any) => {
    return await bcrypt.compare(userData, data)
    

}