const express = require('express');
const router = express.Router();
const { createCanvas, loadImage } = require('canvas');
const GIFencoder = require('gifencoder');
const GIFframes = require('gif-frames');

function saveGif({ res, userId, gifBase64 }) {
  const db = require('../db-config');

  const query = 'INSERT INTO gifs (base64, user_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';

  db.query(query, [gifBase64, userId], (err, results) => {
    if (err) {
      console.log('Error saving gif: ', err);
      res.status(500).send('Erreur lors de la sauvegarde de l\'image');
    } else {
      res.status(201).json(results);
    }
  });
}

async function encodeGif({ images }) {
  const firstImage = await loadImage(images[0]);

  const gifWidth = firstImage.width;
  const gifHeight = firstImage.height;

  const delay = 200;
  const delayBetweenFrames = delay || 1000;

  const encoder = new GIFencoder(gifWidth, gifHeight);

  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(delayBetweenFrames);
  encoder.setQuality(10);

  for (const imageB64 of images) {
    const image = await loadImage(imageB64);

    const canvas = createCanvas(gifWidth, gifHeight);
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, gifWidth, gifHeight);

    encoder.addFrame(context);
  }

  encoder.finish();

  return encoder;
}

async function convertToGIF({ res, userId, images }) {
  const encoder = await encodeGif({ images });

  const encoderData = encoder.out.getData();
  const gifBase64 = `data:image/gif;base64,${encoderData.toString('base64')}`;

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

    saveGif({ res, userId, gifBase64 });
  });
}

router.post('/convert-to-gif', async (req, res) => {
  const { userId, images } = req.body;

  if (!userId || !images) {
    res.status(400).send('Erreur lors de la conversion des images');
    return;
  }

  if (!Array.isArray(images) || images.length === 0) {
    res.status(400).send('Erreur lors de la conversion des images');
    return;
  }

  convertToGIF({ res, userId, images });
});

function saveImages({ res, userId, images }) {
  const db = require('../db-config');

  const query = 'INSERT INTO images (base64, user_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';

  images.forEach(image => {
    db.query(query, [image, userId], (err, results) => {
      if (err) {
        console.log('Error saving image: ', err);
        res.status(500).send('Erreur lors de la sauvegarde de l\'image');
      }
    });
  });

  res.status(201).json({ message: 'Images sauvegardées' });
}

async function convertToImage({ res, userId, gifToConvert }) {
  const db = require('../db-config');

  const gif = gifToConvert;

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

    const images = [];

    GIFframes({ url: gif, frames: "all", outputType: 'jpg' }).then((frameData) => {
      frameData.forEach((frame) => {
        const imageBuffer = frame.getImage()._obj;
        const base64 = "data:image/jpeg;base64," + imageBuffer.toString('base64');

        images.push(base64);
      });

      console.log('images: ', images);

      saveImages({ res, userId, images });
    });
  });
}

router.post('/convert-to-image', async (req, res) => {
  const { userId, gif } = req.body;

  if (!userId || !gif) {
    res.status(400).send('Erreur lors de la conversion des GIFs');
    return;
  }

  if (gif.length > 1) {
    res.status(400).send('Erreur lors de la conversion des GIFs');
    return;
  }

  const gifToConvert = gif[0];

  convertToImage({ res, userId, gifToConvert });
});

module.exports = router;
