const fs = require('fs');

exports.fileExists = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.exists(filePath, function (exists) {
      resolve(exists);
    })
  })
}