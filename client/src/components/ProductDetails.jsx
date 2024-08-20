import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
// import toast, { Toaster } from "react-router-dom";
import { Container } from 'semantic-ui-react';


function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { productId }  = useParams();
    const { user } = useOutletContext();
    

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
              console.log();
            })
        }})
        .catch(console.log)
    }, [productId]);


if (!product){
  return <h3>Loading</h3>
}


const handleDelete = (id) =>{
  fetch('/products/<int:id>', id, {
      method : 'DELETE',
  })

}

const handleUpdate = (id) =>{
  fetch('/products/<int:id>', id)

}

const handleAddToCart = (id) =>{

}


const { name, description, seller, image_url, id, user_id } = product
return <div>
    <h1>{name} </h1>
    <h3>{seller.first_name + ' ' + seller.last_name} </h3>
    <Container> 
      <img src={image_url} alt={name}/>
    </Container>
    <Container textAlign="center">
      {description}
    </Container>
    { user && user.id === user_id && <button onClick={() => handleDelete(id)}> Delete </button> }
    { user && user.id === user_id && <button onClick={() => handleUpdate(id)}> Delete </button> }
    { user && user.role_id === 1 && product.stock > 0 && <button onClick={() => handleAddToCart(id)}> Add to Cart </button> }
</div>;
  }


export default ProductDetails;


{/* <ul>{sellerProducts.map((product) => (<ProductCard key={product.id} {...product}/> ))}</ul>  */}
// replace sellerProducts with product -> seller -> selling details 

//if user.id = seller.id