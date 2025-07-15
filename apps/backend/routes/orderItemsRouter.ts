import { Router } from "express";
import { UserMiddleware } from "../middlewares/userMiddleware";
import { prismaClient } from "db/client";

export const orderItemsRouter = Router();

orderItemsRouter.get("/", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const { orderId } = req.body;

  const orderItems = await prismaClient.orderItem.findMany({
    where: {
      orderId,
      userId,
    },
  });

  res.json({
    orderItems,
  });
});

orderItemsRouter.post("/", UserMiddleware, async (req, res) => {
  const userId = req.userId as string;
  const { productId, size, quantity, price, orderId } = req.body;

  const orderItem = await prismaClient.orderItem.create({
    data: {
      productId,
      size,
      quantity,
      price,
      orderId,
      userId,
    },
  });

  if (!orderItem) {
    res.status(500).json({
      message: "Failed to create order",
    });
    return;
  }

  res.json({
    orderItem,
  });
});

orderItemsRouter.delete("/:orderItemId", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const orderItemId = req.params.orderItemId;

  const deletedOrderItem = await prismaClient.orderItem.delete({
    where: {
      id: orderItemId,
      userId,
    },
  });

  if (!deletedOrderItem) {
    res.status(500).json({
      message: "Failed to delete orders ",
    });
  }

  res.json({
    deletedOrderItem,
  });
});
