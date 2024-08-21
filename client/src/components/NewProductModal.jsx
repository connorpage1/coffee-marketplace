import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from 'semantic-ui-react'

const schema = yup.object().shape({
    image_url: yup.string().required("Image is required"),
    description: yup.string().required("Description is required").min(50).max(1000),
    price: yup.number().required("Price is Required").min(1)
  
  })


function EditModal() {

    const handleFormSubmit = (FormData) => {
        console.log(JSON.stringify(FormData))
        FormData.price = parseFloat(FormData.price);
        FormData.stock = parseInt(FormData.stock);
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
                debugger
                navigate('/products')
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

    return{

        <h1>Edit Product</h1>
        <Formik
        initialValues={{
          name: `${name}`,
          type: `${type}`,
          stock: `${stock}`,
          image_url: `${image_url}`,
          price: `${price}`,
          description: `${description}`
          }}
          validationSchema={schema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <label htmlFor="name">Name: </label>
            <Field name="name" type='text' placeholder="New Product Name"/> 
            
            <label htmlFor="type">Type: </label>
            <Field as="select" name="type">
            <option value='coffee'> Coffee </option>
            <option value='tea'> Tea </option>
            </Field> 
            
            <label htmlFor="stock">Stock: </label>
            <Field name="stock" type='text' placeholder="Current Stock"/> 
            
            <label htmlFor="image_url">Image Link: </label>
            <Field name="image_url" type='text' placeholder="New Image Link"/> 
            
            <label htmlFor="price">Price: </label>
            <Field name="price" type='float' placeholder="Adjusted Price"/> 
            
            <label htmlFor="description">Description: </label>
            <Field name="description" type='text' placeholder="New Description"/> 
            
            <button type="submit">Confirm Changes</button>
          </Form>
        </Formik>

    }
}

export default EditModal