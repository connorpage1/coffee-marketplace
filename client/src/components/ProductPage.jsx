import { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";
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
        const typeMatch = product.type.toLowerCase().includes(searchLower);
        return nameMatches || tagsMatch || typeMatch;
    });

    return (
        <main>
            <Container>
                <h1>Coffee and Tea Shop</h1>
                <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
                <Grid columns={5} doubling stackable>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Grid.Column key={product.id}>
                                <ProductCard {...product} />
                            </Grid.Column>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </Grid>
            </Container>
        </main>
    );
};

export default ProductPage;