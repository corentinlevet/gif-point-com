const express = require('express');
const router = express.Router();

function saveImage({ res, userId, imageBase64 }) {
  const db = require('../db-config');

  const query = 'INSERT INTO images (base64, user_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';

  db.query(query, [imageBase64, userId], (err, results) => {
    if (err) {
      console.log('Error saving image: ', err);
      res.status(500).send('Erreur lors de la sauvegarde de l\'image');
    } else {
      res.status(201).json(results);
    }
  });
}

router.post('/save-image', (req, res) => {
  const { userId, imageBase64 } = req.body;

  if (!userId || !imageBase64) {
    res.status(400).send('Erreur lors de la sauvegarde de l\'image');
    return;
  }

  const db = require('../db-config');

  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la vérification de l\'existence de l\'utilisateur');
      return;
    }

    if (results.length === 0) {
      res.status(200).send('Cet utilisateur n\'existe pas');
      return;
    }

    saveImage({ res, userId, imageBase64 });
  });
});

router.get('/get-my-images', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).send('Erreur lors de la récupération des images');
    return;
  }

  const db = require('../db-config');

  const query = 'SELECT * FROM images WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des images');
    } else {
      const images = results.map((image) => {
        const base64 = Buffer.from(image.base64).toString();
        return {
          ...image,
          base64,
        };
      });

      res.status(200).json(images);
    }
  });
});

router.get('/get-my-gifs', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).send('Erreur lors de la récupération des GIFs');
    return;
  }

  const db = require('../db-config');

  const query = 'SELECT * FROM gifs WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des GIFs');
    } else {
      const gifs = results.map((gif) => {
        const base64 = Buffer.from(gif.base64).toString();
        return {
          ...gif,
          base64,
        };
      });

      res.status(200).json(gifs);
    }
  });
});

module.exports = router;
