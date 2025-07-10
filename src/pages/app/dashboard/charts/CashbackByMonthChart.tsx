// src/pages/app/dashboard/charts/CashbackByMonthChart.tsx
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'

export function CashbackByMonthChart() {
  const { data, isLoading } = useDashboardMetrics()

  const chartData =
    data?.cashbackByMonth.map((month) => ({
      name: month.month,
      value: month.total,
    })) ?? []

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Cashback gerado por mês</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <span className="text-muted-foreground">Carregando gráfico...</span>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `R$ ${v}`}
              />
              <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
