import { Link } from "react-router-dom";

function ProductCard({ name, image_url, price, stock, tag, type, id }) {






    return (
        <li className="card">
            <Link to={`/products/${id}`}><h1>{name}</h1></Link>
            <img src={image_url} alt={name}/>
            <h2> {price} </h2>
            {stock ? <>{stock} remaining</> : <>Out of Stock</>}
            {/* <button onClick={() => handleAddToCart(id)}> Add to Cart </button> */}
            <h3>{type}: {tag}</h3>
        </li>

    )
}

export default ProductCard