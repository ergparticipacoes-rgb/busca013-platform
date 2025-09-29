const express = require('express');
const Lead = require('../models/Lead');
const { sendMail } = require('../config/mailer');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, message, propertyCode } = req.body;
    if (!name || !phone || !propertyCode) {
      return res.status(400).json({ message: 'name, phone and propertyCode are required' });
    }
    const lead = await Lead.create({ name, email, phone, message, propertyCode });

    // attempt email
    const TO = process.env.LEADS_EMAIL_TO || process.env.EMAIL_USER;
    if (TO) {
      const subject = `Novo lead - ${propertyCode} - Busca Imóveis 013`;
      const html = `<p><b>Nome:</b> ${name}<br/>
      <b>Telefone:</b> ${phone}<br/>
      <b>E-mail:</b> ${email || ''}<br/>
      <b>Imóvel:</b> ${propertyCode}<br/>
      <b>Mensagem:</b> ${message || ''}</p>`;
      try { await sendMail({ to: TO, subject, html }); } catch(e) { /* ignore */ }
    }

    res.status(201).json({ ok: true, leadId: lead._id });
  } catch (err) { next(err); }
});

module.exports = router;