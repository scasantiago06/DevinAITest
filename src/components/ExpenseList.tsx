import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Expense } from '../types'
import { formatCurrency } from '../lib/expenses'

interface Props {
  expenses: Expense[]
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, onRemove }: Props) {
  if (expenses.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500">
        Sin gastos en este periodo.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-neutral-100 rounded-xl border border-neutral-200 bg-white">
      {[...expenses]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((expense) => (
          <li key={expense.id} className="flex items-center gap-4 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {expense.description || expense.category}
              </p>
              <p className="text-xs text-neutral-500">
                {expense.category} · {format(new Date(expense.date), "d MMM yyyy", { locale: es })}
              </p>
            </div>
            <span className="text-sm font-semibold tabular-nums">
              {formatCurrency(expense.amount)}
            </span>
            <button
              onClick={() => onRemove(expense.id)}
              aria-label="Eliminar gasto"
              className="text-neutral-400 transition hover:text-red-600"
            >
              ×
            </button>
          </li>
        ))}
    </ul>
  )
}
