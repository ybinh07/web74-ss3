class User {
    constructor(user) {
      this.email = user.email;
      this.password = user.password;
      this.username = user.username || "";
    }
  }
  
  export default User;
  