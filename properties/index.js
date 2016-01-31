'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var common = {

    

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = {
    development: _.merge(common, require('./development.js') || {}),
    test:        _.merge(common, require('./test.js') || {}),
    production:  _.merge(common, require('./production.js') || {})
}
