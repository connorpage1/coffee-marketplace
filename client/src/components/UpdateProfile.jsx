import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
    first_name: yup.string().required("Name is required").min(1, "Must be at least one character").max(50, "Cannot be longer than 50 characters"),
    last_name: yup.string().required("Name is required").min(1, "Must be at least one character").max(50, "Cannot be longer than 50 characters"),
    email: yup.string().email("Please enter a valid email").required("Email is required")
})

const UpdateProfile = ({ profile, newProfile }) => {
    const [open, setOpen] = useState(false)

    const initialValues = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email
    }

    const handleFormSubmit = (formData, { resetForm }) => {
        fetch('/profile', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(userObj => {
                    console.log(userObj)
                    newProfile(userObj)
                    setOpen(false)
                })
            } else {
                res.json().then(error => console.log(error.error));
                }}
            )
        .catch(console.log)
    }

    return(
        <>
            <Button onClick={() => {
                setOpen(true)
                }}>Update information</Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header>Update profile</Modal.Header>
                <Modal.Content>
                    <Formik initialValues={initialValues} 
                            onSubmit={handleFormSubmit}
                            validationSchema={schema}
                            >
                        {({ handleSubmit, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor='first_name'>First Name</label>
                                    <Field name='first_name' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="first_name"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Form.Field>
                                    <label htmlFor='last_name'>Last Name</label>
                                    <Field name='last_name' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="last_name"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Form.Field>
                                    <label htmlFor='email'>Email</label>
                                    <Field name='email' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="email"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Button type='submit' color='green' disabled={!touched.first_name && !touched.last_name && !touched.email}>
                                    Update information
                                </Button>
                            </Form>
                        )
                        }
                    </Formik>
                </Modal.Content>
            </Modal>
        </>
    );

};

export default UpdateProfile