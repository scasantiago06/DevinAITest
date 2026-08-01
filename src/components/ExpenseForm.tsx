import { useState } from 'react'
import { format } from 'date-fns'
import { CATEGORIES, type Category, type Expense } from '../types'

interface Props {
  onAdd: (expense: Expense) => void
}

export function ExpenseForm({ onAdd }: Props) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) return

    onAdd({
      id: crypto.randomUUID(),
      amount: value,
      category,
      description: description.trim(),
      date: new Date(`${date}T12:00:00`).toISOString(),
    })
    setAmount('')
    setDescription('')
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-xl border border-neutral-200 bg-white p-4 sm:grid-cols-[1fr_1fr_2fr_1fr_auto]"
    >
      <input
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        inputMode="decimal"
        placeholder="Monto"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        required
      />
      <select
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        value={category}
        onChange={(event) => setCategory(event.target.value as Category)}
      >
        {CATEGORIES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        Agregar
      </button>
    </form>
  )
}
