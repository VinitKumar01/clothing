import { Router } from "express";
import { UserMiddleware } from "../middlewares/userMiddleware";
import { prismaClient } from "db/client";
import { AdminMiddleware } from "../middlewares/adminMiddleware";

export const ordersRouter = Router();

ordersRouter.get("/", UserMiddleware, async (req, res) => {
  const userId = req.userId;

  const orders = await prismaClient.order.findMany({
    where: {
      userId,
    },
  });

  res.json({
    orders,
  });
});

ordersRouter.get("/:orderId", UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const orderId = req.params.orderId;

  const order = await prismaClient.order.findUnique({
    where: {
      userId,
      id: orderId,
    },
  });

  res.json({
    order,
  });
});

ordersRouter.get("/all", AdminMiddleware, async (req, res) => {
  const orders = await prismaClient.order.findMany();

  res.json({
    orders,
  });
});

ordersRouter.post("/", UserMiddleware, async (req, res) => {
  const userId = req.userId as string;
  const { total } = req.body;

  const order = await prismaClient.order.create({
    data: {
      total,
      userId,
    },
  });

  if (!order) {
    res.status(500).json({
      message: "Failed to create order",
    });
    return;
  }

  res.json({
    order,
  });
});

ordersRouter.put("/:orderId", AdminMiddleware, async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  if (!order) {
    res.status(500).json({
      message: "Failed to create order",
    });
    return;
  }

  res.json({
    order,
  });
});
