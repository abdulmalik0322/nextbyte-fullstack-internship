// One summary box on the Dashboard, e.g. "Total Products — 8".
function StatCard({ title, value, note }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <p className="stat-value">{value}</p>
      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}

export default StatCard;
