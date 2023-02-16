import * as bcrypt from 'bcryptjs'

export const  hash= async(data:any) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(data, salt)
    return hash
}

export const CompareHashed = async(userData:any, data:any) => {
    return await bcrypt.compare(userData, data)
    

}