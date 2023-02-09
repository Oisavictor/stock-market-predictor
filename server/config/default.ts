import '../utils/dotEnv'

export = {
    PORT: process.env.PORT || '4000',
    google_auth: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    }
}
