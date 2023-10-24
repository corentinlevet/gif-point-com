const express = require('express');
const router = express.Router();
const crypto = require('crypto');

function processSignUp({ res, username, email, password }) {
  const db = require('../db-config');

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

function signUp({ res, username, email, password }) {
  const db = require('../db-config');

  const query = 'SELECT * FROM users WHERE name = ? OR email = ?';

  db.query(query, [username, email], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur');
      return;
    }

    if (results.length > 0) {
      res.status(200).send('Un utilisateur avec ce nom ou cet email existe déjà');
      return;
    }

    processSignUp({ res, username, email, password });
  });
}

router.post('/sign-up', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send('Veuillez renseigner tous les champs');
    return;
  }

  signUp({ res, username, email, password });
});

function logIn({ res, username, password }) {
  const db = require('../db-config');

  const key = process.env.HASH_KEY;

  const hash = crypto.createHmac('sha256', key);
  hash.update(password);

  const newPass = hash.digest('hex');

  const query = 'SELECT * FROM users WHERE name = ? AND password = ?';

  db.query(query, [username, newPass], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur');
      return;
    }

    if (results.length > 0) {
      res.status(200).json(results);
      return;
    }

    res.status(400).send('Aucun utilisateur avec ce nom et ce mot de passe');
  });
}

router.post('/log-in', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Veuillez renseigner tous les champs');
    return;
  }

  logIn({ res, username, password });
});

module.exports = router;
