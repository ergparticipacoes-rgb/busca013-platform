const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

// GET /api/properties - list with filters and pagination
router.get('/', async (req, res, next) => {
  try {
    const {
      city, type, minPrice, maxPrice, bedrooms, bathrooms, featured, q,
      sort, page = 1, limit = 20, active = 'true'
    } = req.query;

    const filter = {};
    if (active === 'true') filter['flags.active'] = true;
    if (featured === 'true') filter['flags.featured'] = true;
    if (city) filter.city = city;
    if (type) filter.type = type;
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) filter.bathrooms = { $gte: Number(bathrooms) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { neighborhood: new RegExp(q, 'i') }
      ];
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    if (sort === 'price_desc') sortObj = { price: -1 };
    if (sort === 'newest') sortObj = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Property.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Property.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

// GET /api/properties/:code - details
router.get('/:code', async (req, res, next) => {
  try {
    const item = await Property.findOne({ code: req.params.code });
    if (!item) return res.status(404).json({ message: 'Property not found' });
    res.json(item);
  } catch (err) { next(err); }
});

module.exports = router;