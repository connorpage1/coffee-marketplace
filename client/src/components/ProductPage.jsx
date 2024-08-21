import { useEffect, useState } from "react";
// import { Container } from "semantic-ui-react";
import toast from "react-hot-toast";
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

    const filteredProducts = products.filter((product) => {
        const searchLower = searchQuery.toLowerCase();
        const nameMatches = product.name.toLowerCase().includes(searchLower);
        const tagsMatch = product.tag.toLowerCase().includes(searchLower);
        return nameMatches || tagsMatch;
    });

return (
    <main>
        <h1>Coffee and Tea Shop</h1>
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <div>
        {filteredProducts ? (
            filteredProducts.map((product) => (
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