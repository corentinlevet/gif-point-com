const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  const db = require('../db-config');

  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
