import { prismaClient } from "db/client";
import { Router } from "express";
import { AdminMiddleware } from "../middlewares/adminMiddleware";

export const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  const categories = await prismaClient.category.findMany();

  res.json({
    categories,
  });
});

categoriesRouter.get("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  const category = await prismaClient.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  res.json({
    category,
  });
});

categoriesRouter.post("/", AdminMiddleware, async (req, res) => {
  const { name, products } = req.body;

  const category = await prismaClient.category.create({
    data: {
      name,
      products,
    },
  });

  if (!category) {
    res.status(500).json({
      message: "Failed to create category",
    });
    return;
  }

  res.json({
    category,
  });
});

categoriesRouter.delete("/categoryId", AdminMiddleware, async (req, res) => {
  const categoryId = req.params.categoryId;

  const deletedcategory = await prismaClient.category.delete({
    where: {
      id: categoryId,
    },
  });

  if (!deletedcategory) {
    res.status(500).json({
      message: "Failed to delete category",
    });
    return;
  }

  res.json({
    deletedcategory,
  });
});
