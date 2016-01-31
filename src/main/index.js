// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Environment:', process.env.NODE_ENV);

var cantabriaService = require('../services/cantabriaService.js');

cantabriaService.getFollowUpList(function(err, html) {
    var maestrosInfo = cantabriaService.extractInfo(html, properties.cantabria['list-folloup'].types.maestros);

    console.log('====> INFO', maestrosInfo);
});

