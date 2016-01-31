var nodemailer = require('nodemailer');
var fs = require('fs');

function createEmailContent() {
	return fs.readFileSync('test/fixtures/emailContent.html', 'utf-8');
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