import * as config from 'config';
import { createTransport } from 'nodemailer';

const host = config.get<string>('mailgun.HOST');
const user = config.get<string>('mailgun.USER');
const pass = config.get<string>('mailgun.PASS');

export const mail = createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
})