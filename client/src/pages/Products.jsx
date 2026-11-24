import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/demoProducts';

// Products page: searchable, filterable grid of product cards.
// Search matches name and SKU; the dropdown filters by category.
function Products({ products, onEdit, onDelete, onAddNew }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const visible = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">{visible.length} of {products.length} products shown</p>
        </div>
        <button className="btn" onClick={onAddNew}>+ Add Product</button>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="empty-text">No products match your search.</p>
      ) : (
        <div className="product-grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
