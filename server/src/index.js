const express = require('express');
const app = express();
const port = 4000;
const mysql2 = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306
};

function launchServer(db) {
  app.get('/', (req, res) => {
    res.send('Bienvenue sur ma première application Express !');
  });

  app.get('/users', (req, res) => {
    const query = "SELECT * FROM users;";

    db.query(query, function (err, result) {
      if (err) {
        console.error('Erreur lors de la récupération des utilisateurs : ' + err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log('Récupération des utilisateurs réussie');
      res.status(200).json(result);
    });
  });

  app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
  });
}

let nbReconnections = 0;
const maxReconnections = 6;

function connectToDatabase() {
  const db = mysql2.createConnection(dbConfig);

  db.connect(function (err) {
    if (err) {
      console.error('Erreur de connexion à la base de données : ' + err.message);

      if (nbReconnections < maxReconnections) {
        nbReconnections++;
        console.log(`Tentative de reconnexion #${nbReconnections} dans 10 secondes...`);
      } else {
        console.error(`Impossible de se connecter à la base de données après ${maxReconnections} tentatives. Arrêt du serveur.`);
        process.exit(1);
      }

      setTimeout(connectToDatabase, 10000);
    } else {
      console.log('Connexion à la base de données réussie');

      launchServer(db);
    }
  });
}

connectToDatabase();
