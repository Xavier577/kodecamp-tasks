const express = require("express");
const path = require("path");
const userRouter = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
