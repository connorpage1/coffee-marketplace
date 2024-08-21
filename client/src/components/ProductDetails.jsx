import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import { Container } from 'semantic-ui-react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom"
import EditModal from "./EditModal";

// const schema = yup.object().shape({
//   image_url: yup.string().required("Image is required"),
//   description: yup.string().required("Description is required").min(50).max(1000),
//   price: yup.number().required("Price is Required").min(1)

// })


function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false)
  const { productId } = useParams();
  const { user } = useOutletContext();

  const navigate = useNavigate()



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

      const handleEditMode = () =>{
        setEditMode(true)
      }
  




  const { name, description, seller, image_url, id, user_id, price, stock, type } = product



if (!editMode){
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
    {user && user.id === user_id && <EditModal product={ product} setProduct={setProduct} productId={productId} />}
  </div>;


}


}






export default ProductDetails;



