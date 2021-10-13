//@ts-check
const express = require("express");
const mockData = require("../db");

const userRouter = express.Router();

// get all users
userRouter.get("/all", (req, res) => {
  console.log(req.body);
  res.json(mockData);
});

userRouter.post("/all", (req, res) => {
  console.log(req.body);
});

// get a single user with an id
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  if (isNaN(intId)) {
    res.status(404).json({ error: "id must be a number" });
  } else {
    const result = mockData.find((userData) => userData.id === intId);
    result ? res.json(result) : res.json({ message: "no user with such id" });
  }
});

// add a user
userRouter.post("/new", (req, res) => {
  const { newUser } = req.body;
  console.log(req.body);
  if (newUser && newUser?.id) {
    const userWithThatId = mockData.find(
      (userData) => userData.id === newUser.id
    );
    userWithThatId
      ? res.json({ message: "user with such id already exists" })
      : mockData.push(newUser);
  } else {
    res.status(404).json({ error: "cannot send empty data" });
  }
});

// update a user

// delete a user

module.exports = userRouter;
