import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

function ProductCard({
  name,
  image_url,
  price,
  stock,
  tag,
  type,
  id,
}) {
  const { addToCart, user } = useOutletContext();

  const [disable, setDisable] = useState(false);

  const handleClick = () => {
    addToCart({ name, image_url, price, stock, tag, type, id });
    setDisable(true);
  };

  return (
    <Card className="product-card" fluid>
      <Link to={`/products/${id}`}>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
      </Link>
      <Image src={image_url} alt={name} wrapped ui={false} />
      <Card.Content>
        <Card.Meta>
          <span>{type}: {tag}</span>
        </Card.Meta>
        <Card.Description>
          ${price}/12oz bag
        </Card.Description>
        <Card.Description>
          {stock ? <>Stock: {stock} remaining</> : <>Out of Stock</>}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        {user && (
          <Button disabled={disable} onClick={handleClick} primary fluid>
            Add to Cart <Icon name="cart plus"/>
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

export default ProductCard;
