import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const [sellerProducts, setSellerProducts] = useState();
    const { vendorId } = useParams();
    
    
    useEffect(() => {
        fetch(`/user/${vendorId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            } else {
              //! Fix Error
              throw new Error('Error fetching data');
            }
          })
            .then((data) => {
              setVendor(data);
              debugger
            })
          .catch((error) => {
          //! Fix Error
            console.log(error);
          });
      }, [vendorId]);

useEffect(() =>{
  fetch(`/products/user/${vendorId}`)
  .then((res) => {
      if (res.status == 200 ) {
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
        <h1></h1>
    </div>;
  


}


  export default VendorDetails;