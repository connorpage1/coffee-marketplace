import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";

const ProductPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
    fetch(`/products`)
        .then((resp) => {
        if (resp.ok) {
            resp.json().then(setProducts);
        } else {
            resp.json().then((errorObj) => toast.error(errorObj.error));
        }
    })
        .catch((errorObj) => toast.error(errorObj.message));
    }, []);

    const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    };

return (
    <main>
        <h1>Coffee and Tea Shop</h1>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <div>
        {products.length > 0 ? (
            products.map((product) => (
                <ProductCard key={product.id} {...product} />
        ))
        ) : (
        <p>No products available</p>
        )}
        </div>
    </main>
);
};

export default ProductPage;