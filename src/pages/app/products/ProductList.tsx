import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  status: boolean;
  cashback_percentage: number;
  image: string;
  subcategory: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
};

export function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    enabled: !!user,
    queryFn: async () => {
      const response = await api.get("/products");
      console.log("🟢 Dados brutos da API:", response.data);
      return Array.isArray(response.data)
        ? response.data
        : response.data.products;
    },
  });

  const { mutateAsync: disableProduct } = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/products/${id}/disable`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <p>Carregando produtos...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>

      <table className="min-w-full bg-white shadow-md rounded border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Imagem</th>
            <th className="p-3 text-left">Nome</th>
            <th className="text-left p-3">Subcategoria</th>

            <th className="p-3 text-left">Descrição</th>
            <th className="p-3 text-left">Preço</th>
            <th className="p-3 text-left">Estoque</th>
            <th className="p-3 text-left">Cashback (%)</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product.id}
              className={`border-b ${
                !product.status
                  ? "bg-red-100 text-gray-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <td className="p-3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-sm text-gray-400">Sem imagem</span>
                )}
              </td>
              <td className="p-3">{product.name}</td>

              <td className="p-3">{product.subcategory?.name ?? "–"}</td>

              <td className="p-3">{product.description}</td>
              <td className="p-3">R$ {parseFloat(product.price).toFixed(2)}</td>
              <td className="p-3">{product.quantity}</td>
              <td className="p-3">{product.cashback_percentage}%</td>
              <td className="p-3">{product.status ? "Ativo" : "Inativo"}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/produtos/editar/${product.id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Editar
                </button>
                {product.status && (
                  <button
                    onClick={() => disableProduct(product.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Desativar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
