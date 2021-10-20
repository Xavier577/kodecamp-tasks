import express from "express";
import indexRouter from "./routes/index.mjs";
import authRouter from "./routes/auth.mjs";

const app = express();

const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(PORT, hostname, () =>
  console.log(`listening on http://${hostname}:${PORT}`)
);
