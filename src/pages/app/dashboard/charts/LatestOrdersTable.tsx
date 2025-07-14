// src/pages/app/dashboard/tables/LatestOrdersTable.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { formatDate } from "@/utils/format-date";

export function LatestOrdersTable() {
  const { data, isLoading } = useDashboardMetrics();
  const orders = data?.latestValidatedOrders ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos pedidos validados</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-muted">
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Loja</th>
                <th className="px-4 py-2 text-right">Valor</th>
                <th className="px-4 py-2 text-right">Data</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-muted-foreground"
                  >
                    Carregando...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-muted-foreground"
                  >
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-muted">
                    <td className="px-4 py-2 font-medium">{order.userName}</td>
                    <td className="px-4 py-2">{order.storeName}</td>
                    <td className="px-4 py-2 text-right">
                      R$ {order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatDate(order.validatedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
