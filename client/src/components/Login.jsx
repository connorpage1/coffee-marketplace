import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from 'react';
import { useNavigate, useOutletContext, Link} from 'react-router-dom';
import { Button, Form as SemanticForm, Segment, Header, Message, Container, Image } from 'semantic-ui-react';
import toast from 'react-hot-toast';

import Checkout from './Checkout';

const schema = yup.object().shape({
    email: yup.string().required("Email is required"),      // Not using .email() to verify because this is login not sign up
    password_hash: yup.string().required("Password is required")
})



const Login = () => {
    const { updateUser } = useOutletContext(); 
    const navigate = useNavigate();

    const handleFormSubmit = (formData, { setSubmitting, setErrors }) => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(userObj => {
                    updateUser(userObj);
                    return userObj;
                })
                .then(userObj => {
                    if (userObj.order) {
                        return <Checkout key={userObj.order.id} {...userObj.order} />;
                    } else {
                        const newOrder = { status: "pending", user_id: userObj.id };
                        return fetch("/orders", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newOrder)
                        })
                        .then(orderRes => orderRes.json())
                        .then(orderObj => {
                            navigate('/products');
                            return <Checkout key={orderObj.id} {...orderObj} />;
                        });
                    }
                });
            } else {
                res.json().then(error => {
                    if (error.error === "Incorrect email or password"){
                        setErrors({
                            password_hash: "Incorrect email or password"
                        })
                    } else {
                        toast.error(error.error || "An unexpected error occured")
                    }
                });
            }
        })
        .catch(console.log)
        .finally(() => setSubmitting(false));

    };

    return (
        <Container text>
            <Segment raised>
                {/* Logo Section */}
                <Image src='https://raw.githubusercontent.com/connorpage1/coffee-marketplace/main/client/public/logo512.png' size='small' centered style={{ marginBottom: '20px' }} />

                <Header as='h2' textAlign='center'>
                    Login to Your Account
                </Header>

                <Formik
                    initialValues={{ email: "", password_hash: "" }}
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <SemanticForm.Field>
                                <label htmlFor="email">Email</label>
                                <Field name='email' type='text' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="email" component={Message} negative />
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="password_hash">Password</label>
                                <Field name='password_hash' type='password' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="password_hash" component={Message} negative />
                            </SemanticForm.Field>

                            <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting}>
                                Login
                            </Button>
                            <Message>
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </Message>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Container>
    );
};

export default Login;
