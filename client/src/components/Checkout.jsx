import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Container,
  Button,
  Header,
  Image,
  Input,
  Grid,
} from "semantic-ui-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, resetCart, user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;

  const handleCheckout = () => {
    if (user) {
      const orderItems = Array.from(document.querySelectorAll(".row")).map(
        (div) => {
          const productPrice = div.querySelector("h3").textContent;
          const productQuantity = div.querySelector("input").value || 1;
          const productId = div.querySelector("div.ui.input").dataset.productId;
          return {
            quantity: Number(productQuantity),
            product_id: productId,
            price_at_order: Number(productPrice.replace("$", "")),
          };
        }
      );

      fetch("/order_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItems),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw resp.json();
          }
        })
        .then((message) => {
          toast.success(`Thank you for your purchase, see you soon!`);
          resetCart();
          navigate("/products");
        })
        .catch((error) => toast.error(`Error: ${error.error}`));
    }
  };

  const mappedCart = cart.map((item) => (
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
          className="quantity-input"
        />
      </Grid.Column>
    </Grid.Row>
  ));

  return (
    <Container>
      <Header as="h1" textAlign="left" style={{ margin: "20px 0" }}>
        Checkout
      </Header>
      <Grid stackable>{mappedCart}</Grid>
      <Button
        primary
        disabled={cart.length === 0}
        onClick={handleCheckout}
        style={{ marginTop: "20px" }}
      >
        Checkout Now
      </Button>
    </Container>
  );
};

export default Checkout;
