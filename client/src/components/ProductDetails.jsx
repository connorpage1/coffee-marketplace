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
    <EditModal product={ product} setProduct={setProduct} productId={productId} />
  </div>;


}
// else{
//   return <div>
//     <h1>Edit Product</h1>
//     <Formik
//     initialValues={{
//       name: `${name}`,
//       type: `${type}`,
//       stock: `${stock}`,
//       image_url: `${image_url}`,
//       price: `${price}`,
//       description: `${description}`
//       }}
//       validationSchema={schema}
//       onSubmit={handleFormSubmit}
//     >
//       <Form>
//         <label htmlFor="name">Name: </label>
//         <Field name="name" type='text' placeholder="New Product Name"/> 
        
//         <label htmlFor="type">Type: </label>
//         <Field as="select" name="type">
//         <option value='coffee'> Coffee </option>
//         <option value='tea'> Tea </option>
//         </Field> 
        
//         <label htmlFor="stock">Stock: </label>
//         <Field name="stock" type='text' placeholder="Current Stock"/> 
        
//         <label htmlFor="image_url">Image Link: </label>
//         <Field name="image_url" type='text' placeholder="New Image Link"/> 
        
//         <label htmlFor="price">Price: </label>
//         <Field name="price" type='float' placeholder="Adjusted Price"/> 
        
//         <label htmlFor="description">Description: </label>
//         <Field name="description" type='text' placeholder="New Description"/> 
        
//         <button type="submit">Confirm Changes</button>
//       </Form>
//     </Formik>




//   </div>

// }

}






export default ProductDetails;



//if user.id = seller.id