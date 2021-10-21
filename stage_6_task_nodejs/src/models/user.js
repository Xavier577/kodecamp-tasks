// @ts-check
const Profile = require("./profile");

class User extends Profile {
  password;
  status;
  /** @constructor
   * @param {import("./profile")} profile
   * @param {string} password
   * @param {string} status
   */
  constructor(profile, password, status) {
    super(profile.id, profile.userName, profile.email);
    this.password = password;
    this.status = status;
  }
}

module.exports = User;
