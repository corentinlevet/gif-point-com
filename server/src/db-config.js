const mysql2 = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

function connectToDatabase() {
  const db = mysql2.createConnection(dbConfig);

  db.connect(function (err) {
    if (err) {
      console.error('Erreur de connexion à la base de données : ' + err.stack);
      return;
    }

    console.log('Connecté à la base de données MySQL avec l\'id ' + db.threadId);
  });

  return (db);
}

module.exports = connectToDatabase();
