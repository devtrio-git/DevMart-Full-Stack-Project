import { createBrowserRouter } from "react-router-dom";
// import HomePage from "../pages/home/home";
// import SignUpPage from "../pages/auth/sign-up";
// import LoginPage from "../pages/auth/login";
// import ProductsPage from "../pages/products/products";
// import ProductInfoPage from "../pages/product-info/product-info";
// import Checkout from "../pages/checkout/checkout";
import { Suspense, lazy } from "react";
import Loader from "../components/loader/loader";
import AdminPanel from "../admin/admin-panel";
import Dashboard from "../admin/admin-pages/dashboard/dashbaord";
import ProductsGrid from "../admin/admin-pages/products/products-grid";
import CategoryGrid from "../admin/admin-pages/categories/categories-grid";

const HomePage = lazy(()=> import("../pages/home/home"))
const SignUpPage = lazy(()=> import("../pages/auth/sign-up"))
const LoginPage = lazy(()=> import("../pages/auth/login"))
const ForgotPasswordPage = lazy(()=> import("../pages/auth/forgot-password"))
const ResetPassword = lazy(()=> import("../pages/auth/reset-password"))
const OtpVerify = lazy(()=> import("../pages/auth/otp-verify"))
const ProductsPage = lazy(()=> import("../pages/products/products"))
const ProductInfoPage = lazy(()=> import("../pages/product-info/product-info"))
const Checkout = lazy(()=> import("../pages/checkout/checkout"))



export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense> 
    },
    {
        path: '/auth/sign-up',
        element: <Suspense fallback={<Loader></Loader>}> <SignUpPage></SignUpPage> </Suspense> 
    },
    {
        path: '/auth/login',
        element: <Suspense fallback={<Loader></Loader>}><LoginPage></LoginPage> </Suspense> 
    },
    {
        path: '/auth/forgot-password',
        element: <Suspense fallback={<Loader></Loader>}><ForgotPasswordPage></ForgotPasswordPage> </Suspense> 
    },
    {
        path: '/auth/otp-verify',
        element: <Suspense fallback={<Loader></Loader>}><OtpVerify></OtpVerify> </Suspense> 
    },
    {
        path: '/auth/reset-password',
        element: <Suspense fallback={<Loader></Loader>}><ResetPassword></ResetPassword> </Suspense> 
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage> </Suspense> 
    },
    {
        path: '/product-info',
        element: <Suspense fallback={<Loader></Loader>}> <ProductInfoPage></ProductInfoPage> </Suspense> 
    },
   
    {
        path: '*',
        element: <h1>404 Not Found</h1>  // For any other unmatched routes, redirect to 404 page
    }
])

export const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense> 
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage> </Suspense> 
    },
    {
        path: '/product-info',
        element: <Suspense fallback={<Loader></Loader>}> <ProductInfoPage></ProductInfoPage> </Suspense> 
    },
    {
        path: '/checkout',
        element: <Suspense fallback={<Loader></Loader>}><Checkout></Checkout> </Suspense> 
    },
    {
        path: '/admin',
        element: <AdminPanel></AdminPanel>,
        children: [
            {
                index: true,
                element: <Dashboard></Dashboard>
            },
            {
                path: '/admin/categories',
                element: <CategoryGrid></CategoryGrid>
            },
            {
                path: '/admin/products',
                element: <ProductsGrid></ProductsGrid>
            },
        ]
    },
    {
        path: '*',
        element: <h1>404 Not Found</h1>  // For any other unmatched routes, redirect to 404 page
    }
])