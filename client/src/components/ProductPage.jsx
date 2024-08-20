import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
// import { Container } from 'semantic-ui-react';
import ProductDetails from "./ProductDetails";
import toast, { Toaster } from "react-hot-toast"


const ProductPage = () => {
    // const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch(`/api/v1/products`)
        .then(resp => {
        if (resp.ok) { 
            resp.json().then(setProducts)
        } else {
            resp.json().then(errorObj => toast.error(errorObj.error))
        }
        })
        .catch(errorObj => toast.error(errorObj.message))
    }, []);

    // const handleAddToCart = () => {
    //     // add functionality here
    //     alert(`Added ${quantity} of ${product.name} to cart!`);
    // };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    
    return (
        <main>
            <h1>Coffee and Tea Shop</h1>
            {/* <SearchBar searchQuery={ searchQuery } handleSearch = { handleSearch} /> */}
            <div>
                {products && products.map(product => <ProductDetails key={product.id} product={product} />)}
            </div>
        </main>
    );
};

export default ProductPage;