import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Expense, Period } from '../types'

const WEEK_OPTIONS = { locale: es, weekStartsOn: 1 } as const

export function periodInterval(period: Period, reference: Date) {
  switch (period) {
    case 'day':
      return { start: startOfDay(reference), end: endOfDay(reference) }
    case 'week':
      return {
        start: startOfWeek(reference, WEEK_OPTIONS),
        end: endOfWeek(reference, WEEK_OPTIONS),
      }
    case 'month':
      return { start: startOfMonth(reference), end: endOfMonth(reference) }
  }
}

export function periodLabel(period: Period, reference: Date) {
  const { start, end } = periodInterval(period, reference)
  switch (period) {
    case 'day':
      return format(start, "EEEE d 'de' MMMM", { locale: es })
    case 'week':
      return `${format(start, 'd MMM', { locale: es })} - ${format(end, 'd MMM', { locale: es })}`
    case 'month':
      return format(start, 'MMMM yyyy', { locale: es })
  }
}

export function filterByPeriod(expenses: Expense[], period: Period, reference: Date) {
  const interval = periodInterval(period, reference)
  return expenses.filter((expense) =>
    isWithinInterval(new Date(expense.date), interval),
  )
}

export function total(expenses: Expense[]) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

export function totalsByCategory(expenses: Expense[]) {
  const totals = new Map<string, number>()
  for (const expense of expenses) {
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount)
  }
  return [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function dailySeries(expenses: Expense[], period: Period, reference: Date) {
  const { start, end } = periodInterval(period, reference)
  return eachDayOfInterval({ start, end }).map((day) => ({
    label: format(day, period === 'month' ? 'd' : 'EEE d', { locale: es }),
    amount: total(filterByPeriod(expenses, 'day', day)),
  }))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function toCsv(expenses: Expense[]) {
  const rows = expenses.map((expense) =>
    [
      expense.date,
      expense.category,
      `"${expense.description.replace(/"/g, '""')}"`,
      expense.amount,
    ].join(','),
  )
  return ['fecha,categoria,descripcion,monto', ...rows].join('\n')
}
