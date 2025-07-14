import { prismaClient } from "db/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function AdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, {
    algorithms: ["RS256"],
  });

  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const userId = (decoded as any).sub;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  if (!user.isAdmin) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  req.userId = userId;
  next();
}
