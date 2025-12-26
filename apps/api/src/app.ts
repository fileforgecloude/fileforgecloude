import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import requestLogger from "./middlewares/requestLogger";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// application routes
app.use("/api/v1", router);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
