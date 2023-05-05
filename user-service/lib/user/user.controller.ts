import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotFoundError,
} from "@greateki-ticket-ms-demo/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma-client";
import * as customerService from "../customer/customer.service";
import * as adminService from "../admin/admin.service";
import { UserTypes } from "../../shared/types";
import { UserCreatedPublisher } from "../../events/publisher/UserCreatedPublisher";
import { rabbitMqClient } from "../../events/rabbitMQ";

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

    const publisher = new UserCreatedPublisher(rabbitMqClient.channel);

    publisher.publish({
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      userType: result.userType,
    });

    return res.status(201).json({
      message: "User created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) throw new BadRequestError("Invalid credentials");

    const match = bcrypt.compareSync(password, user.password);

    if (!match) throw new BadRequestError("Invalid credentials");

    let admin;
    let customer;

    if (user.userType.includes(UserTypes.ADMIN)) {
      admin = await prisma.admin.findFirst({ where: { userId: user.id } });
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_KEY!
    );

    return res.cookie("access_token", token, { httpOnly: true }).json({
      message: "Sign in successful",
      data: {
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          admin,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundError("User not found");

    return res.json({
      message: "User returned",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
