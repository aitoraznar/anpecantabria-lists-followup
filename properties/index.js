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
    				//keyName: 'EDUCACIÓN INFANTIL'
    				//keyName: 'INGLÉS'
    				//keyName: 'FRANCÉS'
    				//keyName: 'EDUCACIÓN FÍSICA'
    				//keyName: 'MÚSICA'
    				keyName: 'PEDAGOGÍA TERAPÉUTICA'
    				//keyName: 'AUDICIÓN Y LENGUAJE'
    				//keyName: 'PRIMARIA'
    				//keyName: 'Ciencias Sociales'
    				//keyName: 'Matemáticas y Ciencias Naturales'
    				//keyName: 'Lengua y Literatura'
    			}
    		},
    		email: {
    			from: 'Anpe Cantabria List FollowUp <info@anpefollowup.com>',
    			to: 'renaitor@gmail.com, maitane.medina@gmail.com'
    		},
    		currentPosition: 345
    	}
    }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(common, require('./' + process.env.NODE_ENV + '.js') || {});
