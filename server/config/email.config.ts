import * as config from 'config'
import {createTransport} from 'nodemailer'
const host = config.get<string>('mailgun.HOST')
const port = config.get<number>('mailgun.PORT')
const secure = config.get<boolean>('mailgun.SECURE')
const user= config.get<string>('mailgun.USER')
const pass = config.get<string>('mailgun.PASS')
export const mail = createTransport({
    host : host,
    port : port,
    secure : false,
    auth : {
        user : user,
        pass : pass
    }
})