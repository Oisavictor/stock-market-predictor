import { prisma } from "../interface/user.interface";
export  const findUnique = async(data: any) => {
       const findUnique = await prisma.user.findUnique({where: {email : data}})
       return findUnique
}