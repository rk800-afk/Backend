const multer = require('multer');
const mongoose = require('mongoose');

const { gridFSBucketService } = require('../../../shared/services/grid-fs-bucket');

const { getStorage } = require('./storage');

// Model of the collection 'defibrillators'
const { Car } = require('../../../db/models');

// Handler for server error
const { resServerError } = require('../../../shared/utils');

module.exports.getImage = async (req, res) => {
  try {
    gridFSBucketService
      .find({
        filename: req.params.imageName
      })
      .toArray((err, files) => {
        if (!files || files?.length === 0) {
          return res.status(404).json({
            message: 'Зображення з даним іменем відсутнє.'
          });
        }

        gridFSBucketService
          .openDownloadStreamByName(req.params.imageName)
          .pipe(res);
      });
  } catch (e) {
    resServerError(res, e);
  }
};

module.exports.createImage = (req, res) => {
  const upload = multer({
    storage: getStorage(mongoose.connection.name)
  }).single('image');

  upload(req, res, async (err) => {
    try {
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
          image: {...newImage}
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
        image: {}
      },
      { new: true }
    );
    res.status(200).json({ message: "Succ" })
  } catch (e) {
    resServerError(res, e);
  }
};
