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

  logIn(username, password) {
    return this.api.post("/log-in", {
      username: username,
      password: password
    });
  }

  saveImage(userId, imageBase64) {
    return this.api.post("/save-image", {
      userId: userId,
      imageBase64: imageBase64
    });
  }

  getMyImages(userId) {
    return this.api.get("/get-my-images", {
      params: {
        userId: userId
      }
    });
  }

  getMyGIFs(userId) {
    return this.api.get("/get-my-gifs", {
      params: {
        userId: userId
      }
    });
  }

  async convertToGIF(userId, images) {
    const res = await this.api.post("/convert-to-gif", {
      userId: userId,
      images: images
    });

    return res;
  }

  async convertToImage(userId, gif) {
    const res = await this.api.post("/convert-to-image", {
      userId: userId,
      gif: gif
    });

    return res;
  }
}

const expressServer = new ExpressServer();
export default expressServer;
