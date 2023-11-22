const express = require('express');
const router = express.Router();

const collectionRoutes = require('./collection');
const generateRoutes = require('./generate');
const loginRoutes = require('./login');
const usersRoutes = require('./users');

router.use("/", collectionRoutes);
router.use("/", generateRoutes);
router.use("/", loginRoutes);
router.use("/", usersRoutes);

router.get("/", (req, res) => {
  res.send('Application Express opérationnelle !');
});

module.exports = router;
