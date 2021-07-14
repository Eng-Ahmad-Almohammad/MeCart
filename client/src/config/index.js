const static_configuration = {
  serverURL: '',
  googleMapAPI: ''
};

var imported_configuration = {};
if (process.env.NODE_ENV === 'production') {
  imported_configuration = require('./config-prod');
} else {
  imported_configuration = require('./config-dev');
}

const config = {
  ...static_configuration, 
  ...imported_configuration
};

module.exports = config;