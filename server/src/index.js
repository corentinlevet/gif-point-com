const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Bienvenue sur ma première application Express !');
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
