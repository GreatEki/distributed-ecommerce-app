import prisma from "../../config/prisma-client";
import { Customer } from "@prisma/client";

interface CustomerAttr {
  userId: string;
  address: string;
  phoneNumber: string;
}

const createCustomer = async (
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

export { createCustomer };
