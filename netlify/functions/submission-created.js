const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
	// Only allow POST
	if (event.httpMethod && event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: 'Method not allowed' }),
		};
	}

	// Parse JSON body
	let data;
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

		data = JSON.parse(event.body);
	} catch (error) {
		console.error('Error parsing JSON body:', error);
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: 'Invalid request body' }),
		};
	}

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

	// Log env presence (like the working contact.js)
	console.log('Checking environment variables...');
	console.log('SMTP_HOST:', process.env.SMTP_HOST ? 'SET' : 'MISSING');
	console.log('SMTP_PORT:', process.env.SMTP_PORT ? 'SET' : 'MISSING');
	console.log('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'MISSING');
	console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'SET' : 'MISSING');
	console.log('TO_EMAIL:', process.env.TO_EMAIL ? 'SET' : 'MISSING');

	const smtpConfig = {
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || '587', 10),
		secure: false, // same as working contact.js (587 with STARTTLS)
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	};

	const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER;

	// Verify SMTP configuration exists
	if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass || !toEmail) {
		console.error('SMTP configuration missing:', {
			hasHost: !!smtpConfig.host,
			hasUser: !!smtpConfig.auth.user,
			hasPass: !!smtpConfig.auth.pass,
			hasTo: !!toEmail,
		});
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error: 'Email not configured',
				details: 'Missing required SMTP environment variables',
			}),
		};
	}

	const transporter = nodemailer.createTransport(smtpConfig);

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

	const html = `
		<!doctype html>
		<html lang="en">
		<head>
		  <meta charset="utf-8" />
		  <title>${subject}</title>
		  <style>
		    body { background-color: #020617; margin: 0; padding: 24px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e5e7eb; }
		    .card { max-width: 640px; margin: 0 auto; background: radial-gradient(circle at top left, rgba(15,23,42,0.86), #020617); border-radius: 16px; border: 1px solid rgba(148,163,184,0.5); padding: 20px 22px; }
		    .eyebrow { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #9ca3af; margin-bottom: 4px; }
		    .heading { font-size: 18px; font-weight: 600; margin: 0 0 12px; }
		    .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(148,163,184,0.5); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #e5e7eb; background: radial-gradient(circle at 30% 20%, #38bdf8, #0ea5e9); }
		    .meta { font-size: 13px; color: #9ca3af; margin-bottom: 14px; }
		    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #9ca3af; margin-top: 14px; margin-bottom: 4px; }
		    .value { font-size: 14px; }
		    .footer { margin-top: 18px; font-size: 12px; color: #9ca3af; border-top: 1px solid rgba(148,163,184,0.35); padding-top: 10px; }
		  </style>
		</head>
		<body>
		  <div class="card">
		    <div class="eyebrow">Pilot Station Place • Goldsboro, NC</div>
		    <h1 class="heading">New interest from ${data.name || 'Website visitor'}</h1>
		    <div class="meta">
		      <span class="pill">${data.interestType === 'showing' ? 'Showing request' : 'Pre-leasing interest'}</span>
		      <div style="margin-top:8px;">
		        Submitted from: ${data.site_url || 'Unknown site'}
		      </div>
		    </div>

		    <div>
		      <div class="label">Name</div>
		      <div class="value">${data.name || '—'}</div>

		      <div class="label">Email</div>
		      <div class="value">${data.email || '—'}</div>

		      <div class="label">Phone</div>
		      <div class="value">${data.phone || '—'}</div>
		    </div>

		    <div>
		      <div class="label">Interest type</div>
		      <div class="value">${data.interestType || '—'}</div>
		    </div>

		    <div>
		      <div class="label">Details</div>
		      <div class="value">${data.details || '(none provided)'}</div>
		    </div>

		    ${data.showingDetails ? `
		    <div>
		      <div class="label">Showing details</div>
		      <div class="value">${data.showingDetails}</div>
		    </div>
		    ` : ''}

		    <div class="footer">
		      This email was sent automatically from the Pilot Station Place pre-leasing site.
		    </div>
		  </div>
		</body>
		</html>
	`;

	try {
		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: toEmail,
			subject,
			text: textLines.join('\n'),
			html,
		});

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				status: 'success',
				message: 'Email sent successfully',
			}),
		};
	} catch (error) {
		console.error('Email error in submission-created:', error);
		console.error('Error stack:', error.stack);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error: 'Failed to send email',
				details: error.message,
			}),
		};
	}
};

