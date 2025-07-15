import { Router } from "express";
import { AdminMiddleware } from "../middlewares/adminMiddleware";
import { prismaClient } from "db/client";

export const adminRouter = Router();

adminRouter.put("/update", AdminMiddleware, async (req, res) => {
  const { userId, isAdmin } = req.body;

  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      isAdmin,
    },
  });

  if (!updatedUser) {
    res.status(500).json({
      message: "Failed to update user",
    });
    return;
  }

  res.json({
    updatedUser,
  });
});
