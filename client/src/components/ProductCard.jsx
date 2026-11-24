import LowStockBadge from './LowStockBadge';

// Card for one product in the Products grid.
// Products added through the form have no photo yet, so we show a
// simple placeholder box with the product's first letter instead.
function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      {product.image ? (
        <img src={product.image} alt={product.name} className="product-image" />
      ) : (
        <div className="product-image product-image-placeholder">
          {product.name.charAt(0)}
        </div>
      )}

      <div className="product-card-body">
        <div className="product-card-top">
          <h3 className="product-name">{product.name}</h3>
          <LowStockBadge product={product} />
        </div>
        <p className="product-meta">SKU: {product.sku} · {product.category}</p>
        <p className="product-price">Rs {product.unitPrice.toLocaleString()}</p>
        <p className="product-meta">
          Quantity: <strong>{product.quantity}</strong>
          {' '}(alert at {product.lowStockLimit})
        </p>
        <p className="product-meta">Supplier: {product.supplier || '—'}</p>

        <div className="product-card-actions">
          <button className="btn btn-small" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
