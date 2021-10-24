// @ts-check
const Profile = require("./profile");

class User extends Profile {
  password;
  status;
  /** @constructor
   * @param {import("./profile")} profile
   * @param {string | undefined} password
   * @param {string | undefined} status
   */
  constructor(profile, password, status) {
    super(profile.id, profile.userName, profile.email);
    this.password = password;
    this.status = status;
  }
  /**@function update
   * @param {import("../database/Users").User} user
   */
  update(user) {
    this.updatedAt = new Date().toISOString();
    for (const userField in user) {
      if (userField !== "id" && userField in this) {
        this[userField] = user[userField];
      }
    }
  }
}

module.exports = User;
