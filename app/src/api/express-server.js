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
}

const expressServer = new ExpressServer();
export default expressServer;
