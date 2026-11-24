// Top navigation bar. Uses simple buttons — page switching is handled
// by state in App.jsx (no router needed at this stage).
function Navbar({ currentPage, onNavigate, lowStockCount }) {
  const links = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'products', label: 'Products' },
    { key: 'product-form', label: 'Add Product' },
    { key: 'low-stock', label: 'Low Stock' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-brand">StockTrack</div>
      <nav className="navbar-links">
        {links.map((link) => (
          <button
            key={link.key}
            className={
              currentPage === link.key ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={() => onNavigate(link.key)}
          >
            {link.label}
            {link.key === 'low-stock' && lowStockCount > 0 && (
              <span className="nav-count">{lowStockCount}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
