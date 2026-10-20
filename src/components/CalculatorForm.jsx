

import NumberField from './NumberField.jsx';

const symbols = {
  DOP: 'RD$',
  USD: 'US$',
  CAD: 'CA$',
  EUR: '€'
};

export default function CalculatorForm({
  values,
  onFieldChange,
  onSubmit,
  onReset,
  type,
  currency,
  fieldErrors = {}
}) {
  const symbol = symbols[currency] || 'RD$';

  return (
    <form
      onSubmit={onSubmit}
      className="panel form"
      noValidate
    >
      <div className="section-heading">
        <span className="section-kicker">SIMULACIÓN</span>
        <h2>Datos financieros</h2>
        <p>Introduce los datos para calcular tu escenario.</p>
      </div>

      <NumberField
        id="principal"
        label={`Capital inicial (${symbol})`}
        value={values.principal}
        min="0.01"
        error={fieldErrors.principal}
        onChange={v => onFieldChange('principal', v)}
        hint={`Importe expresado en ${currency}.`}
      />

      {type === 'savings' && (
        <NumberField
          id="monthlyContribution"
          label={`Aportación mensual (${symbol})`}
          value={values.monthlyContribution}
          min="0"
          error={fieldErrors.monthlyContribution}
          onChange={v => onFieldChange('monthlyContribution', v)}
          hint="Se deposita al final de cada mes. Introduce 0 si no harás aportaciones."
        />
      )}

      <NumberField
        id="rate"
        label="Tasa de interés anual (%)"
        value={values.rate}
        min="0"
        error={fieldErrors.rate}
        onChange={v => onFieldChange('rate', v)}
        hint="Por ejemplo, 12 representa un 12 % anual."
      />

      <NumberField
        id="years"
        label="Plazo (años)"
        value={values.years}
        min="0.01"
        error={fieldErrors.years}
        onChange={v => onFieldChange('years', v)}
        hint={
          type === 'loan'
            ? 'Ejemplo: 1.5 equivale a 18 meses.'
            : 'Puedes usar decimales, por ejemplo 2.5 años.'
        }
      />

      <div className="actions">
        <button className="primary" type="submit">
          Calcular resultado
        </button>

        <button
          className="secondary"
          type="button"
          onClick={onReset}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
