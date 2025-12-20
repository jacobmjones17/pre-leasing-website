exports.handler = async (event) => {
	let nodemailer;
	try {
		nodemailer = require('nodemailer');
	} catch (error) {
		console.error('Failed to load nodemailer:', error);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ error: 'nodemailer load failed', details: error.message }),
		};
	}

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

		await transporter.sendMail({
			from: smtpUser,
			to: toEmail,
			subject,
			text: textLines.join('\n'),
			html,
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

