import { money } from '../utils/finance.js';
const labels = { loan: 'Préstamo', simple: 'Interés simple', compound: 'Interés compuesto', savings: 'Ahorro' };

export default function HistoryPanel({ history, onClear, onRestore }) {
  return <section className="panel history-panel">
    <div className="detail-header"><div><span className="section-kicker">ACTIVIDAD RECIENTE</span>
      <h2>Historial de simulaciones</h2><p className="detail-description">Se guardan las últimas cinco simulaciones en este navegador.</p>
    </div><button type="button" className="small-action no-print" onClick={onClear} disabled={!history.length}>Borrar historial</button></div>
    {!history.length ? <p className="history-empty">Todavía no hay simulaciones guardadas.</p> :
      <div className="history-list">{history.map(item => <article className="history-item" key={item.id}>
        <div className="history-item-main"><strong>{labels[item.type] || item.type}</strong>
          <span>{new Date(item.createdAt).toLocaleString('es-DO')}</span>
          <small>Capital: {money(Number(item.values.principal), item.currency)} · Tasa: {item.values.rate}% · Plazo: {item.values.years} años</small>
        </div><div className="history-amount"><strong>{money(item.summary.total, item.currency)}</strong>
          <button type="button" className="text-action no-print" onClick={() => onRestore(item)}>Volver a ver</button></div>
      </article>)}</div>}
  </section>;
}
