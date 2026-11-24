import LowStockBadge from '../components/LowStockBadge';
import { needsRestock } from '../utils/stockStatus';

// Low-Stock Alerts page: the one list the shopkeeper checks every
// morning. Shows every product that is Low or Out of Stock.
function LowStock({ products, onEdit }) {
  const alerts = products.filter(needsRestock);

  return (
    <div>
      <h1 className="page-title">Low-Stock Alerts</h1>
      <p className="page-subtitle">
        {alerts.length === 0
          ? 'Nothing is running low right now.'
          : `${alerts.length} product(s) need reordering.`}
      </p>

      {alerts.length === 0 ? (
        <p className="empty-text">All products are well stocked.</p>
      ) : (
        <div className="table-wrap">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Quantity left</th>
                <th>Alert at</th>
                <th>Supplier</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.quantity}</td>
                  <td>{p.lowStockLimit}</td>
                  <td>{p.supplier || '—'}</td>
                  <td><LowStockBadge product={p} /></td>
                  <td>
                    <button className="btn btn-small" onClick={() => onEdit(p)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStock;
