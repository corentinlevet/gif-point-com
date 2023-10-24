const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/sign-up', (req, res) => {
  const db = require('../db-config');

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

router.post('/log-in', (req, res) => {
  const db = require('../db-config');

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

module.exports = router;
