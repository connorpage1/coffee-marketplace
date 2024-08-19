import { useState } from "react";
import { useOutletContext } from "react-router-dom";
// import { Container } from 'semantic-ui-react';
import ProductDetails from "./ProductDetails";


const ProductPage = () => {
    // const [quantity, setQuantity] = useState(1);
    // const [searchQuery, setSearchQuery] = useState("");
    const { products } = useOutletContext()

    // const handleAddToCart = () => {
    //     // add functionality here
    //     alert(`Added ${quantity} of ${product.name} to cart!`);
    // };

    // const handleSearch = (e) => {
    //     setSearchQuery(e.target.value);
    // };
    
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