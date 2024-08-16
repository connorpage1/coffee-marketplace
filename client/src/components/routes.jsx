import App from "./App";
import Landing from "./Landing"
import ProductPage from "./ProductPage";

const routes = [
{
     path: '/',
     element: <App/>,
     children:[
        {
            index: true,
            element: <Landing/>
        },
        {
            path: '/shop',
            element: <ProductPage/>
        }
     ]
}

]

export default routes test