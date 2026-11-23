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

    const displayValue = (value, fallback = '—') => {
        const text = value == null ? '' : String(value).trim();
        return text || fallback;
    };
    const escapeHtml = (value) =>
        String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    const headingName = displayValue(data.name, 'Website visitor');
    const displayName = displayValue(data.name);
    const displayEmail = displayValue(data.email);
    const displayPhone = displayValue(data.phone);
    const displayDetails = displayValue(data.details, 'Not provided');
    const displayProperty = displayValue(propertyName, '(not specified)');
    const displaySite = displayValue(data.site_url, 'Unknown site');
    const showingDetailsText = displayValue(data.showingDetails, '');
    const linkStyle = 'color:#7DD3FC;text-decoration:underline;background-color:#0F172A;';
    const emailHtml =
        displayEmail === '—'
            ? '—'
            : `<a href="mailto:${escapeHtml(displayEmail)}" style="${linkStyle}">${escapeHtml(displayEmail)}</a>`;
    const phoneDigits = displayPhone === '—' ? '' : displayPhone.replace(/[^\d+]/g, '');
    const phoneHtml =
        displayPhone === '—'
            ? '—'
            : `<a href="tel:${escapeHtml(phoneDigits || displayPhone)}" style="${linkStyle}">${escapeHtml(displayPhone)}</a>`;

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
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="color-scheme" content="dark" />
          <meta name="supported-color-schemes" content="dark" />
          <title>${subject}</title>
          <style>
            :root { color-scheme: dark; }
            body { margin: 0; padding: 0; background-color: #020617; color: #F8FAFC; }
            a, a:link, a:visited { color: #7DD3FC !important; text-decoration: underline !important; }
            @media (prefers-color-scheme: dark) {
              .page { background-color: #020617 !important; color: #F8FAFC !important; }
              .card { background-color: #0F172A !important; color: #F8FAFC !important; border-radius: 16px !important; overflow: hidden !important; }
              .heading, .value { color: #F8FAFC !important; background-color: #0F172A !important; }
              .eyebrow, .meta, .label, .footer { color: #CBD5E1 !important; background-color: #0F172A !important; }
              .pill { background-color: #38BDF8 !important; color: #0F172A !important; }
              a, a:link, a:visited { color: #7DD3FC !important; background-color: #0F172A !important; }
            }
          </style>
        </head>
        <body class="page" bgcolor="#020617" style="margin:0;padding:0;background-color:#020617;color:#F8FAFC;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table role="presentation" class="page" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#020617" style="background-color:#020617;color:#F8FAFC;">
            <tr>
              <td align="center" bgcolor="#020617" style="background-color:#020617;padding:24px 12px;">
                <table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:16px;color:#F8FAFC;">
                  <tr>
                    <td class="card" bgcolor="#0F172A" style="padding:20px 22px;background-color:#0F172A;color:#F8FAFC;border:1px solid #64748B;border-radius:16px;overflow:hidden;">
                      <div class="eyebrow" style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#CBD5E1;background-color:#0F172A;margin:0 0 4px 0;">FJPB Holdings • Goldsboro, NC</div>
                      <h1 class="heading" style="font-size:18px;font-weight:600;margin:0 0 12px 0;color:#F8FAFC;background-color:#0F172A;">${escapeHtml(listTypeLabel)}: ${escapeHtml(headingName)}</h1>
                      <div class="meta" style="font-size:13px;color:#CBD5E1;background-color:#0F172A;margin:0 0 14px 0;">
                        <span class="pill" style="display:inline-block;padding:2px 8px;border-radius:999px;border:1px solid #0284C7;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#0F172A;background-color:#38BDF8;">${escapeHtml(listTypeLabel)}</span>
                        <div style="margin-top:8px;color:#CBD5E1;background-color:#0F172A;">Property: ${escapeHtml(displayProperty)}</div>
                        <div style="margin-top:4px;color:#CBD5E1;background-color:#0F172A;">Submitted from: ${escapeHtml(displaySite)}</div>
                      </div>
                      <div>
                        <div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">Name</div>
                        <div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${escapeHtml(displayName)}</div>
                        <div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">Email</div>
                        <div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${emailHtml}</div>
                        <div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">Phone</div>
                        <div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${phoneHtml}</div>
                      </div>
                      <div>
                        <div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">List type</div>
                        <div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${escapeHtml(listTypeLabel)}</div>
                      </div>
                      <div>
                        <div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">Details</div>
                        <div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${escapeHtml(displayDetails)}</div>
                      </div>
                      ${showingDetailsText ? `<div><div class="label" style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#CBD5E1;background-color:#0F172A;margin:14px 0 4px 0;">Showing details</div><div class="value" style="font-size:14px;color:#F8FAFC;background-color:#0F172A;">${escapeHtml(showingDetailsText)}</div></div>` : ''}
                      <div class="footer" style="margin-top:18px;font-size:12px;color:#CBD5E1;background-color:#0F172A;border-top:1px solid #64748B;padding-top:10px;">This email was sent automatically from the FJPB Holdings rental site.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
