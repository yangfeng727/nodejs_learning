const log4js = require('log4js');

const appendersOption = {
  error: {
    type: 'file',
    filename: './logs/error/node_phantom.log',
    alwaysIncludePattern: true,
    layout: {
      type: 'pattern',
      'pattern': '[%h]\t[%d]\t[%p]\t%c\t%m'
    }
  }
};
const categoriesOption = {
  default: {appenders: ['error'], level: 'error'}
};

const init = () => {
  log4js.configure({
    appenders: appendersOption,
    categories: categoriesOption,
    pm2: true
  });
};

//写日志
const appLog = data => {
  let category = (data && data.category) || 'error',
    content = data.content || data,
    logger = log4js.getLogger(category);
  logger[category](content);
};

module.exports.appLog = appLog;
module.exports.initLog = init;
