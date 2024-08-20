import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard'


function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const { vendorId } = useParams();
    
    
    useEffect(() => {
        fetch(`/user/${vendorId}`)
          .then((res) => {
            if (res.ok) {
              return res.json()
              .then((data) => {
                setVendor(data)
              })
            } else {
              //! Fix Error
              console.log('ok')
            }
          })
          .catch((error) => {
          //! Fix Error
            console.log(error)
          })
    }, [vendorId]);

        // fetch(`/products/user/${vendorId}`)
        // .then((res) => {
        //     if (res.ok ) {
        //         return res.json()
        //         .then(setSellerProducts)
        //     }
        //     //! Fix Error
        //     else {
        //         console.log('er')
        //     }
        // })
        // .catch((error) => {
        //     //! Fix Error
        //     console.log(error);
        // })
        // },[vendorId]);


  if (!vendor){ 
    return <h1>loading</h1>
  }
      
   
   
   return <div>
        
            <ul>{vendor.selling_products.map((product) => (<ProductCard key={product.id} {...product}/> ))}</ul>
        
    </div>;
  


}


  export default VendorDetails;