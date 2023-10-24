const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306
};

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function launchServer(db) {
  app.get('/', (req, res) => {
    res.send('Application Express opérationnelle !');
  });

  app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/sign-up', (req, res) => {
    const { username, email, password } = req.body;

    const query = 'SELECT * FROM users WHERE name = ? OR email = ?';

    db.query(query, [username, email], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur');
      } else {
        if (results.length > 0) {
          res.status(200).send('Un utilisateur avec ce nom ou cet email existe déjà');
        } else {
          const query = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';

          const key = process.env.HASH_KEY;

          const hash = crypto.createHmac('sha256', key);
          hash.update(password);

          const newPass = hash.digest('hex');

          db.query(query, [username, email, newPass], (err, results) => {
            if (err) {
              res.status(500).send('Erreur lors de la création du compte');
            } else {
              res.status(201).json(results);
            }
          });
        }
      }
    });
  });

  app.post('/log-in', (req, res) => {
    const { username, password } = req.body;

    const key = process.env.HASH_KEY;

    const hash = crypto.createHmac('sha256', key);
    hash.update(password);

    const newPass = hash.digest('hex');

    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';

    db.query(query, [username, newPass], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur');
      } else {
        if (results.length > 0) {
          res.status(200).json(results);
        } else {
          res.status(400).send('Aucun utilisateur avec ce nom et ce mot de passe');
        }
      }
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
