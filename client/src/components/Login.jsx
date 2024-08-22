import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Checkout from './Checkout';


const schema = yup.object().shape({
    email: yup.string().required("Email is required"),      // Not using .email() to verify because this is login not sign up
    password_hash: yup.string().required("Password is required")
})



const Login = () => {
    const { updateUser } = useOutletContext(); 
    const navigate = useNavigate();

    const handleFormSubmit = (formData, { resetForm }) => {
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
                res.json().then(error => console.log(error.error));
            }
        })
        .catch(console.log);
    };

    return (
        <div className='login-container'>
            <Formik
                initialValues={{ email: "", password_hash: "" }}
                validationSchema={schema}
                onSubmit={handleFormSubmit}
            >
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field name='email' type='text' />
                    <ErrorMessage 
                        name="email"
                        component="div"
                        className="field-error"
                    />

                    <label htmlFor="password_hash">Password</label>
                    <Field name='password_hash' type='password' />
                    <ErrorMessage 
                        name="password_hash"
                        component="div"
                        className="field-error"
                    />
                    <button type='submit'>Login</button>
                    <div className='login-error-container'></div>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
