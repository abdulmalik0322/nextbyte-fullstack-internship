// A product's stock status is always computed from its quantity and
// low-stock limit — it is never stored on the product itself.
// (Mirrors client/src/utils/stockStatus.js.)
//
//   quantity = 0                  -> "Out of Stock"
//   quantity <= lowStockLimit     -> "Low Stock"
//   otherwise                     -> "In Stock"
export function getStockStatus(product) {
  if (product.quantity === 0) {
    return 'Out of Stock';
  }
  if (product.quantity <= product.lowStockLimit) {
    return 'Low Stock';
  }
  return 'In Stock';
}

// True when the product needs the shopkeeper's attention
// (either running low or completely finished).
export function needsRestock(product) {
  const status = getStockStatus(product);
  return status === 'Low Stock' || status === 'Out of Stock';
}

// Returns a copy of the product with its computed `status` attached,
// ready to send in an API response.
export function withStatus(product) {
  return { ...product, status: getStockStatus(product) };
}
