import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-router-dom";


function ProductDetails() {
    const [product, setProduct] = useState();
    const [vendor, setVendor] = useState();
    const { productId }  = useParams();
    
    let vendorName
    
    console.log(productId)
    useEffect(() => {
      fetch(`/orders/${productId}`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            //! Fix Error
            (errorObj => toast.error(errorObj.message))}
        })
        .then((data) => {
          setProduct(data);
          setVendor(data.user);
        })
        .catch(errorObj => toast.error(errorObj.message))
    }, [productId]);

    if (vendor) {
      vendorName = `${vendor.first_name} ${vendor.last_name}`;
    } else {
      vendorName = 'No vendor found';
    }


return <div>
    <h1>{product ? product.id : 'No product found'}</h1>
    <h1>{vendorName}</h1>
</div>;
  }


export default ProductDetails;