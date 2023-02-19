import * as jwt from 'jsonwebtoken'
import * as config from 'config'

const accessToken = config.get<string>('token.ACCESS_TOKEN');

export const jwtSign = (data: any) => {
    return jwt.sign({token: data}, accessToken, { expiresIn : '2h'})
}

export const verifyToken = (token: any) => {
    return jwt.verify(token, accessToken)
}