// @ts-check
class Profile {
  id;
  email;
  createdAt;
  updatedAt;
  /** @constructor
   * @param {string} id
   * @param {string} userName
   * @param {string} email
   */
  constructor(id, userName, email) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Profile;
