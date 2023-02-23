import * as jwt from 'jsonwebtoken'
import * as config from 'config'
const privateKey = config.get<string>('token.ACCESS_TOKEN')
export const accessToken = (data: any) => {
    return jwt.sign({token: data}, privateKey , { expiresIn : '2h'})
}

export const verifyToken = (token: any) => {
    return jwt.verify(token, privateKey)
}