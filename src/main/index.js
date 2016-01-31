// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Environment:', process.env.NODE_ENV);

var properties = require('../../properties');
var cron = require('cron');
var cantabriaService = require('../services/cantabriaService.js');
var emailService = require('../services/emailService.js');



cantabriaService.getFollowUpList(function(err, html) {
    var maestrosInfo = cantabriaService.extractInfo(html, properties.cantabria['list-folloup'].types.maestros);

    var alarm = cantabriaService.checkAlarm(maestrosInfo, properties.cantabria['list-folloup'].currentPosition);
    
	var emailContent = emailService.createEmailContent(maestrosInfo, alarm, properties.cantabria['list-folloup'].currentPosition);
	emailService.sendEmail(
		properties.cantabria['list-folloup'].email.from,
		properties.cantabria['list-folloup'].email.to, 
		emailContent, function(error, info){
		    if(error){
		        return console.log(error);
		    }

		    console.log('Message sent: ' + info.response);
		});
	
});

