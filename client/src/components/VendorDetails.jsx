import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from './ProductCard'
import toast from "react-hot-toast";
import { Grid } from "semantic-ui-react";


function VendorDetails() {
    const [vendor, setVendor] = useState(null);
    const { vendorId } = useParams();
    
    
    useEffect(() => {
        fetch(`/user/${vendorId}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json()
              .then((data) => {
                setVendor(data)
              })
            } else {
              resp.json().then((errorObj) => toast.error(errorObj.error))
            }
          })
          .catch (errorObj => toast.error(errorObj.message))
    }, [vendorId]);




  if (!vendor){ 
    return <h1>loading</h1>
  }
      
   
   
   return  <Grid>
              <Grid.Row columns={4}>
            {vendor.selling_products.map((product) => (<ProductCard key={product.id} {...product}/> ))}
            </Grid.Row>
        
            </Grid>
  


}


  export default VendorDetails;