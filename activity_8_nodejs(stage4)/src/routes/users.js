//@ts-check
const express = require("express");
const mockData = require("../db");

const userRouter = express.Router();

// get all users
userRouter.get("/all", (req, res) => {
  res.json(mockData);
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

  if (newUser && newUser?.id) {
    const userWithThatId = mockData.find(
      (userData) => userData.id === newUser.id
    );
    userWithThatId
      ? res.json({ message: "user with such id already exists change user id" })
      : (() => {
          mockData.push(newUser);
          res.json({ message: "user sucessfully added" });
        })();
  } else {
    res.status(404).json({ error: "cannot send empty data" });
  }
});

// update a user
userRouter.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const { firstName, lastName, address } = req.body;

  if (!isNaN(userId)) {
    const user = mockData.find((user) => user.id === userId);
    if (firstName || lastName || address) {
      firstName ? (user.firstName = firstName) : null;
      lastName ? (user.lastName = lastName) : null;
      address
        ? (() => {
            if (address.country || address.city) {
              user.address.country
                ? (user.address.country = address.country)
                : null;
              user.address.city ? (user.address.city = address.city) : null;
            }
          })()
        : null;

      res.json({ message: "successfully updated user" });
    } else {
      res.json({ message: " cannot update with empty fields" });
    }
  } else {
    res.status(404).json({ error: "id must be an integer" });
  }
});

// delete a user
userRouter.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let userId = parseInt(id);

  if (!isNaN(userId)) {
    const userIdx = mockData.findIndex((user) => user.id === userId);
    const user = mockData.find((user) => user.id === userId);

    userIdx > -1
      ? (() => {
          mockData.splice(userIdx, 1);
          res.json({
            message: `successfully deleted user with id ${id}`,
            deletedUser: user,
          });
        })()
      : res.json({ message: "no user with such id" });
  } else {
    res.send(404).json({ error: "userId required" });
  }
});

module.exports = userRouter;
