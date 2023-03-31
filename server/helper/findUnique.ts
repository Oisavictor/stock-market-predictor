import { prisma } from "../model/user.model";
export const findUnique = async (data: any) => {
  const findUnique = await prisma.user.findUnique({ where: { email: data } });
  return findUnique;
};

export const updateUser = async (data: any, updateData: string) => {
  const updateUnique = await prisma.user.update({
    where: { email: data },
    data: updateData,
  });
  return updateUnique;
};
