const currencies = ['DOP', 'USD', 'CAD', 'EUR'];

export function money(amount, currency = 'DOP') {
  const code = currencies.includes(currency) ? currency : 'DOP';
  return new Intl.NumberFormat('es-DO', {
    style: 'currency', currency: code, minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(Number.isFinite(amount) ? amount : 0);
}

function validate(principal, annualRate, years, monthlyContribution = 0) {
  const P = Number(principal), percent = Number(annualRate), t = Number(years);
  const contribution = Number(monthlyContribution);
  if (![P, percent, t, contribution].every(Number.isFinite)) {
    throw new Error('Completa todos los campos con valores numéricos válidos.');
  }
  if (P <= 0) throw new Error('El capital inicial debe ser mayor que cero.');
  if (percent < 0) throw new Error('La tasa anual no puede ser negativa.');
  if (t <= 0) throw new Error('El plazo debe ser mayor que cero.');
  if (contribution < 0) throw new Error('La aportación mensual no puede ser negativa.');
  const months = Math.round(t * 12);
  if (months < 1) throw new Error('El plazo debe ser de al menos un mes.');
  return { P, r: percent / 100, t, contribution, months };
}

export function calculate(type, principal, annualRate, years, monthlyContribution = 0) {
  const { P, r, t, contribution, months } = validate(principal, annualRate, years, monthlyContribution);
  const i = r / 12;
  const schedule = [];

  if (type === 'loan') {
    const payment = i === 0 ? P / months : P * i / (1 - Math.pow(1 + i, -months));
    let balance = P, totalPaid = 0, totalInterest = 0;
    for (let month = 1; month <= months; month++) {
      const balanceBefore = balance;
      const interest = balanceBefore * i;
      const actualPayment = month === months ? balanceBefore + interest : payment;
      const principalPaid = actualPayment - interest;
      balance = month === months ? 0 : Math.max(0, balanceBefore - principalPaid);
      totalPaid += actualPayment;
      totalInterest += interest;
      schedule.push({
        period: month, payment: actualPayment, principal: principalPaid, interest,
        rate: i * 100, balanceBefore, balanceAfter: balance
      });
    }
    return { type, main: payment, mainLabel: 'Cuota mensual', total: totalPaid,
      interest: totalInterest, schedule, months };
  }

  if (type === 'simple') {
    const interest = P * r * t, perMonth = interest / months;
    let accrued = 0;
    for (let month = 1; month <= months; month++) {
      accrued += perMonth;
      schedule.push({
        period: month, principal: P, interest: perMonth, accumulatedInterest: accrued,
        rate: i * 100, balanceBefore: P + accrued - perMonth, balanceAfter: P + accrued
      });
    }
    return { type, main: interest, mainLabel: 'Interés generado', total: P + interest,
      interest, schedule, months };
  }

  if (type === 'compound') {
    let balance = P, totalInterest = 0;
    for (let month = 1; month <= months; month++) {
      const balanceBefore = balance, interest = balanceBefore * i;
      balance += interest;
      totalInterest += interest;
      schedule.push({ period: month, interest, rate: i * 100, balanceBefore, balanceAfter: balance });
    }
    return { type, main: balance, mainLabel: 'Monto futuro', total: balance,
      interest: totalInterest, schedule, months };
  }

  if (type === 'savings') {
    let balance = P, totalInterest = 0, totalContributions = 0;
    for (let month = 1; month <= months; month++) {
      const balanceBefore = balance, interest = balanceBefore * i;
      // La aportación se agrega al final del mes, después de calcular el interés.
      balance = balanceBefore + interest + contribution;
      totalInterest += interest;
      totalContributions += contribution;
      schedule.push({
        period: month, interest, contribution, rate: i * 100, balanceBefore, balanceAfter: balance
      });
    }
    return { type, main: balance, mainLabel: 'Ahorro proyectado', total: balance,
      interest: totalInterest, invested: P + totalContributions,
      contributions: totalContributions, schedule, months };
  }

  throw new Error('Selecciona una modalidad válida.');
}

export function historyEntry({ type, currency, values, result }) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(), type, currency,
    values: { ...values },
    summary: { main: result.main, mainLabel: result.mainLabel, total: result.total, interest: result.interest }
  };
}
