import React, { useEffect } from "react";
import expressServer from "../../api/express-server";

function Home() {
  useEffect(() => {
    expressServer.ping().then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
