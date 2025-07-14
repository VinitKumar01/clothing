import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { clerkWebhookRouter } from "./routes/clerkWebhook";

const PORT = process.env.BACKEND_PORT!;
const app = express();
app.use(cors());
app.use("/api/v1", clerkWebhookRouter); // can't use express.json() for this route as it expects raw req
app.use(express.json());
app.use("/api/v1", healthRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
