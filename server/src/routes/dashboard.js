import { Router } from 'express';
import { products, movements } from '../data/store.js';
import { getStockStatus } from '../utils/stockStatus.js';

const router = Router();

// GET /api/dashboard — summary totals for the Dashboard screen.
router.get('/', (req, res) => {
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => getStockStatus(p) === 'Low Stock').length;
  const outOfStockCount = products.filter((p) => getStockStatus(p) === 'Out of Stock').length;
  const totalStockValue = products.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  // Latest stock movements first, most recent 5.
  const recentActivity = [...movements].slice(-5).reverse();

  res.json({
    totalProducts,
    lowStockCount,
    outOfStockCount,
    totalStockValue,
    recentActivity,
  });
});

export default router;
