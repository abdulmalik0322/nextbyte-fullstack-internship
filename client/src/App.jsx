import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import LowStock from './pages/LowStock';
import { demoProducts } from './data/demoProducts';
import { needsRestock } from './utils/stockStatus';

// Week 2: the whole app runs on in-memory demo data (useState).
// The backend API arrives in Week 3 — then this state will be
// replaced by fetch calls, but the pages/components stay the same.
function App() {
  const [products, setProducts] = useState(demoProducts);
  const [page, setPage] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

  function goTo(nextPage) {
    setEditingProduct(null);
    setPage(nextPage);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setPage('product-form');
  }

  // Save from the Add/Edit form. If we were editing, keep the same
  // id and photo; if adding, create a new product (no photo yet).
  function handleSave(productData) {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...productData, id: p.id, image: p.image }
            : p
        )
      );
    } else {
      const newProduct = { ...productData, id: Date.now(), image: null };
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
    setPage('products');
  }

  function handleDelete(id) {
    setProducts(products.filter((p) => p.id !== id));
  }

  const lowStockCount = products.filter(needsRestock).length;

  return (
    <div className="app">
      <Navbar currentPage={page} onNavigate={goTo} lowStockCount={lowStockCount} />

      <main className="page">
        {page === 'dashboard' && (
          <Dashboard products={products} onNavigate={goTo} />
        )}

        {page === 'products' && (
          <Products
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={() => goTo('product-form')}
          />
        )}

        {page === 'product-form' && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => goTo('products')}
          />
        )}

        {page === 'low-stock' && (
          <LowStock products={products} onEdit={handleEdit} />
        )}
      </main>
    </div>
  );
}

export default App;
