import { Router } from 'express';
import { products, movements, counters } from '../data/store.js';
import { withStatus, needsRestock } from '../utils/stockStatus.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

function findProduct(idParam) {
  const id = Number(idParam);
  if (!Number.isInteger(id)) return undefined;
  return products.find((p) => p.id === id);
}

// Validates a product payload. With `partial: true` (PUT) only the fields
// that are present are checked; otherwise all required fields must exist.
// Returns an object with only the allowed, validated fields.
function validateProduct(body, { partial = false } = {}) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw new ApiError(400, 'Request body must be a JSON object');
  }
  const data = {};
  const has = (key) => Object.prototype.hasOwnProperty.call(body, key);

  if (!partial || has('name')) {
    if (typeof body.name !== 'string' || body.name.trim() === '') {
      throw new ApiError(400, 'name is required and must be a non-empty string');
    }
    data.name = body.name.trim();
  }
  if (!partial || has('sku')) {
    if (typeof body.sku !== 'string' || body.sku.trim() === '') {
      throw new ApiError(400, 'sku is required and must be a non-empty string');
    }
    data.sku = body.sku.trim();
  }
  if (!partial || has('category')) {
    if (typeof body.category !== 'string' || body.category.trim() === '') {
      throw new ApiError(400, 'category is required and must be a non-empty string');
    }
    data.category = body.category.trim();
  }
  if (!partial || has('quantity')) {
    if (!Number.isInteger(body.quantity) || body.quantity < 0) {
      throw new ApiError(400, 'quantity must be an integer greater than or equal to 0');
    }
    data.quantity = body.quantity;
  }
  if (!partial || has('unitPrice')) {
    if (typeof body.unitPrice !== 'number' || Number.isNaN(body.unitPrice) || body.unitPrice < 0) {
      throw new ApiError(400, 'unitPrice must be a number greater than or equal to 0');
    }
    data.unitPrice = body.unitPrice;
  }
  if (!partial || has('lowStockLimit')) {
    if (!Number.isInteger(body.lowStockLimit) || body.lowStockLimit < 0) {
      throw new ApiError(400, 'lowStockLimit must be an integer greater than or equal to 0');
    }
    data.lowStockLimit = body.lowStockLimit;
  }
  if (has('supplier')) {
    if (body.supplier !== null && typeof body.supplier !== 'string') {
      throw new ApiError(400, 'supplier must be a string');
    }
    data.supplier = body.supplier ?? '';
  } else if (!partial) {
    data.supplier = '';
  }
  return data;
}

// GET /api/products/low-stock — products at/below their limit.
// IMPORTANT: registered BEFORE /:id so Express does not treat
// "low-stock" as a product id.
router.get('/low-stock', (req, res) => {
  res.json(products.filter(needsRestock).map(withStatus));
});

// GET /api/products — list, with optional ?search= (name or SKU)
// and ?category= (exact category name) filters.
router.get('/', (req, res) => {
  let result = products;
  const { search, category } = req.query;
  if (category) {
    result = result.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q),
    );
  }
  res.json(result.map(withStatus));
});

// POST /api/products — create a product. SKU must be unique (409).
router.post('/', (req, res) => {
  const data = validateProduct(req.body);
  if (products.some((p) => p.sku.toLowerCase() === data.sku.toLowerCase())) {
    throw new ApiError(409, `A product with SKU "${data.sku}" already exists`);
  }
  const product = { id: ++counters.product, ...data };
  products.push(product);
  res.status(201).json(withStatus(product));
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) throw new ApiError(404, `Product ${req.params.id} not found`);
  res.json(withStatus(product));
});

// PUT /api/products/:id — update the fields that are sent.
router.put('/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) throw new ApiError(404, `Product ${req.params.id} not found`);
  const data = validateProduct(req.body, { partial: true });
  if (
    data.sku &&
    products.some((p) => p.id !== product.id && p.sku.toLowerCase() === data.sku.toLowerCase())
  ) {
    throw new ApiError(409, `A product with SKU "${data.sku}" already exists`);
  }
  Object.assign(product, data);
  res.json(withStatus(product));
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) throw new ApiError(404, `Product ${req.params.id} not found`);
  products.splice(products.indexOf(product), 1);
  res.json({ message: `Product ${product.id} deleted`, product: withStatus(product) });
});

// POST /api/products/:id/stock — record stock in/out.
// Body: { change: number (non-zero integer), reason: string (optional) }.
// Quantity can never go below 0. Records a StockMovement and returns
// the updated product.
router.post('/:id/stock', (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) throw new ApiError(404, `Product ${req.params.id} not found`);
  const body = req.body ?? {};
  if (!Number.isInteger(body.change) || body.change === 0) {
    throw new ApiError(400, 'change is required and must be a non-zero integer');
  }
  if (body.reason !== undefined && typeof body.reason !== 'string') {
    throw new ApiError(400, 'reason must be a string');
  }
  const newQuantity = product.quantity + body.change;
  if (newQuantity < 0) {
    throw new ApiError(
      400,
      `Stock cannot go below 0 (current quantity is ${product.quantity}, change is ${body.change})`,
    );
  }
  product.quantity = newQuantity;
  movements.push({
    id: ++counters.movement,
    productId: product.id,
    productName: product.name,
    change: body.change,
    reason: body.reason ?? '',
    createdAt: new Date().toISOString(),
  });
  res.json(withStatus(product));
});

export default router;
