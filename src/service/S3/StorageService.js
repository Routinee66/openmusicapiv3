const AWS = require('aws-sdk');
const config = require('../../utils/config');

class StorageService {
  constructor() {
    this.S3 = new AWS.S3();
  }

  writeFile(file, meta) {
    const parameter = {
      Bucket: config.s3.bucketName, // Nama S3
      Key: +new Date() + meta.filename, // Nama berkas
      // eslint-disable-next-line no-underscore-dangle
      Body: file._data, // Berkas (dalam bentuk buffer)
      ContentType: meta.headers['content-type'], // MIME Tipe Berkas
    };
    return new Promise((resolve, reject) => {
      this.S3.upload(parameter, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data.Location);
      });
    });
  }
}

module.exports = StorageService;
