var nodemailer = require('nodemailer');
var fs = require('fs');

function createEmailContent(info, alarm, currentPosition) {
	var template = fs.readFileSync('test/fixtures/emailContent.html', 'utf-8')
			.replace(/{{specialty}}/gm, info.type)
			.replace(/{{vacantes_tiempo_completo}}/gm, info.vacantes_tiempo_completo)
			.replace(/{{vacantes_tiempo_parcial}}/gm, info.vacantes_tiempo_parcial)
			.replace(/{{vacantes_bilingues_tiempo_completo}}/gm, info.vacantes_bilingues_tiempo_completo)
			.replace(/{{vacantes_bilingues_tiempo_parcial}}/gm, info.vacantes_bilingues_tiempo_parcial)
			.replace(/{{sustituciones_tiempo_completo}}/gm, info.sustituciones_tiempo_completo)
			.replace(/{{sustituciones_tiempo_parcial}}/gm, info.sustituciones_tiempo_parcial)
			.replace(/{{sustituciones_bilingues_tiempo_completo}}/gm, info.sustituciones_bilingues_tiempo_completo)
			.replace(/{{sustituciones_bilingues_tiempo_parcial}}/gm, info.sustituciones_bilingues_tiempo_parcial)
			.replace(/{{lastUpdated}}/gm, info.lastUpdated);

	if (alarm.isAlert) {
		template = template.replace(/{{alert}}/gm, '<h2 style="color:red">Tienes una vacante activa con tu posición: <b>' + currentPosition + '</b></h2>');
	} else {
		template = template.replace(/{{alert}}/gm, '');
	}

	if (alarm.isWarning) {
		template = template.replace(/{{warning}}/gm, '<h2 style="color:orange">Cuidado!! Se acerca una vacante activa con tu posición: <b>' + currentPosition + '</b></h2>');
	} else {
		template = template.replace(/{{warning}}/gm, '');
	}

	return template;
}

function sendEmail(from, to, content, callback) {
	var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email id
            pass: process.env.EMAIL_PASS // Your password
        }
    });

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: from, // sender address
	    to: to, // list of receivemrs
	    subject: 'Anpe Cantabria Info', // Subject line
	    html: content // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, callback);
}

module.exports = {
	createEmailContent: createEmailContent,
	sendEmail: sendEmail
};