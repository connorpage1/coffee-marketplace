import React from 'react'
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast"
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
import { useNavigate } from 'react-router-dom';

const validTags = [
    "light roast",
    "medium roast",
    "dark roast",
    "espresso",
    "origin",
    "flavor",
    "washed processed",
    "natural process",
    "honey process",
    "arabica",
    "robusta",
    "blend",
    "organic",
    "single-origin",
    "black tea",
    "green tea",
    "white tea",
    "herbal",
    "rooibos", 
    "matcha",
    "caffeine",
    "decaf"
]


const imageUrlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)$/;

const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    type: yup.string().required(),
    stock: yup.number().min(0),
    image_url: yup.string().matches(imageUrlRegex).required("Image is required"),
    tag: yup.string().oneOf(validTags,"Must be a valid tag"),
    description: yup.string().required("Description is required").min(50).max(1000),
    price: yup.number().required("Price is Required").min(1)
  
  })


function NewProductModal() {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const handleFormSubmit = (FormData) => {
        console.log(JSON.stringify(FormData))
        FormData.price = parseFloat(FormData.price);
        FormData.stock = parseInt(FormData.stock);
        debugger
        fetch(`/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        })
          .then((resp) => {
            if (resp.ok) {
              return resp.json().then((data) => {
                setOpen(false)
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

    return(
    <Modal
        basic
        onClose={()=>setOpen(false)}
        onOpen={() =>setOpen(true)}
        open={open}
        size='large'
        trigger={<Button>Add New Product</Button>}>
            <ModalContent>
                <Formik
                    initialValues={{
                    name: ``,
                    type: ``,
                    stock: ``,
                    image_url: ``,
                    price: ``,
                    tag: '',
                    description: ``
                    }}
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor="name">Name: </label>
                                <Field name="name" type='text' placeholder="New Product Name"/> 
                                
                                <label htmlFor="type">Type: </label>
                                <Field as="select" name="type">
                                <option value='coffee'> Coffee </option>
                                <option value='tea'> Tea </option>
                                </Field>
                                
                                <label htmlFor='tag'> Tag: </label>
                                <Field as="select" name="tag">
                                {validTags.map((validTag) => ( <option value={validTag}> {validTag} </option> ))}
                                </Field>

                                
                                <label htmlFor="stock">Stock: </label>
                                <Field name="stock" type='number' placeholder="Current Stock"/> 
                                
                                <label htmlFor="image_url">Image Link: </label>
                                <Field name="image_url" type='text' placeholder="New Image Link"/> 
                                
                                <label htmlFor="price">Price: </label>
                                <Field name="price" type='number' placeholder="Price"/> 
                                
                                <label htmlFor="description">Description: </label>
                                <Field name="description" type='text' placeholder="Description"/> 
                                
                                <button type="submit">Add New Product</button>
                            </Form>
                        )}
                </Formik>
            </ModalContent>

    
    </Modal>




        )
}

export default NewProductModal 