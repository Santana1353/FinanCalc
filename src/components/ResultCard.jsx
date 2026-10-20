import { money } from '../utils/finance.js';

export default function ResultCard({ result, currency, onCopy }) {
  if (!result) return <section className="panel empty" aria-live="polite">
    <div className="empty-icon" aria-hidden="true">◇</div>
    <h2>Tu resultado aparecerá aquí</h2><p>Completa los campos y pulsa Calcular.</p>
  </section>;

  return <section className="panel results" aria-live="polite">
    <div className="result-title-row">
      <div><span className="section-kicker">RESUMEN FINANCIERO</span><h2>Resultado de tu simulación</h2></div>
      <button type="button" className="small-action no-print" onClick={onCopy}>Copiar resultado</button>
    </div>
    <div className="hero-result"><span>{result.mainLabel}</span>
      <strong>{money(result.main, currency)}</strong><small>Moneda seleccionada: {currency}</small></div>
    <div className="metric"><span>Monto total</span><strong>{money(result.total, currency)}</strong></div>
    {result.invested !== undefined && <div className="metric"><span>Capital inicial y aportaciones</span><strong>{money(result.invested, currency)}</strong></div>}
    {result.contributions !== undefined && <div className="metric"><span>Total de aportaciones mensuales</span><strong>{money(result.contributions, currency)}</strong></div>}
    <div className="metric"><span>Intereses generados / pagados</span><strong>{money(result.interest, currency)}</strong></div>
    <p className="disclaimer">Simulación educativa. No incluye comisiones, impuestos, seguros ni otros cargos.</p>
  </section>;
}
