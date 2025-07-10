import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { Orders } from './pages/app/orders/orders'
import ProductListPage from './pages/app/products'
import EditProductPage from './pages/app/products/edit/[id]'
import NewProductPage from './pages/app/products/new'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/new', element: <NewProductPage /> },
      { path: 'products/edit/:id', element: <EditProductPage /> },
    ],
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignIn /> }],
  },
  {
    path: '/sign-up',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignUp /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
