import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard'


function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const [sellerProducts, setSellerProducts] = useState();
    const { vendorId } = useParams();
    
    
    useEffect(() => {
        fetch(`/user/${vendorId}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              //! Fix Error
              console.log('ok')
            }
          })
            .then((data) => {
              setVendor(data);
            })
          .catch((error) => {
          //! Fix Error
            console.log(error);
          });

        fetch(`/products/user/${vendorId}`)
        .then((res) => {
            if (res.ok ) {
                return res.json()
                .then(setSellerProducts)
            }
            //! Fix Error
            else {
                console.log('er')
            }
        })
        .catch((error) => {
            //! Fix Error
            console.log(error);
        })
        },[vendorId]);



      console.log(sellerProducts)
   
   
   return <div>
        
            <ul>{sellerProducts.map((product) => (<ProductCard key={product.id} {...product}/> ))}</ul>
        
    </div>;
  


}


  export default VendorDetails;