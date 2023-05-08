import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
