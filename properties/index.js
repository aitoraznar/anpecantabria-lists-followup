'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var common = {

    cantabria: {
    	'list-folloup': {
    		uri: 'http://anpecantabria.org/wp/estado-actual-listas-por-cuerpos/',
    		method: 'POST',
    		types: {
    			maestros: { 
    				id: 597,
    				keyName: 'PEDAGOGÍA TERAPÉUTICA'
    			}
    		},
    		currentPosition: 345
    	}
    }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(common, require('./' + process.env.NODE_ENV + '.js') || {});
