import App from "./App";
import Landing from "./Landing"
import ProductDetails from "./ProductDetails";
import ProductPage from "./ProductPage";
import Signup from "./Signup";
import Login from "./Login";
import MyProfile from "./MyProfile";
import VendorDetails from "./VendorDetails";

const routes = [
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
            path: '/products/:id',
            element: <ProductDetails />
        },
        {
            path: '/vendor/:id',
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
        }
     ]
}

]

export default routes 