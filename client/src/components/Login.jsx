import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';


const schema = yup.object().shape({
    email: yup.string().required("Email is required"),      // Not using .email() to verify because this is login not sign up
    password_hash: yup.string().required("Password is required")
})



const Login = () => {
    // This will need to be moved up a couple of levels 
    const {updateUser} =  useOutletContext() 
    const navigate = useNavigate()
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
                .then(userObj => updateUser(userObj))
                .then(() => navigate('/products'))  
            }
            else {
                (res.json())
                .then(error => console.log(error.error))
            }
        })
        .catch(console.log)
    }
    return (
        <>
            <div className = 'login-container'>
                <Formik
                    initialValues={{email: "", password_hash: ""}}
                    validationSchema = {schema}
                    onSubmit={handleFormSubmit}
                >
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field name='email' type='text'/>
                        <ErrorMessage 
                            name="email"
                            component="div"
                            className = "field-error"
                        />

                        <label htmlFor="password_hash">Password</label>
                        <Field name='password_hash' type='password'/>
                        <ErrorMessage 
                            name="password_hash"
                            component="div"
                            className = "field-error"
                        />
                        <button type='submit'>Login</button>
                    </Form>
                </Formik>
            </div>
        </>
        
    )
}

export default Login