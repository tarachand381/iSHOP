import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from './website/Pages/Layout'
import Home from './website/Pages/Home'
import Profile from './website/Pages/Profile'
import Store from './website/Pages/Store'
import Cart from './website/Pages/Cart'
import Register from './website/Pages/Register'
import Login from './website/Pages/Login'
import Checkout from './website/Pages/Checkout'
import ThankYou from './website/Pages/ThankYou'

import AdminLayout from './admin/Pages/AdminLayout'
import DashBoard from './admin/Pages/DashBoard'
import CategoryView from './admin/Pages/category/CategoryView'
import CategoryAdd from './admin/Pages/category/CategoryAdd'
import CategoryEdit from './admin/Pages/category/CategoryEdit'
import ProductView from './admin/Pages/product/ProductView'
import ProductAdd from './admin/Pages/product/ProductAdd'
import MultipleImages from './admin/Pages/product/MultipleImages'
import ColorView from './admin/Pages/color/ColorView'
import ColorAdd from './admin/Pages/color/ColorAdd'
import ColorEdit from './admin/Pages/color/ColorEdit'
import AdminLogin from './admin/Pages/AdminLogin'

import { lsToCart } from './redux/reducers/cartSlice'
import { lsToUser } from './redux/reducers/userSlice'
import ProductEdit from './admin/Pages/product/ProductEdit'

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lsToCart());
    dispatch(lsToUser());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/profile', element: <Profile /> },
        { path: '/store/:categorySlug?', element: <Store /> },
        { path: '/cart', element: <Cart /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '/thankYou/:order_id', element: <ThankYou /> }
      ]
    },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: '/admin', element: <DashBoard /> },
        { path: 'category', element: <CategoryView /> },
        { path: 'category/add', element: <CategoryAdd /> },
        { path: 'category/edit/:categoryId', element: <CategoryEdit /> },
        { path: 'color', element: <ColorView /> },
        { path: 'color/add', element: <ColorAdd /> },
        { path: 'color/edit/:colorId', element: <ColorEdit /> },
        { path: 'product', element: <ProductView /> },
        { path: 'product/add', element: <ProductAdd /> },
        { path: 'product/edit/:productId', element: <ProductEdit /> },
        { path: 'product/multiple-image/:productId', element: <MultipleImages /> }
      ]
    },
    { path: '/admin/login', element: <AdminLogin /> }
  ]);

  return <RouterProvider router={router} />;
}
