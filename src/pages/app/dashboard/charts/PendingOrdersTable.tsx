// src/pages/app/dashboard/charts/PendingOrdersTable.tsx

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { formatCurrency } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";

interface Order {
  id: string;
  user_name: string;
  storeId: string;
  totalAmount: number;
  status: "PENDING" | "VALIDATED" | "EXPIRED";
  createdAt: string;
}

export function PendingOrdersTable() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["orders", "pending"],
    queryFn: async () => {
      const response = await api.get("/orders", {
        params: { status: "PENDING" },
      });
      return response.data.orders;
    },
  });

  const { mutateAsync: validateOrder, isPending: isValidating } = useMutation({
    mutationFn: async (orderId: string) => {
      await api.patch(`/orders/${orderId}/validate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "pending"] });
    },
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Pedidos Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando pedidos...</p>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-muted py-2"
              >
                <div>
                  <p className="text-sm font-medium">{order.user_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt)} -{" "}
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={isValidating}
                  onClick={() => validateOrder(order.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validar
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum pedido pendente encontrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
