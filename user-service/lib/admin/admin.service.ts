import { Admin, PrismaClient } from "@prisma/client";

interface AdminAttr {
  userId: string;
  role: Admin["role"];
  address: string;
  phoneNumber: string;
}

export const createAdmin = async (
  prisma: any,
  admin: AdminAttr
): Promise<Admin> => {
  return await prisma.admin.create({
    data: {
      address: admin.address,
      phoneNumber: admin.phoneNumber,
      role: admin.role,
      user: {
        connect: {
          id: admin.userId,
        },
      },
    },
  });
};
