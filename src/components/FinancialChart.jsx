export default function FinancialChart({ result, currency }) {
  if (!result?.schedule?.length) return null;
  const values = [result.schedule[0]?.balanceBefore ?? 0, ...result.schedule.map(r => r.balanceAfter ?? 0)];
  const width = 800, height = 240, pad = 28;
  const min = Math.min(...values), max = Math.max(...values), range = max - min || 1;
  const coords = values.map((v, i) => [
    pad + i / Math.max(1, values.length - 1) * (width - pad * 2),
    height - pad - (v - min) / range * (height - pad * 2)
  ]);
  const points = coords.map(([x, y]) => `${x},${y}`).join(' ');
  const finalValue = new Intl.NumberFormat('es-DO', { style: 'currency', currency, maximumFractionDigits: 2 }).format(values.at(-1));
  return <section className="panel chart-panel">
    <div className="detail-header"><div><span className="section-kicker">EVOLUCIÓN</span>
      <h2>Proyección visual</h2><p className="detail-description">Evolución mensual del saldo; en préstamos representa la deuda pendiente.</p>
    </div><div className="detail-total">{finalValue}</div></div>
    <div className="chart-wrap"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Gráfico de evolución mensual del saldo">
      {[0, 1, 2, 3].map(n => <line key={n} x1={pad} x2={width-pad} y1={pad+n*(height-2*pad)/3} y2={pad+n*(height-2*pad)/3} className="chart-gridline" />)}
      <polyline points={points} className="chart-line" />
      {coords.map(([x,y], i) => (i === 0 || i === coords.length - 1 || i % Math.ceil(coords.length/10) === 0)
        ? <circle key={i} cx={x} cy={y} r="4" className="chart-point" /> : null)}
    </svg></div>
    <div className="chart-labels"><span>Inicio</span><span>Final · {finalValue}</span></div>
  </section>;
}
