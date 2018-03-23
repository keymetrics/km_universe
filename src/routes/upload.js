const express = require('express');
const router = express.Router();
const utils = require('../utils/upload');
const resource = require('../resource');
const tag = require('../tag');

router.post('/', async (req, res) => {
  const tags = req.body.tags.split(';');
  const file = req.files.myfile;
  const type = file.mimetype;
  file.name = file.name.replace(/(\.[\w\d_-]+)$/i, '_' + new Date().getTime() + '$1');

  const elementId = await resource.save(file.name, type);
  await utils.upload(req, res, file, elementId);
  await tag.save(tags, elementId);

  res.status(200).send();
});

module.exports = router;
