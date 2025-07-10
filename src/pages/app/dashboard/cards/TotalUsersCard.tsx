import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardMetrics } from '@/hooks/use-dashboard-metrics'

export function TotalUsersCard() {
  const { data, isLoading } = useDashboardMetrics()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          {isLoading ? '...' : data?.totalUsers ?? 0}
        </span>
      </CardContent>
    </Card>
  )
}
