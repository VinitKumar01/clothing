import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";

const PORT = process.env.BACKEND_PORT!;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/health", healthRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

