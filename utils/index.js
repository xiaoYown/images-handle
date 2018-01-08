const path = require('path');
const config = require('../config/config');

// 只作 browser view 访问转换
exports.pathname = function (page) {
  let fullPath = page
  switch (config.end) {
    case 'dev':
      fullPath = path.join(config.pathUrl, page);
      break;
    case 'bs':
      fullPath = path.join(config.api, page);
      break;
    case 'cs':
      fullPath = path.join(__dirname, './dist', page + '.html')
      break;
  }
  return fullPath;
}