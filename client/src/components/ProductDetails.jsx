import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const [product, setProduct] = useState()
    const { productId}  = useParams();
    
    console.log(productId)
    useEffect(() => {
      fetch(`/orders/${productId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error('Error fetching data');
          }
        })
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [productId]);

return <div>
    <h1>{product ? product.id : 'No product found'}</h1>

</div>;
  }


export default ProductDetails;