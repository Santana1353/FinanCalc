export const options = [
  { value: 'loan', label: 'Préstamo', description: 'Cuotas y amortización' },
  { value: 'simple', label: 'Interés simple', description: 'Interés sobre el capital' },
  { value: 'compound', label: 'Interés compuesto', description: 'Interés reinvertido' },
  { value: 'savings', label: 'Ahorro', description: 'Capital y aportaciones' }
];

export default function CalculatorTabs({ value, onChange }) {
  return <div className="tabs" role="group" aria-label="Tipo de cálculo">
    {options.map(o => <button type="button" key={o.value}
      className={value === o.value ? 'tab active' : 'tab'}
      onClick={() => onChange(o.value)} aria-pressed={value === o.value}>
      <span>{o.label}</span><small>{o.description}</small>
    </button>)}
  </div>;
}
