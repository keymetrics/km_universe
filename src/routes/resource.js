const express = require('express');
const router = express.Router();
const resource = require('../resource');


router.get('/', async (req, res) => {

  const resources = await resource.get();

  res.status(200).send(resources);
});

module.exports = router;
