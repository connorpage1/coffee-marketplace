import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import toast, { Toaster } from "react-router-dom";
import { Container } from 'semantic-ui-react';


function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { productId }  = useParams();
    

    useEffect(() => {
      fetch(`/products/${productId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json()
            .then((data) => {
              setProduct(data);
              console.log(data)
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

const { name, description, seller, image_url } = product
return <div>
    <h1>{name} </h1>
    <h3>{seller.first_name + ' ' + seller.last_name} </h3>
    <Container textAlign="center">
      {description}
    </Container>
</div>;
  }


export default ProductDetails;


{/* <ul>{sellerProducts.map((product) => (<ProductCard key={product.id} {...product}/> ))}</ul>  */}
// replace sellerProducts with product -> seller -> selling details 