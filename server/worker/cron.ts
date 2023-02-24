import { findUnique, updateUser } from "../helper/findUnique";
export const expireUserOTP = async (email: string, payload: number) =>{
    const findUser = await findUnique(email)
    if(findUser) {
        
    }
}