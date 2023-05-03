import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@greateki-ticket-ms-demo/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Customer } from "@prisma/client";
import prisma from "../../config/prisma-client";
import * as customerService from "../customer/customer.service";
import * as adminService from "../admin/admin.service";
import { UserTypes } from "../../shared/types";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      address,
      phoneNumber,
      role,
    } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist) throw new BadRequestError("Email is already in use.");

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          userType,
          password: hashPassword,
        },
        select: {
          firstName: true,
          lastName: true,
          userType: true,
          email: true,
          id: true,
        },
      });

      userType.includes(UserTypes.ADMIN)
        ? await adminService.createAdmin(prisma, {
            address,
            phoneNumber,
            role,
            userId: newUser.id,
          })
        : await customerService.createCustomer(prisma, {
            address,
            phoneNumber,
            userId: newUser.id,
          });

      return newUser;
    });

    return res.status(201).json({
      message: "User created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
