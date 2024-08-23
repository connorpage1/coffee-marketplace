import React from "react";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { Button, Modal, Container, Form as SemanticForm, Message, Grid, Input, Image } from 'semantic-ui-react';
import { useNavigate, useOutletContext } from "react-router-dom";

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

const initialValues = {
  name: ``,
  type: `coffee`,
  stock: ``,
  image_url: ``,
  price: ``,
  tag: "light roast",
  description: ``,
  sku: "",
};
const imageUrlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg)$/;

const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  type: yup.string().required(),
  stock: yup.number().min(0),
  image_url: yup.string().matches(imageUrlRegex).required("Image is required"),
  tag: yup.string().oneOf(validTags, "Must be a valid tag"),
  description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters long").max(1000, "Description cannot be longer than 1000 characters"),
  price: yup.number().required("Price is Required").min(1)
})

const generateCode = () => nanoid(8);

function NewProductModal({}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const handleFormSubmit = (FormData, { setSubmitting }) => {
    console.log(generateCode());
    FormData.price = parseFloat(FormData.price);
    FormData.stock = parseInt(FormData.stock);
    FormData.sku = generateCode()
    FormData.user_id = user.id
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
            navigate(`/products`);
          });
        } else {
          return resp.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((errorObj) => {
        toast.error(errorObj.error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} primary>
        Add New Product
      </Button>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer='blurring'
        size='large'
      >
        <Modal.Header>Add a New Product</Modal.Header>
        
        <Modal.Content>
        <Image src='https://raw.githubusercontent.com/connorpage1/coffee-marketplace/main/client/public/logo512.png' size='small' centered style={{ marginBottom: '20px' }} />
          <Container text>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={async (values, actions) => {
                await handleFormSubmit(values, actions);
                setOpen(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Grid columns={1} stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="name">Name</label>
                          <Field
                            as={Input}
                            name="name"
                            type='text'
                            placeholder="New Product Name"
                            fluid
                          />
                          <ErrorMessage name="name" component={Message} negative />
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="type">Type: </label>
                          <Field as="select" name="type" fluid>
                            <option value='coffee'>Coffee</option>
                            <option value='tea'>Tea</option>
                          </Field>
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor='tag'>Tag: </label>
                          <Field as="select" name="tag" fluid>
                            {validTags.map((validTag) => (
                              <option key={validTag} value={validTag}>{validTag}</option>
                            ))}
                          </Field>
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="stock">Stock</label>
                          <Field
                            as={Input}
                            name="stock"
                            type='number'
                            placeholder="Current Stock"
                            fluid
                          />
                          <ErrorMessage name="stock" component={Message} negative />
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="image_url">Image Link</label>
                          <Field
                            as={Input}
                            name="image_url"
                            type='text'
                            placeholder="New Image Link"
                            fluid
                          />
                          <ErrorMessage name="image_url" component={Message} negative />
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="price">Price</label>
                          <Field
                            as={Input}
                            name="price"
                            type='number'
                            placeholder="Price"
                            step='.01'
                            fluid
                          />
                          <ErrorMessage name="price" component={Message} negative />
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <SemanticForm.Field>
                          <label htmlFor="description">Description</label>
                          <Field
                            as={Input}
                            name="description"
                            type='text'
                            placeholder="Description"
                            fluid
                          />
                          <ErrorMessage name="description" component={Message} negative />
                        </SemanticForm.Field>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting}>
                          Add New Product
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              )}
            </Formik>
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

export default NewProductModal;
