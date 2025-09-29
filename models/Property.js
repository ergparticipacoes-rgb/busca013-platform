const mongoose = require('mongoose');

const FlagsSchema = new mongoose.Schema({
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  demo: { type: Boolean, default: false }
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  title: String,
  description: String,
  price: Number,
  city: String,
  state: { type: String, default: 'SP' },
  neighborhood: String,
  type: { type: String, enum: ['Casa', 'Apartamento', 'Terreno', 'Comercial', 'Kitnet', 'Sobrado', 'Cobertura', 'Chácara'], default: 'Casa' },
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  parking: Number,
  images: [String],
  whatsapp: String,
  flags: { type: FlagsSchema, default: () => ({}) }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);