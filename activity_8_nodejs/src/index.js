const express = require("express");
const path = require("path");
const userRouter = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 8080;
const hostname = "127.0.0.1";

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use("/user", userRouter);

app.listen(PORT, hostname, () =>
  console.log(`listening on http://${hostname}:${PORT}`)
);
