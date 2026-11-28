import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import dashboardRouter from './routes/dashboard.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check — handy for uptime checks and submission evidence.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/dashboard', dashboardRouter);

// Unknown /api routes -> consistent JSON 404, then the final error handler.
app.use('/api', notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`StockTrack server running on http://localhost:${PORT}`);
});
