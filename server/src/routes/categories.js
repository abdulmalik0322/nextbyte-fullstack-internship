import { Router } from 'express';
import { categories, counters } from '../data/store.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

// GET /api/categories
router.get('/', (req, res) => {
  res.json(categories);
});

// POST /api/categories — body: { name }. Name must be unique (409).
router.post('/', (req, res) => {
  const body = req.body ?? {};
  if (typeof body.name !== 'string' || body.name.trim() === '') {
    throw new ApiError(400, 'name is required and must be a non-empty string');
  }
  const name = body.name.trim();
  if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
    throw new ApiError(409, `Category "${name}" already exists`);
  }
  const category = { id: ++counters.category, name };
  categories.push(category);
  res.status(201).json(category);
});

export default router;
