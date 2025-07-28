// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/pages/_layouts/app";
import { AuthLayout } from "@/pages/_layouts/auth";
import { NotFound } from "@/pages/404";
import { Dashboard } from "@/pages/app/dashboard/dashboard";
import { Orders } from "@/pages/app/orders/orders";
import { PendingOrdersPage } from "@/pages/app/orders/pending/PendingOrdersPage";
import { ProductEdit } from "@/pages/app/products/ProductEdit";
import { ProductListAll } from "@/pages/app/products/ProductListAll";
import { ProductNew } from "@/pages/app/products/ProductNew";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { Error } from "@/pages/error";

import { CategoryEdit } from "./pages/app/categories/CategoryEdit";
import { CategoryList } from "./pages/app/categories/CategoryList";
import { CategoryNew } from "./pages/app/categories/CategoryNew";
import { OrderDetailsPage } from "./pages/app/orders/OrderDetailsPage";
import { OrderHistoryPage } from "./pages/app/orders/OrderHistoryPage";
import { OrderValidationPage } from "./pages/app/orders/OrderValidatePage";
import { ProductList } from "./pages/app/products/ProductList";
import { SubcategoryEdit } from "./pages/app/subcategories/SubcategoryEdit";
import { SubcategoryList } from "./pages/app/subcategories/SubcategoryList";
import { SubcategoryNew } from "./pages/app/subcategories/SubcategoryNew";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // 🔒 Layout protegido com AuthContext
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/pending",
        element: <PendingOrdersPage />,
      },
      {
        path: "produtos",
        element: <ProductList />,
      },
      {
        path: "produtos/todos",
        element: <ProductListAll />,
      },
      {
        path: "produtos/novo",
        element: <ProductNew />,
      },
      {
        path: "produtos/editar/:id",
        element: <ProductEdit />,
      },
      {
        path: "categorias/todos",
        element: <CategoryList />,
      },
      {
        path: "categorias/novo",
        element: <CategoryNew />,
      },
      {
        path: "categorias/editar/:id",
        element: <CategoryEdit />,
      },
      {
        path: "subcategorias/todos",
        element: <SubcategoryList />,
      },
      {
        path: "subcategorias/novo",
        element: <SubcategoryNew />,
      },
      {
        path: "subcategorias/editar/:id",
        element: <SubcategoryEdit />,
      },

      {
        path: "/pedidos/validar",
        element: <OrderValidationPage />,
      },
    ],
  },

  {
    path: "/sign-in",
    element: <AuthLayout />, // layout para login
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },

  {
    path: "/sign-up",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
