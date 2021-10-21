const express = require("express");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 3000;
const hostname = "127.0.0.1";

app.use(express.json());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(PORT, hostname, () =>
  console.log(`listening on http://${hostname}:${PORT}`)
);
