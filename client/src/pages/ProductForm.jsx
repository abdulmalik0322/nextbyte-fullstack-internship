import { useState } from 'react';
import { categories } from '../data/demoProducts';

// Add / Edit product form. The same form is used for both:
// if a product is passed in, we are editing it; otherwise adding new.
// Works on the in-memory demo data — no backend yet (Week 3).
function ProductForm({ product, onSave, onCancel }) {
  const isEditing = product !== null;

  const [name, setName] = useState(product ? product.name : '');
  const [sku, setSku] = useState(product ? product.sku : '');
  const [category, setCategory] = useState(product ? product.category : 'Grocery');
  const [quantity, setQuantity] = useState(product ? product.quantity : 0);
  const [unitPrice, setUnitPrice] = useState(product ? product.unitPrice : 0);
  const [lowStockLimit, setLowStockLimit] = useState(product ? product.lowStockLimit : 5);
  const [supplier, setSupplier] = useState(product ? product.supplier : '');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation: name and SKU are required, numbers can't be negative.
    if (name.trim() === '' || sku.trim() === '') {
      setError('Please fill in the product name and SKU.');
      return;
    }
    if (quantity < 0 || unitPrice < 0 || lowStockLimit < 0) {
      setError('Quantity, price and low-stock limit cannot be negative.');
      return;
    }

    onSave({
      name: name.trim(),
      sku: sku.trim(),
      category,
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      lowStockLimit: Number(lowStockLimit),
      supplier: supplier.trim(),
    });
  }

  return (
    <div>
      <h1 className="page-title">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
      <p className="page-subtitle">
        {isEditing ? 'Update the product details below.' : 'Fill in the new product details.'}
      </p>

      <form className="product-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

        <label>
          Product name *
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cooking Oil 5L" />
        </label>

        <label>
          SKU *
          <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. ST-009" />
        </label>

        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <div className="form-row">
          <label>
            Quantity
            <input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          <label>
            Unit price (Rs)
            <input type="number" min="0" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
          </label>
          <label>
            Low-stock limit
            <input type="number" min="0" value={lowStockLimit} onChange={(e) => setLowStockLimit(e.target.value)} />
          </label>
        </div>

        <label>
          Supplier
          <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="e.g. Hangu Wholesale Market" />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn">{isEditing ? 'Save changes' : 'Add product'}</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
