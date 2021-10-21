/**
 * @function UserCreator
 * @param {string} id
 * @param {string} email
 * @param {string} password
 * @param {string} status
 */
const createUserData = (id, email, password, status) => ({
  id,
  email,
  password,
  status,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

class UserProfile {
  constructor(id, email) {
    this.id = id;
    this.email = email;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

class UserData extends UserProfile {
  constructor(profile, password) {
    super(profile.id, profile.email);
    this.password = password;
    this.status = "pending";
  }
}

const profile = new UserProfile("xxx-1100-789s", "josephtsegen10@gmail.com");
const user = new UserData(profile, "1234");

console.log(profile, user);
