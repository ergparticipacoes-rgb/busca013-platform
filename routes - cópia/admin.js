const express = require('express');
const bcrypt = require('bcryptjs');
const Property = require('../models/Property');
const User = require('../models/User');
const Lead = require('../models/Lead');
const { generateProperties } = require('../utils/generateProperties');
const router = express.Router();

// GET /api/admin/status
router.get('/status', async (req, res, next) => {
  try {
    const [total, demos, leads] = await Promise.all([
      Property.countDocuments({}),
      Property.countDocuments({ 'flags.demo': true }),
      Lead.countDocuments({})
    ]);
    res.json({ totalProperties: total, demoProperties: demos, totalLeads: leads });
  } catch (err) { next(err); }
});

// GET /api/admin/seed - recreate admin + demo data (240)
router.get('/seed', async (req, res, next) => {
  try {
    // Admin fixed (recreate/overwrite)
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@busca013.com';
    const adminPass = process.env.SEED_ADMIN_PASSWORD || 'busca013@admin';
    const passwordHash = await bcrypt.hash(adminPass, 10);
    await User.findOneAndUpdate(
      { email: adminEmail },
      { name: 'Admin Busca 013', email: adminEmail, passwordHash, role: 'admin' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Remove previous demo properties and related leads
    const demoCodes = (await Property.find({ 'flags.demo': true }, { code: 1 })).map(p => p.code);
    await Lead.deleteMany({ propertyCode: { $in: demoCodes } });
    await Property.deleteMany({ 'flags.demo': true });

    // Insert 240 demo properties
    const props = generateProperties(240);
    const inserted = await Property.insertMany(props);
    res.json({ ok: true, inserted: inserted.length, admin: adminEmail });
  } catch (err) { next(err); }
});

// DELETE /api/admin/clear-demos - delete demo properties + leads tied to them
router.delete('/clear-demos', async (req, res, next) => {
  try {
    const demoCodes = (await Property.find({ 'flags.demo': true }, { code: 1 })).map(p => p.code);
    const [leadRes, propRes] = await Promise.all([
      Lead.deleteMany({ propertyCode: { $in: demoCodes } }),
      Property.deleteMany({ 'flags.demo': true })
    ]);
    res.json({ ok: true, leadsDeleted: leadRes.deletedCount, demoPropsDeleted: propRes.deletedCount });
  } catch (err) { next(err); }
});

module.exports = router;