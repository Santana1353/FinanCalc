const options = [
  { value: 'DOP', label: 'DOP · Peso dominicano (RD$)' },
  { value: 'USD', label: 'USD · Dólar estadounidense (US$)' },
  { value: 'CAD', label: 'CAD · Dólar canadiense (CA$)' },
  { value: 'EUR', label: 'EUR · Euro (€)' }
];

export default function Header({ currency, onCurrencyChange }) {
  return <header className="header">
    <div className="shell header-content">
      <div className="brand-area">
        <div className="brand-icon" aria-hidden="true">F</div>
        <div><div className="brand">FinanCalc</div><p className="brand-subtitle">Tu centro de planificación financiera</p></div>
      </div>
      <div className="currency-selector">
        <label htmlFor="currency">Moneda de presentación</label>
        <select id="currency" value={currency} onChange={e => onCurrencyChange(e.target.value)}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <small>El formato cambia; no se realiza conversión de divisas.</small>
      </div>
    </div>
  </header>;
}
