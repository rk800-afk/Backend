const multer = require('multer');
const mongoose = require('mongoose');

const { getStorage } = require('./storage');

// Model of the collection 'defibrillators'
const { Car } = require('../../../db/models');

// Handler for server error
const { resServerError } = require('../../../shared/utils');

module.exports.createImage = (req, res) => {
  const upload = multer({
    storage: getStorage(mongoose.connection.name)
  }).single('image');
  console.log(req.body);
  upload(req, res, async (err) => {
    try {
      console.log(req.file);
      const newImage = req.file

      if (!newImage) {
        res.status(400).json({
          message: "You Must Set Image"
        });
        return
      }

      await Car.findByIdAndUpdate(
        req.params.carId,
        {
          image: newImage
        },
        { new: true }
      );

      res.status(201).json({
        image: req.file
      });
    } catch (e) {
      resServerError(res, e);
    }
  });
};

module.exports.removeImage = async (req, res) => {
  try {
    await Car.findByIdAndUpdate(
      req.params.carId,
      {
        image: ""
      },
      { new: true }
    );
  } catch (e) {
    resServerError(res, e);
  }
};