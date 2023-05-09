import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import {
  BadRequestError,
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
      include: { user: true, products: true },
    });

    if (!userCart || !userCart.user.userType?.includes(UserType.CUSTOMER))
      throw new ForbiddenError("Invalid user");

    const CartItems = userCart.products;

    const existingItem = CartItems.find((item) => item.id === productId);

    if (existingItem) throw new BadRequestError("Item is already in cart");

    //   add to cart
    const result = await prisma.cart.update({
      where: { userId: userCart.userId },
      data: { products: { connect: [{ id: productId }] } },
    });

    return res.json({
      message: "Item added to cart",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { products: true },
    });

    if (!cart) throw new NotFoundError("No cart found for record user");

    return res.json({
      message: "User cart info",
      data: cart,
    });
  } catch (err) {
    next(err);
  }
};
