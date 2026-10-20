import { money } from '../utils/finance.js';

export default function DetailTable({ type, result, currency }) {
  if (!result?.schedule?.length) return null;
  let title = 'Detalle de la simulación';
  let description = 'Desglose de cada período de la simulación.';
  let columns;

  if (type === 'loan') {
    title = 'Tabla de amortización';
    description = 'Cada cuota se divide entre capital e intereses y reduce el saldo pendiente.';
    columns = [
      ['Mes', r => r.period], ['Cuota', r => money(r.payment, currency)],
      ['Capital', r => money(r.principal, currency)], ['Interés', r => money(r.interest, currency)],
      ['Tasa', r => `${r.rate.toFixed(3)} %`], ['Balance inicial', r => money(r.balanceBefore, currency)],
      ['Saldo final', r => money(r.balanceAfter, currency)]
    ];
  } else if (type === 'simple') {
    title = 'Detalle del interés simple';
    description = 'El interés se calcula sobre el capital inicial y no se reinvierte.';
    columns = [
      ['Mes', r => r.period], ['Capital', r => money(r.principal, currency)],
      ['Interés del mes', r => money(r.interest, currency)], ['Tasa mensual', r => `${r.rate.toFixed(3)} %`],
      ['Interés acumulado', r => money(r.accumulatedInterest, currency)],
      ['Total acumulado', r => money(r.balanceAfter, currency)]
    ];
  } else if (type === 'compound') {
    title = 'Detalle del interés compuesto';
    description = 'El interés mensual se suma al saldo para calcular el siguiente período.';
    columns = [
      ['Mes', r => r.period], ['Saldo inicial', r => money(r.balanceBefore, currency)],
      ['Interés del mes', r => money(r.interest, currency)], ['Tasa mensual', r => `${r.rate.toFixed(3)} %`],
      ['Saldo final', r => money(r.balanceAfter, currency)]
    ];
  } else {
    title = 'Detalle del plan de ahorro';
    description = 'El saldo suma el interés mensual y la aportación depositada al final de cada mes.';
    columns = [
      ['Mes', r => r.period], ['Saldo inicial', r => money(r.balanceBefore, currency)],
      ['Interés', r => money(r.interest, currency)], ['Aportación', r => money(r.contribution, currency)],
      ['Tasa mensual', r => `${r.rate.toFixed(3)} %`], ['Saldo final', r => money(r.balanceAfter, currency)]
    ];
  }

  return <section className="panel detail-panel">
    <div className="detail-header"><div>
      <span className="section-kicker">DESGLOSE MENSUAL</span><h2>{title}</h2>
      <p className="detail-description">{description}</p>
    </div><div className="detail-total">{type === 'loan' ? 'Total pagado: ' : 'Total: '}{money(result.total, currency)}</div></div>
    <div className="table-wrapper" role="region" aria-label={title} tabIndex="0">
      <table className="detail-table"><thead><tr>{columns.map(([label]) => <th key={label} scope="col">{label}</th>)}</tr></thead>
        <tbody>{result.schedule.map(row => <tr key={row.period}>
          {columns.map(([label, render]) => <td key={label}>{render(row)}</td>)}
        </tr>)}</tbody>
      </table>
    </div>
    <p className="table-note">{result.schedule.length} períodos. Los valores se presentan con dos decimales.</p>
  </section>;
}
