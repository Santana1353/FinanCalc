

import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CalculatorTabs from './components/CalculatorTabs.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import DetailTable from './components/DetailTable.jsx';
import FinancialChart from './components/FinancialChart.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import { calculate, historyEntry } from './utils/finance.js';

const initial = {
  principal: '100000',
  rate: '12',
  years: '2',
  monthlyContribution: '500'
};

const HISTORY_KEY = 'financalc-history-v1';
const MAX_HISTORY = 5;

export default function App() {
  const [type, setType] = useState('loan');
  const [values, setValues] = useState({ ...initial });
  const [currency, setCurrency] = useState('DOP');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [history, setHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    document.title = 'FinanCalc | Calculadora financiera';

    try {
      const saved = localStorage.getItem(HISTORY_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setHistory(parsed.slice(0, MAX_HISTORY));
        }
      }
    } catch {
      setNotice('No se pudo leer el historial guardado.');
    } finally {
      setHistoryLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!historyLoaded) return;

    try {
      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history.slice(0, MAX_HISTORY))
      );
    } catch {
      setNotice('No se pudo guardar el historial en este navegador.');
    }
  }, [history, historyLoaded]);

  const changeType = next => {
    setType(next);
    setResult(null);
    setError('');
    setFieldErrors({});
    setNotice('');
  };

  const changeCurrency = next => {
    setCurrency(next);
    setResult(null);
    setError('');
    setFieldErrors({});
    setNotice(
      'Formato monetario actualizado. No se ha convertido el valor entre monedas.'
    );
  };

  const changeField = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    setFieldErrors(prev => ({
      ...prev,
      [field]: ''
    }));

    setResult(null);
    setError('');
    setNotice('');
  };

  const submit = event => {
    event.preventDefault();

    const errors = {};

    const principal = Number(values.principal);
    const rate = Number(values.rate);
    const years = Number(values.years);
    const contribution = Number(values.monthlyContribution);

    if (String(values.principal).trim() === '') {
      errors.principal = 'Introduce el capital inicial.';
    } else if (!Number.isFinite(principal) || principal <= 0) {
      errors.principal =
        'El capital inicial debe ser mayor que cero.';
    }

    if (String(values.rate).trim() === '') {
      errors.rate = 'Introduce la tasa de interés anual.';
    } else if (!Number.isFinite(rate) || rate < 0) {
      errors.rate =
        'La tasa de interés no puede ser negativa.';
    }

    if (String(values.years).trim() === '') {
      errors.years = 'Introduce el plazo de la simulación.';
    } else if (!Number.isFinite(years) || years <= 0) {
      errors.years =
        'El plazo debe ser mayor que cero.';
    } else if (Math.round(years * 12) < 1) {
      errors.years =
        'El plazo debe ser de al menos un mes.';
    }

    if (type === 'savings') {
      if (String(values.monthlyContribution).trim() === '') {
        errors.monthlyContribution =
          'Introduce la aportación mensual o escribe 0.';
      } else if (
        !Number.isFinite(contribution) ||
        contribution < 0
      ) {
        errors.monthlyContribution =
          'La aportación mensual no puede ser negativa.';
      }
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setResult(null);
      setError('');
      setNotice('');
      return;
    }

    try {
      const calculated = calculate(
        type,
        values.principal,
        values.rate,
        values.years,
        type === 'savings'
          ? values.monthlyContribution
          : 0
      );

      setResult(calculated);
      setError('');
      setNotice(
        'Cálculo realizado y guardado en el historial.'
      );

      setHistory(prev =>
        [
          historyEntry({
            type,
            currency,
            values,
            result: calculated
          }),
          ...prev
        ].slice(0, MAX_HISTORY)
      );
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo realizar el cálculo.'
      );
      setNotice('');
    }
  };

  const reset = () => {
    setValues({ ...initial });
    setResult(null);
    setError('');
    setFieldErrors({});
    setNotice('Formulario restablecido.');
  };

  const copyResult = async () => {
    if (!result) return;

    const fmt = amount =>
      new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
      }).format(amount);

    const text = [
      'FinanCalc · Resultado de simulación',
      `Modalidad: ${type}`,
      `Moneda: ${currency}`,
      `${result.mainLabel}: ${fmt(result.main)}`,
      `Monto total: ${fmt(result.total)}`,
      `Intereses generados / pagados: ${fmt(result.interest)}`,
      `Capital inicial: ${values.principal}`,
      `Tasa anual: ${values.rate}%`,
      `Plazo: ${values.years} años`,
      type === 'savings'
        ? `Aportación mensual: ${values.monthlyContribution}`
        : '',
      'Simulación educativa; no incluye comisiones, impuestos, seguros ni otros cargos.'
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setNotice('Resultado copiado al portapapeles.');
    } catch {
      setNotice(
        'No se pudo copiar automáticamente. Comprueba los permisos del navegador.'
      );
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setNotice('Historial eliminado de este navegador.');
  };

  const restoreHistory = item => {
    const restoredValues = {
      ...initial,
      ...item.values
    };

    setType(item.type);
    setCurrency(item.currency);
    setValues(restoredValues);
    setFieldErrors({});
    setError('');

    try {
      const restoredResult = calculate(
        item.type,
        restoredValues.principal,
        restoredValues.rate,
        restoredValues.years,
        item.type === 'savings'
          ? restoredValues.monthlyContribution
          : 0
      );

      setResult(restoredResult);
      setNotice('Simulación recuperada del historial.');
    } catch {
      setResult(null);
      setError(
        'No se pudo recuperar esta simulación.'
      );
      setNotice('');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const exportPDF = () => {
    if (!result) {
      setNotice(
        'Primero realiza un cálculo para exportar el informe.'
      );
      return;
    }

    window.print();
  };

  return (
    <>
      <Header
        currency={currency}
        onCurrencyChange={changeCurrency}
      />

      <main className="shell main-content">
        <section className="intro">
          <span className="eyebrow">
            PLANIFICACIÓN FINANCIERA
          </span>

          <h1>
            Decisiones financieras con claridad.
          </h1>

          <p>
            Calcula cuotas, estima intereses y proyecta tus
            ahorros desde un solo lugar.
          </p>
        </section>

        <CalculatorTabs
          value={type}
          onChange={changeType}
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}

        <div className="layout">
          <CalculatorForm
            type={type}
            values={values}
            currency={currency}
            fieldErrors={fieldErrors}
            onFieldChange={changeField}
            onSubmit={submit}
            onReset={reset}
          />

          <ResultCard
            result={result}
            currency={currency}
            onCopy={copyResult}
          />
        </div>

        <div className="toolbar no-print">
          <div>
            <strong>Informe financiero</strong>
            <span>
              Incluye el resumen y el detalle mensual.
              En el diálogo, elige «Guardar como PDF».
            </span>
          </div>

          <button
            type="button"
            className="primary export-button"
            onClick={exportPDF}
          >
            Exportar a PDF
          </button>
        </div>

        <DetailTable
          type={type}
          result={result}
          currency={currency}
        />

        <FinancialChart
          result={result}
          currency={currency}
        />

        <HistoryPanel
          history={history}
          onClear={clearHistory}
          onRestore={restoreHistory}
        />

        <div className="educational-note">
          <span className="gold-dot" />

          <p>
            FinanCalc es una herramienta educativa. El
            selector de moneda cambia el formato, no el
            valor del dinero. Los resultados no incluyen
            comisiones, seguros, impuestos ni condiciones
            contractuales.
          </p>
        </div>
      </main>

      <footer className="footer">
        <div className="shell footer-content">
          <span>FinanCalc</span>
          <span>React · Vite · Proyecto educativo</span>
        </div>
      </footer>
    </>
  );
}
