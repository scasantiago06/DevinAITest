import { formatCurrency, totalsByCategory } from '../lib/expenses'
import type { Expense } from '../types'

interface Props {
  expenses: Expense[]
  total: number
  count: number
  average: number
}

export function Summary({ expenses, total, count, average }: Props) {
  const byCategory = totalsByCategory(expenses).slice(0, 3)

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card label="Total del periodo" value={formatCurrency(total)} />
      <Card label="Registros" value={String(count)} />
      <Card label="Promedio por gasto" value={formatCurrency(average)} />
      {byCategory.length > 0 && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:col-span-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
            Top categorías
          </p>
          <ul className="space-y-1">
            {byCategory.map((item) => (
              <li key={item.category} className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span className="font-medium tabular-nums">
                  {formatCurrency(item.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-xs uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}
