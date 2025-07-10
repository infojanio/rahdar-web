import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'

export function ActiveProductsCard() {
  const { data, isLoading } = useDashboardMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          {isLoading ? '...' : data?.activeProducts ?? 0}
        </span>
      </CardContent>
    </Card>
  )
}
