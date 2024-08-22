import { useOutletContext, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Button, Header, Image, Input, Grid } from "semantic-ui-react";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, resetCart, updateStock } = useOutletContext();

    const mappedCart = cart.map(item => (
        <Grid.Row key={item.id}>
            <Grid.Column width={4}>
                <Image src={item.image_url} alt={item.name} size="small" />
            </Grid.Column>
            <Grid.Column width={8}>
                <Header as="h2">{item.name}</Header>
                <Header as="h3">${item.price}</Header>
                <Header as="h4">Quantity</Header>
                <Input
                    type="number"
                    defaultValue="1"
                    min="1"
                    max={item.stock}
                    step="1"
                    data-product-id={item.id}
                />
            </Grid.Column>
        </Grid.Row>
    ));

    const handleCheckout = () => {
        const orderItems = Array.from(document.querySelectorAll(".ui.input")).map(input => {
            const productPrice = input.previousElementSibling.textContent;
            const productQuantity = input.querySelector("input").value || 1;
            const productId = input.querySelector("input").dataset.productId;

            const item = cart.find(item => item.id === productId);
            if (item) {
                const updatedStock = item.stock - productQuantity;
                updateStock(productId, updatedStock);
            }
            return {
                "quantity": productQuantity,
                "product_id": productId,
                "price_at_order": Number(productPrice),
            };
        });

        fetch("/order_items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderItems)
        })
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Failed to create order');
            }
        })
        .then(message => {
            toast.success(`Thank you for your purchase, see you soon!`);
            resetCart();
            navigate('/products');
        })
        .catch(error => toast.error('Error:', error.message));
    };

    return (
        <Container>
            <Header as="h1" textAlign="left" style={{ margin: '20px 0' }}>
                Checkout
            </Header>
            <Grid stackable>
                {mappedCart}
            </Grid>
            <Button
                primary
                disabled={cart.length === 0}
                onClick={handleCheckout}
                style={{ marginTop: '20px' }}
            >
                Checkout Now 
            </Button>
        </Container>
    );
};

export default Checkout;
