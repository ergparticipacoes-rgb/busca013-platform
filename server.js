require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const propertiesRouter = require('./routes/properties');
const leadsRouter = require('./routes/leads');
const adminRouter = require('./routes/admin');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

connectDB();

app.get('/', (req, res) => {
  res.json({ ok: true, name: 'Busca Imóveis 013 API', version: 'REV2' });
});

app.use('/api/properties', propertiesRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/admin', adminRouter);

// 404 + error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));