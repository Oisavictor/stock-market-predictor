import '../utils/dotEnv';

export = {
    PORT: process.env.PORT || '4000',
    google_auth: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    },

    mailgun: {
        HOST: process.env.SMTP_HOST,
        PORT: process.env.SMTP_PORT,
        SECURE: process.env.SMTP_SECURE,
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASSWORD
    },

    token: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN,
        COOKIES: process.env.cookies_secret
    }
}
