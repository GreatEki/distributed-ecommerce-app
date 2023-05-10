import { Request, Response, NextFunction } from "express";
import prisma from "../../config/prisma-client";
import { ProductCreatedPublisher } from "../../events/publishers/ProductCreatedListener";
import { rabbitMQClient } from "../../events/rabbitMQ";

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

    new ProductCreatedPublisher(rabbitMQClient.channel).publish({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const { name, price } = req.body;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
      },
    });

    return res.json({
      message: "Product updated",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await prisma.product.findMany();

    return res.json({
      message: "Products retrieved",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
