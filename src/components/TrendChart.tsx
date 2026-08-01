import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCurrency } from '../lib/expenses'

interface Props {
  data: { label: string; amount: number }[]
}

export function TrendChart({ data }: Props) {
  return (
    <div className="h-56 rounded-xl border border-neutral-200 bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={70}
            tickFormatter={(value: number) => formatCurrency(value)}
          />
          <Tooltip
            cursor={{ fill: '#fafafa' }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Bar dataKey="amount" fill="#171717" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
