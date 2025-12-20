const nodemailer = require('nodemailer');

exports.handler = async (event) => {
	try {
		if (!event.body) {
			return { statusCode: 400, body: 'Missing request body' };
		}

		const data = JSON.parse(event.body);

		// Basic validation so we don't send empty emails
		if (!data || (!data.email && !data.name)) {
			return { statusCode: 400, body: 'Invalid submission payload' };
		}

		const gmailUser = process.env.GMAIL_USER;
		const gmailPass = process.env.GMAIL_APP_PASSWORD;
		const recipients = process.env.LEAD_RECIPIENTS || gmailUser;

		if (!gmailUser || !gmailPass || !recipients) {
			console.error('Missing email environment variables.');
			return { statusCode: 500, body: 'Email not configured' };
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: gmailUser,
				pass: gmailPass,
			},
		});

		const subject = `New interest from ${data.name || 'Website visitor'}`;

		const textLines = [
			`Site: ${data.site_url || ''}`,
			'',
			`Name: ${data.name || ''}`,
			`Email: ${data.email || ''}`,
			`Phone: ${data.phone || ''}`,
			`Interest type: ${data.interestType || ''}`,
			'',
			'Details:',
			data.details || '(none)',
		];

		if (data.showingDetails) {
			textLines.push('', 'Showing details:', data.showingDetails);
		}

		await transporter.sendMail({
			from: gmailUser,
			to: recipients,
			subject,
			text: textLines.join('\n'),
		});

		return { statusCode: 200, body: 'Email sent' };
	} catch (error) {
		console.error('Error in submission-created function:', error);
		return { statusCode: 500, body: 'Error processing submission' };
	}
};

