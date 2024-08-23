import React from "react";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Button,
  Form as SemanticForm,
  Segment,
  Header,
  Message,
  Container,
  Image,
  Modal,
} from "semantic-ui-react";
import toast from "react-hot-toast";

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
  "decaf",
];

const schema = yup.object().shape({
  image_url: yup.string().required("Image is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(50)
    .max(1000),
  price: yup.number().required("Price is Required").min(1),
});

function EditModal({ product, setProduct, productId }) {
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    name: `${product.name}`,
    type: `${product.type}`,
    stock: `${product.stock}`,
    image_url: `${product.image_url}`,
    price: `${product.price}`,
    tag: `${product.tag}`,
    description: `${product.description}`,
    sku: `${product.sku}`,
  };

  const handleFormSubmit = (FormData) => {
    console.log(JSON.stringify(FormData));
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
            setProduct(data);
            setOpen(false);
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

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Edit Product</Button>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer="blurring"
      >
        <Modal.Header>Add a New Product</Modal.Header>
        <Modal.Content>
          <Container text>
            <Segment raised>
              <Image
                src="https://raw.githubusercontent.com/connorpage1/coffee-marketplace/main/client/public/logo512.png"
                size="small"
                centered
                style={{ marginBottom: "20px" }}
              />

              <Header as="h2" textAlign="center">
                Edit Product
              </Header>

              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={async (values, actions) => {
                  await handleFormSubmit(values, actions);
                  setOpen(false); // Close modal after form submission
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <SemanticForm.Field>
                      <label htmlFor="name">Name: </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="New Product Name"
                      />
                      <ErrorMessage name="name" component={Message} negative />
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="type">Type: </label>
                      <Field as="select" name="type">
                        <option value="coffee"> Coffee </option>
                        <option value="tea"> Tea </option>
                      </Field>
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="tag"> Tag: </label>
                      <Field as="select" name="tag">
                        {validTags.map((validTag) => (
                          <option value={validTag}> {validTag} </option>
                        ))}
                      </Field>
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="stock">Stock: </label>
                      <Field
                        name="stock"
                        type="number"
                        placeholder="Current Stock"
                      />
                      <ErrorMessage name="stock" component={Message} negative />
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="image_url">Image Link: </label>
                      <Field
                        name="image_url"
                        type="text"
                        placeholder="New Image Link"
                      />
                      <ErrorMessage
                        name="image_url"
                        component={Message}
                        negative
                      />
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="price">Price: </label>
                      <Field name="price" type="number" placeholder="Price" />
                      <ErrorMessage name="price" component={Message} negative />
                    </SemanticForm.Field>

                    <SemanticForm.Field>
                      <label htmlFor="description">Description: </label>
                      <Field
                        name="description"
                        type="text"
                        placeholder="Description"
                      />
                      <ErrorMessage
                        name="description"
                        component={Message}
                        negative
                      />
                    </SemanticForm.Field>

                    <Button
                      type="submit"
                      fluid
                      primary
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Edit Product
                    </Button>
                  </Form>
                )}
              </Formik>
            </Segment>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default EditModal;
