import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { api } from "@/lib/axios";

export function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data.orders[0]; // pegamos apenas o 1º pedido
    },
    enabled: !!orderId,
  });

  const validateOrder = useMutation({
    mutationFn: async () => {
      await api.patch(`/orders/${orderId}/validate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // atualiza a listagem
    },
  });

  if (isLoading) return <p className="p-4">Carregando pedido...</p>;
  if (!orders)
    return <p className="p-4 text-red-600">Pedido não encontrado.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        📋 Detalhes do Pedido
      </h1>

      <div className="space-y-2">
        <p>
          <strong>Status:</strong> {orders.status}
        </p>
        <p>
          <strong>Total:</strong> R$ {orders.totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Desconto aplicado:</strong> R${" "}
          {orders.discountApplied.toFixed(2)}
        </p>
        {orders.qrCodeUrl && (
          <img
            src={orders.qrCodeUrl}
            alt="QR Code"
            className="w-40 h-40 mt-2"
          />
        )}
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold">Itens do Pedido:</h2>
        <ul className="space-y-2">
          {orders.items.map((item, index) => (
            <li key={index} className="border p-2 rounded flex gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded object-cover"
                />
              )}
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>Preço: R$ {item.price?.toFixed(2)}</p>
                <p>Cashback: {item.cashback_percentage}%</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {orders.status === "PENDING" && (
        <button
          onClick={() => validateOrder.mutate()}
          disabled={validateOrder.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {validateOrder.isLoading
            ? "Validando..."
            : "Validar Pedido e Creditar Cashback"}
        </button>
      )}
    </div>
  );
}
