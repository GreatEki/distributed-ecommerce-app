import prisma from "../../config/prisma-client";
import { Customer } from "@prisma/client";

interface CustomerAttr {
  userId: string;
  address: string;
  phoneNumber: string;
}

export const createCustomer = async (
  prisma: any,
  customer: CustomerAttr
): Promise<Customer> => {
  return await prisma.customer.create({
    data: {
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      user: {
        connect: {
          id: customer.userId,
        },
      },
    },
  });
};

export const updateCustomer = async (prisma: any, customer: CustomerAttr) => {
  return await prisma.customer.update({
    where: { userId: customer.userId },
    data: {
      address: customer.address,
      phoneNumber: customer.phoneNumber,
    },
  });
};
