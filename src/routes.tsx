// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/pages/_layouts/app";
import { AuthLayout } from "@/pages/_layouts/auth";
import { NotFound } from "@/pages/404";
import { Dashboard } from "@/pages/app/dashboard/dashboard";
import { Orders } from "@/pages/app/orders/orders";
import { PendingOrdersPage } from "@/pages/app/orders/pending/PendingOrdersPage";
import { ProductEdit } from "@/pages/app/products/ProductEdit";
import { ProductForm } from "@/pages/app/products/ProductForm";
import { ProductList } from "@/pages/app/products/ProductList";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { Error } from "@/pages/error";

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
        path: "produtos/novo",
        element: <ProductForm />,
      },
      {
        path: "produtos/editar/:id",
        element: <ProductEdit />,
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
