const port = 4000;
const app = require('./app-config');

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
