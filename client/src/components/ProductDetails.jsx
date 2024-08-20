import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import toast, { Toaster } from "react-router-dom";
import { Container } from 'semantic-ui-react';


function ProductDetails() {
    // const [product, setProduct] = useState();
    // const [vendor, setVendor] = useState();
    // const { productId }  = useParams();
    

    // useEffect(() => {
    //   fetch(`/products/${productId}`)
    //     .then((resp) => {
    //       if (resp.ok) {
    //         return resp.json();
    //       } else {
    //         //! Fix Error
    //         (console.log())}
    //     })
    //     .then((data) => {
    //       setProduct(data);
    //       setVendor(data.seller);
    //       console.log(vendor)
    //     })
    //     .catch(console.log())
    // }, [productId]);



return <div>
    {/* <h1>{product ? product.name : 'Loading'} </h1>
    <h1>{vendor ? vendor.first_name + ' ' + vendor.last_name : 'Loading'} </h1>
    <Container textAlign="center">
      {product ? product.description : ''}
      {vendor ? vendor.selling_products : ''} */}

    {/* </Container> */}
</div>;
  }


export default ProductDetails;