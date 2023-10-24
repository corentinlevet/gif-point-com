import axios from "axios";

class ExpressServer {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:4000/",
    });
  }

  ping() {
    return this.api.get("/");
  }

  getUsers() {
    return this.api.get("/users");
  }

  signUp(username, email, password) {
    return this.api.post("/sign-up", {
      username: username,
      email: email,
      password: password
    });
  }
}

const expressServer = new ExpressServer();
export default expressServer;
