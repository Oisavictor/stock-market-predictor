import { prisma } from "../model/user.model";
export const expirerTime = async (email: string) => {
    const time = await prisma.user.findUnique({ where : { email : email}})
    const oldDate: any = time.expirer_date 
    const newDate: any = new Date(Date.now() + 1 * 60 * 60 * 1000)
    const calculate = (newDate - oldDate)
    return calculate
}
