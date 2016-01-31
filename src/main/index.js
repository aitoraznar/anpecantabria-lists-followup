// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Environment:', process.env.NODE_ENV);

var properties = require('../../properties');
var cantabriaService = require('../services/cantabriaService.js');
var emailService = require('../services/emailService.js');

cantabriaService.getFollowUpList(function(err, html) {
    var maestrosInfo = cantabriaService.extractInfo(html, properties.cantabria['list-folloup'].types.maestros);

    console.log('====> INFO', maestrosInfo);

    var alarm = cantabriaService.checkAlarm(maestrosInfo, 300);
    if (alarm.isAlert || alarm.isWarning) {
    	var emailContent = emailService.createEmailContent(maestrosInfo);
    	emailService.sendEmail(
    		properties.cantabria['list-folloup'].email.from,
    		properties.cantabria['list-folloup'].email.to, 
    		emailContent, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    
			    console.log('Message sent: ' + info.response);
			});
    }
});

