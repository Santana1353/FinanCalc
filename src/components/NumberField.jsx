

export default function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  step = 'any',
  hint,
  error
}) {
  return (
    <div className={`field ${error ? 'field-invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={id}
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : hint
              ? `${id}-hint`
              : undefined
        }
      />

      {error ? (
        <small
          id={`${id}-error`}
          className="field-error"
          role="alert"
        >
          {error}
        </small>
      ) : hint ? (
        <small id={`${id}-hint`}>
          {hint}
        </small>
      ) : null}
    </div>
  );
}
