import { Router } from "express";
import { UserMiddleware } from "../middlewares/userMiddleware";
import { prismaClient } from "db/client";

export const cartRouter = Router();

cartRouter.get("/", UserMiddleware, async (req, res) => {
  const userId = req.userId;

  const items = await prismaClient.cartItem.findMany({
    where: {
      userId,
    },
  });

  res.json({ items });
});

cartRouter.post("/", UserMiddleware, async (req, res) => {
  const userId = req.userId as string;
  const { productId, quantity, size } = req.body;

  const item = await prismaClient.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
      size,
    },
  });

  if (!item) {
    res.status(500).json({
      message: "Failed to add item to cart",
    });
    return;
  }

  res.json({
    item,
  });
});

cartRouter.delete("/:itemId", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const itemId = req.params.itemId;

  const deletedItem = await prismaClient.cartItem.delete({
    where: {
      id: itemId,
      userId,
    },
  });

  if (!deletedItem) {
    res.status(500).json({
      message: "Failed to delete item from cart",
    });
    return;
  }

  res.json({
    deletedItem,
  });
});
