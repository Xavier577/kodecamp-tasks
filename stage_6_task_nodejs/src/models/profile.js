// @ts-check
class Profile {
  id;
  email;
  createdAt;
  updatedAt;
  /** @constructor
   * @param {string | undefined} id
   * @param {string | undefined} userName
   * @param {string | undefined} email
   */
  constructor(id, userName, email) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
  /**@function setUserName
   * @param {import("../database/Profiles").Profile} profile
   * @return {void}
   */
  update(profile) {
    this.updatedAt = new Date().toISOString();
    for (const profileField in profile) {
      if (profileField !== "id" && profileField in this) {
        this[profileField] = profile[profileField];
      }
    }
  }
}

module.exports = Profile;
