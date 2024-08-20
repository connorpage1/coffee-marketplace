import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import { Container } from 'semantic-ui-react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom"

const schema = yup.object().shape({
  image_url: yup.string().required("Image is required"),
  description: yup.string().required("Description is required").min(50).max(1000),
  price: yup.number().required("Price is Required").min(1)

})


function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false)
  const { productId } = useParams();
  const { user } = useOutletContext();

  const navigate = useNavigate()

  const handleFormSubmit = (FormData) => {
    fetch(`/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json().then((data) => {
            setProduct(data);
          });
        } else {
          return resp.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((errorObj) => {
        toast.error(errorObj.error);
      });
  };


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
              resp.json().then((errorObj) => toast.error(errorObj.error))
            })
        }
      })
      .catch((errorObj) => toast.error(errorObj.error))
  }, [productId]);


  if (!product) {
    return <h3>Loading</h3>
  }


  const handleDelete = (productId) => {
    fetch(`/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          navigate('/products')  
          return res.json();
         
        } else {
          return res.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((errorObj) => toast.error(errorObj.error))
      };
  




  const { name, description, seller, image_url, id, user_id, price, stock } = product





  return <div>
    <h1>{name} </h1>
    <h3>{seller.first_name + ' ' + seller.last_name} </h3>
    <Container>
      <img src={image_url} alt={name} />
      <h3>${price}</h3>
      <h3>{stock}</h3>
    </Container>
    <Container textAlign="center">
      {editMode ? description : ''}
    </Container>
    {user && user.id === user_id && <button onClick={() => handleDelete(id)}> Delete </button>}
    {/* {user && user.id === user_id && <button onClick={() => handleUpdate(id)}> Edit </button>}
    {user && user.role_id === 1 && product.stock > 0 && <button onClick={() => handleAddToCart(id)}> Add to Cart </button>} */}
  </div>;







}






export default ProductDetails;


{/* <ul>{sellerProducts.map((product) => (<ProductCard key={product.id} {...product}/> ))}</ul>  */ }
// replace sellerProducts with product -> seller -> selling details 

//if user.id = seller.id