import { prismaClient } from "db/client";
import { Router } from "express";
import { AdminMiddleware } from "../middlewares/adminMiddleware";

export const collectionsRouter = Router();

collectionsRouter.get("/", async (req, res) => {
  const collections = await prismaClient.collection.findMany();

  res.json({
    collections,
  });
});

collectionsRouter.get("/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;

  const collection = await prismaClient.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  res.json({
    collection,
  });
});

collectionsRouter.post("/", AdminMiddleware, async (req, res) => {
  const { name, products } = req.body;

  const collection = await prismaClient.collection.create({
    data: {
      name,
      products,
    },
  });

  if (!collection) {
    res.status(500).json({
      message: "Failed to create collection",
    });
    return;
  }

  res.json({
    collection,
  });
});

collectionsRouter.delete("/collectionId", AdminMiddleware, async (req, res) => {
  const collectionId = req.params.collectionId;

  const deletedCollection = await prismaClient.collection.delete({
    where: {
      id: collectionId,
    },
  });

  if (!deletedCollection) {
    res.status(500).json({
      message: "Failed to delete collection",
    });
    return;
  }

  res.json({
    deletedCollection,
  });
});
