const constants = require('../constants');

class UploadController {

  async upload(req, res, file, elementId) {

    return new Promise((resolve, reject) => {
      let destDir = constants.uploadPath;

      file.mv(`${destDir}/${file.name}`, function(err) {
        if (err) {
          console.log(err);
          return reject(err);
        }

        resolve();
      });
    });
  }
}

module.exports = new UploadController();
