import { getStockStatus } from '../utils/stockStatus';

// Small coloured badge showing a product's computed stock status.
// Green = In Stock, orange = Low Stock, red = Out of Stock.
function LowStockBadge({ product }) {
  const status = getStockStatus(product);

  let className = 'badge badge-ok';
  if (status === 'Low Stock') {
    className = 'badge badge-low';
  } else if (status === 'Out of Stock') {
    className = 'badge badge-out';
  }

  return <span className={className}>{status}</span>;
}

export default LowStockBadge;
