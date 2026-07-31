# Gastos

Registro minimalista de gastos diarios, semanales y mensuales. Sin backend ni base de datos: todo se guarda en `localStorage` del navegador.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- date-fns (agrupación por periodo)
- Recharts (gráfico de tendencia)

## Uso

Requiere Node >= 20.19 (o 22, ver `.nvmrc`).

```bash
npm install
npm run dev
```

- `npm run build` genera el sitio estático en `dist/` (desplegable en Vercel, Netlify o GitHub Pages).
- `npm run lint` ejecuta oxlint.

## Funcionalidad

- Registrar gastos con monto, categoría, descripción y fecha.
- Ver totales por día, semana o mes y navegar entre periodos.
- Resumen con total, número de registros, promedio y top de categorías.
- Exportar todos los gastos a CSV.
