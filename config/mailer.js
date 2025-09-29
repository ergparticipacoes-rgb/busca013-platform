const nodemailer = require('nodemailer');

const transporter = (() => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    console.log('Mail transport not fully configured; email sending will be skipped.');
    return null;
  }
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });
})();

async function sendMail({ to, subject, text, html }) {
  if (!transporter) return { skipped: true };
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  return transporter.sendMail({ from, to, subject, text, html });
}

module.exports = { sendMail };