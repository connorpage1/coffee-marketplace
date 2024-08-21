import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

function ProductCard({ name, image_url, price, stock, tag, type, id }) {
  const { addToCart, user } = useOutletContext();

  const [disable, setDisable] = useState(false);

  const handleClick = () => {
    addToCart({ name, image_url, price, stock, tag, type, id });
    setDisable(true);
  };

  return (
    <div className="card">
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>
      <img src={image_url} alt={name} />
      <h2>
        {type}: {tag}
      </h2>
      <h2> ${price} </h2>
      <h2>{stock ? <>{stock} remaining</> : <>Out of Stock</>}</h2>
      <h2>
        {user && (
          <button disabled={disable} onClick={handleClick}>
            {" "}
            Add to Cart{" "}
          </button>
        )}
      </h2>
      <>
        <br />
      </>
    </div>
  );
}

export default ProductCard;
