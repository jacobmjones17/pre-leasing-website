const nodemailer = require('nodemailer');
const multipart = require('parse-multipart-data');

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'ok', message: 'form-handler function is healthy' }),
        };
    }
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
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
        const rawContentType = event.headers && (event.headers['content-type'] || event.headers['Content-Type'] || '');
        const contentType = (rawContentType || '').toLowerCase();
        if (contentType.startsWith('multipart/form-data')) {
            const boundary = multipart.getBoundary(rawContentType);
            if (!boundary) throw new Error('Unable to determine multipart boundary');
            const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
            const parts = multipart.parse(bodyBuffer, boundary);
            data = {};
            for (const part of parts) {
                if (!part.filename && part.name) {
                    data[part.name] = part.data.toString('utf8');
                }
            }
        } else {
            data = JSON.parse(event.body);
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Invalid request body', details: error.message }),
        };
    }
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
    const smtpConfig = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    };
    const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER;
    if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass || !toEmail) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Email not configured', details: 'Missing required SMTP environment variables' }),
        };
    }
    const transporter = nodemailer.createTransport(smtpConfig);
    const propertySlug = data.property || '';
    const propertyName = data.propertyName || propertySlug || '(not specified)';
    const listType = data.listType || (data.interestType === 'showing' ? 'showing' : 'pre-leasing');

    const listTypeLabels = {
        'pre-leasing': 'Pre-leasing list',
        waitlist: 'Waitlist',
        showing: 'Showing request',
    };
    const listTypeLabel = listTypeLabels[listType] || listTypeLabels['pre-leasing'];

    const subjectByListType = {
        'pre-leasing': `Pre-leasing signup: ${data.name || 'Website visitor'}`,
        waitlist: `Waitlist signup: ${data.name || 'Website visitor'}`,
        showing: `Showing request: ${data.name || 'Website visitor'}`,
    };
    const subject = subjectByListType[listType] || `New signup from ${data.name || 'Website visitor'}`;

    const textLines = [
        `Site: ${data.site_url || ''}`,
        `Property: ${propertyName}`,
        `List type: ${listTypeLabel}`,
        '',
        `Name: ${data.name || ''}`,
        `Email: ${data.email || ''}`,
        `Phone: ${data.phone || ''}`,
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
            <div class="eyebrow">FJPB Holdings • Goldsboro, NC</div>
            <h1 class="heading">${listTypeLabel}: ${data.name || 'Website visitor'}</h1>
            <div class="meta">
              <span class="pill">${listTypeLabel}</span>
              <div style="margin-top:8px;">Property: ${propertyName}</div>
              <div style="margin-top:4px;">Submitted from: ${data.site_url || 'Unknown site'}</div>
            </div>
            <div><div class="label">Name</div><div class="value">${data.name || '—'}</div><div class="label">Email</div><div class="value">${data.email || '—'}</div><div class="label">Phone</div><div class="value">${data.phone || '—'}</div></div>
            <div><div class="label">List type</div><div class="value">${listTypeLabel}</div></div>
            <div><div class="label">Details</div><div class="value">${data.details || '(none provided)'}</div></div>
            ${data.showingDetails ? `<div><div class="label">Showing details</div><div class="value">${data.showingDetails}</div></div>` : ''}
            <div class="footer">This email was sent automatically from the FJPB Holdings rental site.</div>
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
            body: JSON.stringify({ status: 'success', message: 'Email sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
        };
    }
};
