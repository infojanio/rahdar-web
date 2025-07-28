import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/lib/axios";

type Order = {
  id: string;
  userId: string;
  user_name: string;
  storeId: string;
  totalAmount: number;
  discountApplied: number;
  status: "PENDING" | "VALIDATED" | "EXPIRED";
  createdAt: string;
};

export function OrderHistoryPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>();

  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["orders", page, status],
    queryFn: async () => {
      const response = await api.get("/orders", {
        params: { page, status },
      });
      return response.data.orders;
    },
  });

  const validateOrder = useMutation({
    mutationFn: async (orderId: string) => {
      await api.patch(`/orders/${orderId}/validate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">
        📑 Histórico de Pedidos
      </h1>

      {/* Filtro por status */}
      <div className="flex items-center gap-4">
        <select
          value={status ?? ""}
          onChange={(e) => setStatus(e.target.value || undefined)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">Todos os Status</option>
          <option value="PENDING">Pendente</option>
          <option value="VALIDATED">Validado</option>
          <option value="EXPIRED">Expirado</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">Usuário</th>
              <th className="text-left p-4">Valor Total</th>
              <th className="text-left p-4">Desconto</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Data</th>
              <th className="text-left p-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Nenhum pedido encontrado.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{order.user_name}</td>
                  <td className="p-4">R$ {order.totalAmount.toFixed(2)}</td>
                  <td className="p-4">R$ {order.discountApplied.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "VALIDATED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status === "VALIDATED"
                        ? "Validado"
                        : order.status === "PENDING"
                        ? "Pendente"
                        : "Expirado"}
                    </span>
                  </td>
                  <td className="p-4">
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="p-4">
                    {order.status === "PENDING" && (
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/pedidos/${order.id}`)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Detalhes
                        </button>
                      </td>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          ← Anterior
        </button>
        <span className="text-sm text-gray-600">Página {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={orders.length === 0}
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}
