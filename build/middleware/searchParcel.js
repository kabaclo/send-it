"use strict";

const express = require('express');

const parcels = require('../resources/PARCELS.json');

const searchparcelsApp = express();
searchparcelsApp.get('/:id', function (req, res) {
  const id = req.params.id;

  if (id in parcels) {
    return res.status(200).send(parcels[id]);
  }

  return res.status(200).send('The inputed parcel id was not found');
});
module.exports = searchparcelsApp;