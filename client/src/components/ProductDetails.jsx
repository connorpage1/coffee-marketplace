import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast"

import { useNavigate } from "react-router-dom"
import EditModal from "./EditModal";
import { Card, Image, Container, Grid, Header, Button } from "semantic-ui-react";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { user } = useOutletContext();

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/products/${productId}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
            .then((data) => {
              setProduct(data);


            })
        } else {
          return resp.json()
            .then(() => {
              resp.json().then((errorObj) => toast.error(errorObj.error))
            })
        }
      })
      .catch((errorObj) => toast.error(errorObj.error))
  }, [productId]);


  if (!product) {
    return <h3>Loading</h3>
  }


  const handleDelete = (productId) => {
    fetch(`/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          navigate('/products')
          return res.json();

        } else {
          return res.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((errorObj) => toast.error(errorObj.error))
  };

  const { name, description, seller, image_url, id, user_id, price, stock, type, tag, sku } = product



  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Image src={image_url} alt={name} fluid />
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Card>
                    <Card.Content>
                      <Header as='h1'>{name}</Header>
                      <Card.Meta>
                        Seller: <Link to={`/products/vendor/${user_id}`} className="main-card" id="seller">{seller.first_name} {seller.last_name}</Link>
                      </Card.Meta>
                      <Card.Description>
                        <div className="main-card" id="capitalize">{type}: {tag}</div>
                        <div className="main-card">${price}/12oz bag</div>
                        <div>{description}</div>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      {user && user.id === user_id && (
                        <>
                          <Button onClick={() => handleDelete(id)} color='red'>Delete</Button>
                          <Button color='blue'>Edit</Button>
                        </>
                      )}
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Card className="stock-sku">
                    <Card.Content>
                      <Card.Description>
                        {stock ? `Stock: ${stock} remaining` : 'Out of Stock'}
                      </Card.Description>
                      <Card.Description>
                        SKU: {sku}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
export default ProductDetails;
