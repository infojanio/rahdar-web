// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-2">🛒 Produtos</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <NavLink to="/produtos/novo" className="hover:underline">
              ➕ Adicionar
            </NavLink>
          </li>

          <li>
            <NavLink to="/produtos/todos" className="hover:underline">
              📝 Listar Todos
            </NavLink>
          </li>
          <li>
            <NavLink to="/produtos" className="hover:underline">
              📝 Buscar
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2 mt-8">📢 SubCategorias</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <NavLink to="/subcategories/novo" className="hover:underline">
              ➕ Adicionar
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2 mt-8">📢 Banners</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <NavLink to="/banners/novo" className="hover:underline">
              ➕ Adicionar
            </NavLink>
          </li>
          <li>
            <NavLink to="/banners" className="hover:underline">
              📝 Editar / Excluir
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
