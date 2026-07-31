export type Period = 'day' | 'week' | 'month'

export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Hogar',
  'Ocio',
  'Salud',
  'Otros',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Expense {
  id: string
  amount: number
  category: Category
  description: string
  date: string
}
