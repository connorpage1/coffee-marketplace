import App from "./App";
import Landing from "./Landing"
import ProductDetails from "./ProductDetails";
import ProductPage from "./ProductPage";
import Signup from "./Signup";
import Login from "./Login";
import MyProfile from "./MyProfile";
import VendorDetails from "./VendorDetails";
import Checkout from "./Checkout";
import { createBrowserRouter } from "react-router-dom";
import BestSeller from "./BestSellingProduct";

export const router = createBrowserRouter([
{
    path: '/',
    element: <App/>,
    children:[
        {
            index: true,
            element: <Landing />
        },
        {
            path: '/products',
            element: <ProductPage />
        },
        {
            path: '/products/:productId',
            element: <ProductDetails/>
        },
        {
            path: 'products/vendor/:vendorId',
            element: <VendorDetails />
        },
        {
            path: '/myprofile',
            element: <MyProfile />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/checkout",
            element: <Checkout />
        }
    ]
}

])
