import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const privateKey = config.get<string>('token.ACCESS_TOKEN');
const publicKey = config.get<string>('token.REFRESH_TOKEN');

export const accessToken = (data: any) => {
    return jwt.sign({ token: data }, privateKey, { expiresIn: '3h' })

};

export const refreshToken = (data: any) => {
    return jwt.sign({ token: data }, publicKey, { expiresIn: '2h' })
};

export const verifyRefreshToken = (token: any) => { 
    return jwt.verify(token, publicKey)
};

export const verifyToken = (token: any) => {
    return jwt.verify(token, privateKey)
}

