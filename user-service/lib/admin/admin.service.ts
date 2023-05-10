import { Admin } from "@prisma/client";

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

export const updateAdmin = async (prisma: any, admin: AdminAttr) => {
  return await prisma.admin.update({
    where: { userId: admin.userId },
    data: {
      role: admin.role,
      address: admin.address,
      phoneNumber: admin.phoneNumber,
    },
  });
};
