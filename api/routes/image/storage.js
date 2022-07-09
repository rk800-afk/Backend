const path = require('path');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');

const MONGO_URL = 'mongodb://127.0.0.1:27017/';

// Create GridFs storage for multer middleware
const getStorage = (url) => {
  const storage = new GridFsStorage({
    url: `${MONGO_URL}${url}`,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
              console.log(err);
              return reject(err);
          }

          const filename =
            buf.toString('hex') +
            path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'image'
          };

          console.log(fileInfo);

          resolve(fileInfo);
        });
      });
    }
  });

  return storage;
};

module.exports = { getStorage };
