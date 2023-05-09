import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import {
  ForbiddenError,
  NotFoundError,
  UserType,
} from "@greateki-ticket-ms-demo/ecommshared";

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product: productId } = req.body;

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new NotFoundError("Product not found");

    // get users cart
    const userCart = await prisma.cart.findUnique({
      where: { userId: req.currentUser!.id },
      include: { user: true },
    });

    if (!userCart || !userCart.user.userType?.includes(UserType.CUSTOMER))
      throw new ForbiddenError("Invalid user");

    //   add to cart
    const result = await prisma.cart.update({
      where: { userId: userCart.userId },
      data: { products: { set: [{ id: productId }] } },
    });

    return res.json({
      message: "Item added to cart",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
