import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@greateki-ticket-ms-demo/ecommshared";
import prisma from "../../config/prisma-client";

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
