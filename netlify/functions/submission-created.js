const nodemailer = require('nodemailer');

exports.handler = async (event) => {
	try {
		if (!event.body) {
			return {
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ error: 'Missing request body' }),
			};
		}

		const data = JSON.parse(event.body);

		// Basic validation so we don't send empty emails
		if (!data || (!data.email && !data.name)) {
			return {
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ error: 'Invalid submission payload' }),
			};
		}

		// SMTP config (matching your other repo)
		const smtpHost = process.env.SMTP_HOST; // e.g. smtp.gmail.com
		const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
		const smtpUser = process.env.SMTP_USER;
		const smtpPass = process.env.SMTP_PASSWORD;
		const toEmail = process.env.TO_EMAIL || smtpUser;

		if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !toEmail) {
			console.error('Missing SMTP environment variables');
			return {
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ error: 'Email not configured' }),
			};
		}

		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			secure: smtpPort === 465, // false for 587, true for 465
			auth: {
				user: smtpUser,
				pass: smtpPass,
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
			from: smtpUser,
			to: toEmail,
			subject,
			text: textLines.join('\n'),
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: 'success', message: 'Email sent' }),
		};
	} catch (error) {
		console.error('Error in submission-created function:', error);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: 'Error processing submission', details: error.message }),
		};
	}
};

