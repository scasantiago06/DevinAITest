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
    <div className="h-56 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            stroke="#a3a3a3"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={70}
            stroke="#a3a3a3"
            tickFormatter={(value: number) => formatCurrency(value)}
          />
          <Tooltip
            cursor={{ fill: '#262626' }}
            contentStyle={{
              background: '#0a0a0a',
              border: '1px solid #262626',
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: '#a3a3a3' }}
            itemStyle={{ color: '#f5f5f5' }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Bar dataKey="amount" fill="#e5e5e5" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
