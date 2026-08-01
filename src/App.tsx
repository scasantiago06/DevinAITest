import { useMemo, useState } from 'react'
import { addDays, addMonths, format } from 'date-fns'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { Summary } from './components/Summary'
import { TrendChart } from './components/TrendChart'
import { useLocalStorage } from './hooks/useLocalStorage'
import {
  dailySeries,
  filterByPeriod,
  periodLabel,
  toCsv,
  total,
  totalsByCategory,
} from './lib/expenses'
import type { Expense, Period } from './types'

const PERIODS: { value: Period; label: string }[] = [
  { value: 'day', label: 'Diario' },
  { value: 'week', label: 'Semanal' },
  { value: 'month', label: 'Mensual' },
]

export default function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('gastos', [])
  const [period, setPeriod] = useState<Period>('day')
  const [reference, setReference] = useState(new Date())

  const visible = useMemo(
    () => filterByPeriod(expenses, period, reference),
    [expenses, period, reference],
  )
  const periodTotal = total(visible)
  const series = useMemo(
    () =>
      period === 'day'
        ? totalsByCategory(visible).map((item) => ({
            label: item.category,
            amount: item.amount,
          }))
        : dailySeries(expenses, period, reference),
    [expenses, period, reference, visible],
  )

  const shift = (direction: 1 | -1) =>
    setReference((current) =>
      period === 'month'
        ? addMonths(current, direction)
        : addDays(current, direction * (period === 'week' ? 7 : 1)),
    )

  const exportCsv = () => {
    const blob = new Blob([toCsv(expenses)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gastos-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gastos</h1>
          <p className="text-sm text-neutral-400">
            Tus datos se guardan solo en este navegador.
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={expenses.length === 0}
          className="rounded-lg border border-neutral-800 px-3 py-2 text-sm transition hover:border-neutral-500 disabled:opacity-40"
        >
          Exportar CSV
        </button>
      </header>

      <ExpenseForm onAdd={(expense) => setExpenses((current) => [expense, ...current])} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-neutral-800 bg-neutral-900 p-1">
          {PERIODS.map((option) => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                period === option.value
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => shift(-1)}
            aria-label="Periodo anterior"
            className="rounded-lg border border-neutral-800 px-2 py-1 text-sm hover:border-neutral-500"
          >
            ‹
          </button>
          <span className="min-w-40 text-center text-sm font-medium first-letter:uppercase">
            {periodLabel(period, reference)}
          </span>
          <button
            onClick={() => shift(1)}
            aria-label="Periodo siguiente"
            className="rounded-lg border border-neutral-800 px-2 py-1 text-sm hover:border-neutral-500"
          >
            ›
          </button>
        </div>
      </div>

      <Summary
        expenses={visible}
        total={periodTotal}
        count={visible.length}
        average={visible.length ? periodTotal / visible.length : 0}
      />

      {series.length > 0 && <TrendChart data={series} />}

      <ExpenseList
        expenses={visible}
        onRemove={(id) =>
          setExpenses((current) => current.filter((expense) => expense.id !== id))
        }
      />
    </div>
  )
}
