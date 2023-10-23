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
}

const expressServer = new ExpressServer();
export default expressServer;
