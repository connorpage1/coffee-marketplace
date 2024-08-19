import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Container } from 'semantic-ui-react';
import ProductDetails from "./ProductDetails";


function ProductPage() {
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const { products } = useOutletContext()

    const handleAddToCart = () => {
        
        alert(`Added ${quantity} of ${product.name} to cart!`);
    };

    const finalProducts = productsDisplay
        .filter((product) => {
            product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
        })
        .map((product) => {
            <ProductDetails 
                key={product.id}
                {...product}
                handleAddToCart={handleAddToCart}
            />
        })
    return <div>
        <h1>5</h1>
    </div>;
  }

  export default ProductPage;