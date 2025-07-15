import { prismaClient } from "db/client";
import { Router } from "express";
import { AdminMiddleware } from "../middlewares/adminMiddleware";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const products = await prismaClient.product.findMany();

  res.json({
    products,
  });
});

productsRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prismaClient.product.findUnique({
    where: {
      id: productId,
    },
  });

  res.json({
    product,
  });
});

productsRouter.post("/", AdminMiddleware, async (req, res) => {
  const { description, price, sizes, colors, stock, category, collection } =
    req.body;
  const product = await prismaClient.product.create({
    data: {
      description,
      price,
      sizes,
      colors,
      stock,
      category,
      collection,
    },
  });

  if (!product) {
    res.status(500).json({
      message: "Error creating product",
    });
    return;
  }

  res.json({
    product,
  });
});

productsRouter.put("/:id", AdminMiddleware, async (req, res) => {
  const productId = req.params.id;
  const { description, price, sizes, colors, stock, category, collection } =
    req.body;
  const product = await prismaClient.product.update({
    where: {
      id: productId,
    },
    data: {
      description,
      price,
      sizes,
      colors,
      stock,
      category,
      collection,
    },
  });

  if (!product) {
    res.status(500).json({
      message: "Error updating product",
    });
    return;
  }

  res.json({
    product,
  });
});

productsRouter.delete("/:id", AdminMiddleware, async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await prismaClient.product.delete({
    where: {
      id: productId,
    },
  });

  if (!deletedProduct) {
    res.status(500).json({
      message: "Error deleting product",
    });
    return;
  }

  res.json({
    deletedProduct,
  });
});
