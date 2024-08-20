

function ProductCard({ name, image_url, price, stock, tag, type }) {




    return (
        <li className="card">
            <h1>{name}</h1>
            <img src={image_url} alt={name}/>
            <h2> {price} </h2>
            {stock ? '' : <>Out of Stock</>}
            <h3>{type}: {tag}</h3>
        </li>

    )
}

export default ProductCard