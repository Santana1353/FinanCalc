
# FinanCalc — Calculadora Financiera

FinanCalc es una aplicación web desarrollada con React, Vite, JavaScript y CSS. Permite realizar simulaciones de préstamos, calcular intereses y proyectar ahorros mediante una interfaz sencilla e interactiva.

## Funcionalidades principales

- **Préstamos:** calcula las cuotas mensuales, los intereses y el total a pagar. También incluye una tabla de amortización.
- **Interés simple:** calcula los intereses generados sobre el capital inicial.
- **Interés compuesto:** muestra cómo crece el capital mediante la capitalización mensual.
- **Ahorro:** permite calcular el crecimiento del ahorro con aportaciones mensuales.
- **Selector de moneda:** permite presentar los resultados en pesos dominicanos, dólares estadounidenses, dólares canadienses y euros. No realiza conversiones de divisas.
- **Validaciones:** muestra mensajes en español cuando los datos introducidos son incorrectos.
- **Tasa del 0 %:** permite realizar cálculos sin intereses.
- **Gráfica financiera:** muestra la evolución del saldo durante la simulación.
- **Historial:** conserva las últimas cinco simulaciones en el navegador.
- **Copiar resultado:** permite copiar el resumen de los cálculos.
- **Exportación a PDF:** permite guardar los resultados mediante la opción de impresión del navegador.

## Tecnologías utilizadas

El proyecto utiliza React para construir la interfaz, JavaScript para la lógica de la aplicación, Vite para el entorno de desarrollo y compilación, y CSS para los estilos. También utiliza SVG para la gráfica y localStorage para conservar el historial en el navegador.

## Requisitos e instalación

Para ejecutar el proyecto se necesita tener instalado Node.js y npm, además de un navegador web actualizado.

Primero, descarga el repositorio desde GitHub. Después, abre una terminal en la carpeta del proyecto e instala las dependencias con el comando npm install.

Para iniciar la aplicación en modo de desarrollo, ejecuta npm run dev. Vite mostrará la dirección local que debes abrir en el navegador, normalmente http://localhost:5173.

## Compilación para producción

Para comprobar que el proyecto compila correctamente, ejecuta npm run build. Los archivos de producción se generan en la carpeta dist.

Si deseas probar esa versión localmente, ejecuta npm run preview y abre la dirección que indique Vite.

## Organización del proyecto

La carpeta src contiene el código principal de la aplicación.

Dentro de components se encuentran los componentes de la interfaz: CalculatorForm, CalculatorTabs, DetailTable, FinancialChart, Header, HistoryPanel, NumberField y ResultCard.

La carpeta utils contiene finance.js, donde se encuentran las funciones de formato monetario, validación y cálculo financiero.

App.jsx coordina el funcionamiento de la aplicación, main.jsx inicia React y styles.css contiene los estilos visuales. En la carpeta principal también se encuentran index.html, package.json, package-lock.json y este README.

## Fórmulas financieras

**Interés simple:** el interés se obtiene multiplicando el capital inicial por la tasa anual y el tiempo.

**Interés compuesto:** el capital aumenta mensualmente al incorporar los intereses generados.

**Préstamos:** la cuota mensual se calcula mediante una fórmula de amortización. Cuando la tasa es del 0 %, el capital se divide entre el número de cuotas.

**Ahorro:** cada mes se calcula el interés del saldo y después se agrega la aportación mensual.

La tasa se introduce como porcentaje anual; por ejemplo, 12 representa un 12 %. El plazo se convierte a meses redondeando el resultado de multiplicar los años por 12.

## Consideraciones

Los resultados son estimaciones y no incluyen comisiones, impuestos, seguros ni otros cargos. El selector de moneda cambia el formato de presentación, pero no convierte divisas. El historial se conserva en el navegador utilizado y no se sincroniza automáticamente con otros dispositivos.

La exportación a PDF depende de las opciones de impresión disponibles en el navegador.

## Proyecto académico

FinanCalc fue desarrollado como proyecto académico para aplicar conocimientos de desarrollo web, componentes, gestión de estado, validación de formularios, cálculos matemáticos y diseño de interfaces.