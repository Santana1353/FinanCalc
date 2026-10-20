# FinanCalc — Calculadora Financiera

Aplicación web de simulación financiera desarrollada con React, Vite, JavaScript y CSS. Permite calcular préstamos, intereses y proyecciones de ahorro mediante una interfaz interactiva.

## Funcionalidades

- **Préstamos:** cálculo de cuotas mensuales, intereses totales y tabla de amortización.
- **Interés simple:** cálculo de los intereses generados sobre el capital inicial.
- **Interés compuesto:** proyección del monto acumulado con capitalización mensual.
- **Ahorro:** proyección del saldo con aportaciones mensuales al final de cada período.
- **Selector de moneda:** presentación de importes en DOP, USD, CAD y EUR. No realiza conversión entre divisas.
- **Validación de datos:** mensajes en español para entradas incorrectas.
- **Cálculo con tasa del 0 %:** contempla escenarios sin intereses.
- **Gráfica financiera:** representación visual de la evolución mensual del saldo mediante SVG.
- **Detalle mensual:** tabla con información de cada período, según el tipo de cálculo.
- **Historial:** conserva las últimas cinco simulaciones en el navegador mediante `localStorage`.
- **Copiar resultados:** permite copiar el resumen de una simulación.
- **Exportar a PDF:** utiliza la función de impresión del navegador. El usuario puede seleccionar «Guardar como PDF».

## Tecnologías utilizadas

- React
- JavaScript
- Vite
- HTML5
- CSS3
- SVG
- `localStorage`

## Requisitos

Para instalar y ejecutar el proyecto necesitas:

- Node.js en una versión compatible con las dependencias.
- npm, incluido con Node.js.
- Un navegador web moderno.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Santana1353/FinanCalc.git
```

Entra en la carpeta del proyecto:

```bash
cd FinanCalc
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre en el navegador la dirección local que indique Vite, normalmente `http://localhost:5173`.

## Compilación para producción

Para comprobar y compilar la aplicación:

```bash
npm run build
```

Para probar localmente la versión compilada:

```bash
npm run preview
```

## Estructura del proyecto

```text
FinanCalc/
├── src/
│   ├── components/
│   │   ├── CalculatorForm.jsx
│   │   ├── CalculatorTabs.jsx
│   │   ├── DetailTable.jsx
│   │   ├── FinancialChart.jsx
│   │   ├── Header.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── NumberField.jsx
│   │   └── ResultCard.jsx
│   ├── utils/
│   │   └── finance.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Fórmulas financieras

**Interés simple**

`I = P × r × t`

El monto total se calcula sumando el capital inicial y los intereses.

**Interés compuesto con capitalización mensual**

`A = P × (1 + r/12)^(12t)`

**Préstamo con cuotas mensuales iguales**

`C = P × i / (1 - (1 + i)^(-n))`

Cuando la tasa de interés es del 0 %, la cuota se calcula dividiendo el capital entre el número de meses.

**Ahorro con aportaciones mensuales**

Cada mes se calcula el interés del saldo y después se añade la aportación mensual.

Donde:

- `P`: capital inicial.
- `r`: tasa anual expresada como decimal.
- `t`: plazo en años.
- `i`: tasa mensual expresada como decimal.
- `n`: número de cuotas mensuales.
- `C`: cuota mensual.
- `A`: monto futuro.
- `I`: interés generado.

La tasa se introduce como porcentaje anual; por ejemplo, `12` representa un 12 %. El plazo se convierte a meses mediante el redondeo de años multiplicados por 12.

## Consideraciones

FinanCalc es una herramienta de simulación. Los resultados no incluyen comisiones, impuestos, seguros ni otros cargos que puedan existir en productos financieros reales.

El selector de moneda cambia el formato de presentación de los importes, pero no convierte divisas. El historial se almacena en el navegador utilizado y no se sincroniza automáticamente entre dispositivos.

La exportación a PDF depende de las opciones de impresión disponibles en el navegador.

## Proyecto académico

FinanCalc fue desarrollado como proyecto de práctica para aplicar conceptos de React, componentes, estado, eventos, validación de formularios, cálculos matemáticos y diseño de interfaces.