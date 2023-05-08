import { Request, Response, NextFunction } from "express";
import {
  ForbiddenError,
  NotFoundError,
} from "@greateki-ticket-ms-demo/ecommshared";
import prisma from "../../config/prisma-client";
import { stripe } from "../../config/stripe";

export const getUserWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundError("User not found");

    const userWallet = await prisma.wallet.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    return res.json({
      message: "User wallet info",
      data: userWallet,
    });
  } catch (err) {
    next(err);
  }
};

export const topUpWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, token } = req.body;

    // confirm user
    const user = await prisma.wallet.findUnique({
      where: { userId: req.currentUser!.id },
    });

    if (!user) throw new NotFoundError("User not found");

    if (user.userId !== req.currentUser!.id)
      throw new ForbiddenError(
        "You are not permitted to perform this operation."
      );

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: Number(amount) * 100,
      source: token,
    });

    const newBalance = user.balance + charge.amount / 100;
    const userWallet = await prisma.wallet.update({
      where: { userId: user.userId },
      data: { balance: newBalance },
    });

    return res.json({
      message: "charge successful",
      data: userWallet,
    });
  } catch (err) {
    next(err);
  }
};
