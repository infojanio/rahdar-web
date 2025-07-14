import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'

export function CashbackUsedCard() {
  const { data, isLoading } = useDashboardMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashback Utilizado</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold text-red-600">
          {isLoading
            ? '...'
            : `R$ -${data?.totalCashbackUsed?.toFixed(2) ?? '0.00'}`}
        </span>
      </CardContent>
    </Card>
  )
}
