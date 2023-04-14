import { prisma } from "../model/user.model";
import { UserTypes } from "../model/types";
export const findUnique = async (data: any) => {
  const findUnique = await prisma.user.findUnique({ where: { email: data } });
  return findUnique;
};

export const findUserById = async (user: UserTypes) => {
   const users = await prisma.user.findUnique({ where : { uniqueId: user.uniqueId }})
   return users
}
export const updateUser = async (user: UserTypes) => {
  const updateUnique = await prisma.user.update({
    where: { uniqueId: user.uniqueId },
    data: user,
  });
  return updateUnique;
};
