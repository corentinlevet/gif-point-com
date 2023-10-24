import React, { useState, useEffect } from "react";
import expressServer from "../../api/express-server";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    expressServer.getUsers().then((response) => {
      setUsers(response.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>

      {
        users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun utilisateur à afficher</p>
        )
      }

    </div>
  );
}

export default Home;
