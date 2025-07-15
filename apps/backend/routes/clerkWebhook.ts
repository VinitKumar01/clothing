import { verifyWebhook } from "@clerk/express/webhooks";
import { prismaClient } from "db/client";
import express, { Router } from "express";

export const clerkWebhookRouter = Router();

clerkWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const event = await verifyWebhook(req, {
        signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
      });
      if (event.type === "user.created") {
        const { id, email_addresses } = event.data;
        await prismaClient.user.create({
          data: {
            clerkId: id,
            email: email_addresses[0]?.email_address as string,
          },
        });
      }
      res.status(200).json({ message: "Handled" });
    } catch (error) {
      console.error("Error handling Clerk webhook:", error);
      res.status(500).json({ error: "Failed to handle webhook" });
    }
  },
);
