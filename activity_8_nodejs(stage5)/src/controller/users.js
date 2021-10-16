//@ts-check
const Users = require("../model/database");
const supportedFileExtensions = require("../helpers/supportedImageExt");
const path = require("path");
const { rmSync } = require("fs");

module.exports.getAllUsers = (req, res) => {
  if (Users.length > 0) res.json(Users);
  else res.json({ message: "no user in record" });
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id);

  if (isNaN(intId)) {
    res.status(404).json({ error: "id must be a number" });
  } else {
    const result = Users.find((userData) => userData.id === intId);
    result ? res.json(result) : res.json({ message: "no user with such id" });
  }
};

module.exports.addUser = (req, res) => {
  const { newUser } = req.body;
  const { file } = req;

  console.log(file); // remove this afterwards

  if (newUser && newUser?.id) {
    const user = Users.find((userData) => userData.id === newUser.id);

    if (user) {
      res.json({ message: `user with id ${newUser.id} already exists ` });
    } else {
      Users.push(newUser);
      let msgObj = { message: "user successfully added" };
      const fileExtension = path
        .extname(file?.originalname || "")
        .toLowerCase();
      file
        ? supportedFileExtensions.includes(fileExtension)
          ? (newUser.profileImage = `${file.destination}/${file.filename}`)
          : (msgObj = { ...msgObj, error: "image format not supported" })
        : null;

      res.json(msgObj);
    }
  } else {
    res
      .status(404)
      .json({ error: "cannot send empty data or data without an id" });
  }
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  const { firstName, lastName, address } = req.body;

  const { file } = req;

  console.log(file); // remove this afterwards

  if (!isNaN(userId)) {
    const user = Users.find((user) => user.id === userId);
    let msgObj = { message: "successfully updated user" };
    if (firstName || lastName || address || file) {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (file) {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        supportedFileExtensions.includes(fileExtension)
          ? (user.profileImage = `${file.destination}/${file.filename}`)
          : (msgObj = { ...msgObj, error: "file format not supported" });
      }
      if (address && (address.country || address.city)) {
        user.address = user.address
          ? {
              ...user.address,
              ...address,
            }
          : {
              ...address,
            };
      }
      msgObj.error ? res.status(404).json(msgObj) : res.json(msgObj);
    } else {
      res.json({ message: " cannot update with empty fields" });
    }
  } else {
    res.status(404).json({ error: "id must be an integer" });
  }
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  let userId = parseInt(id);

  if (!isNaN(userId)) {
    const userIdx = Users.findIndex((user) => user.id === userId);
    const user = Users.find((user) => user.id === userId);

    if (userIdx) {
      Users.splice(userIdx, 1);
      res.json({
        message: `successfully deleted user with id ${id}`,
        deleteUser: user,
      });
    } else res.json({ message: "no user with such id" });
  } else {
    res.send(404).json({ error: "userId required" });
  }
};
