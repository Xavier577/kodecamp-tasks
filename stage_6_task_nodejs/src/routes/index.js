// @ts-check
const express = require("express");

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = indexRouter;
