import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'

export function CashbackGeneratedCard() {
  const { data, isLoading } = useDashboardMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashback Gerado</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold text-green-600">
          {isLoading
            ? '...'
            : `R$ +${data?.totalCashbackGenerated?.toFixed(2) ?? '0.00'}`}
        </span>
      </CardContent>
    </Card>
  )
}
