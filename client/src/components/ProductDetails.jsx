import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import { Container } from 'semantic-ui-react';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom"
import EditModal from "./EditModal";

function ProductDetails() {
  const [product, setProduct] = useState(null);
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






  const { name, description, seller, image_url, id, user_id, price, stock, type, tag, sku } = product




  return <div>
    <h1>{name} </h1>
    <h3>Seller: {seller.first_name + ' ' + seller.last_name} </h3>
    <Container>
      <img src={image_url} alt={name} />
      <h3>{tag} : {type}</h3>
      <h3>${price}/12oz bag</h3>
      <h3>Stock Remaining: {stock}</h3>
      <h3>SKU: {sku}</h3>
      <br></br>
    </Container>
    <Container textAlign="center">
      {description}
    </Container>
    {user && user.id === user_id && <button onClick={() => handleDelete(id)}> Delete </button>}
    {user && user.id === user_id && <EditModal product={ product} setProduct={setProduct} productId={productId} />}
  </div>;
}

export default ProductDetails;



