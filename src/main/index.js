// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Environment:', process.env.NODE_ENV);

var properties = require('../../properties');
var cantabriaService = require('../services/cantabriaService.js');
var emailService = require('../services/emailService.js');

cantabriaService.getFollowUpList(function(err, html) {
    var maestrosInfo = cantabriaService.extractInfo(html, properties.cantabria['list-folloup'].types.maestros);

    console.log('====> INFO', maestrosInfo);

    var alarm = cantabriaService.checkAlarm(maestrosInfo);
    if (alarm) {
    	var emailContent = emailContent.createEmailContent(maestrosInfo);
    	emailService.sendEmail('ren_aitor@hotmail.com', emailContent, function(result) {

    	});
    }
});

