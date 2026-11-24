import StatCard from '../components/StatCard';
import LowStockBadge from '../components/LowStockBadge';
import { getStockStatus, needsRestock } from '../utils/stockStatus';

// Dashboard: the shopkeeper's morning overview — headline numbers
// plus the list of items that need attention today.
function Dashboard({ products, onNavigate }) {
  const totalProducts = products.length;
  const lowStock = products.filter((p) => getStockStatus(p) === 'Low Stock');
  const outOfStock = products.filter((p) => getStockStatus(p) === 'Out of Stock');
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0);
  const attention = products.filter(needsRestock);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Your shop stock at a glance.</p>

      <div className="stat-grid">
        <StatCard title="Total Products" value={totalProducts} />
        <StatCard
          title="Total Stock Value"
          value={`Rs ${totalValue.toLocaleString()}`}
        />
        <StatCard
          title="Low Stock"
          value={lowStock.length}
          note="Running out soon"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock.length}
          note="Finished items"
        />
      </div>

      <h2 className="section-title">Needs attention</h2>
      {attention.length === 0 ? (
        <p className="empty-text">All products are well stocked. Nothing to reorder today.</p>
      ) : (
        <ul className="attention-list">
          {attention.map((p) => (
            <li key={p.id} className="attention-item">
              <span>
                <strong>{p.name}</strong> — {p.quantity} left (alert at {p.lowStockLimit})
              </span>
              <LowStockBadge product={p} />
            </li>
          ))}
        </ul>
      )}

      <button className="btn" onClick={() => onNavigate('low-stock')}>
        View low-stock alerts
      </button>
    </div>
  );
}

export default Dashboard;
