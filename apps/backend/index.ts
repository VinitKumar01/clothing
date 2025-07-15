import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { clerkWebhookRouter } from "./routes/clerkWebhook";
import { productsRouter } from "./routes/productsRouter";
import { cartRouter } from "./routes/cartRouter";
import { ordersRouter } from "./routes/ordersRouter";
import { collectionsRouter } from "./routes/collectionsRouter";
import { categoriesRouter } from "./routes/categoriesRouter";
import { orderItemsRouter } from "./routes/orderItemsRouter";
import { adminRouter } from "./routes/adminRouter";

const PORT = process.env.BACKEND_PORT!;
const app = express();
app.use(cors());
app.use("/api/v1/clerk", clerkWebhookRouter); // can't use express.json() for this route as it expects raw req
app.use(express.json());
app.use("/api/v1/health", healthRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/orderItems", orderItemsRouter);
app.use("/api/v1/collections", collectionsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
