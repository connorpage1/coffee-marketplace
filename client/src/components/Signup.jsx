import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from 'react';

const schema = yup.object().shape({
    first_name: yup.string().required("Name is required").min(1).max(50),
    last_name: yup.string().required("Name is required").min(1).max(50),
    role: yup.string().required("Role is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),  
    password_hash: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password_hash'), null], "Passwords must match")
})

const initialValues = {
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    password_hash: "",
    confirmPassword: ""

}

const Signup = () => {

    const handleFormSubmit = (formData, { resetForm }) => {
        fetch('api/v1//signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                role_id: formData.role,
                email: formData.email,
                password_hash: formData.password_hash
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(userObj => console.log(userObj.id))
                // .then(resetForm)
            } else {
                console.log(res)
            }
        })
        .catch(console.log)
    }

    return (
    <div className='signup-form'>
            <Formik
                initialValues={initialValues}
                validationSchema = {schema}
                onSubmit={handleFormSubmit}
                >
                <Form>
                    <label htmlFor="first_name">First Name</label>
                    <Field name='first_name' type='text'/>
                    <ErrorMessage 
                        name="first_name"
                        component="div"
                        className = "field-error"
                        />
                    <br/>
                    <label htmlFor="last_name">Last Name</label>
                    <Field name='last_name' type='text'/>
                    <ErrorMessage 
                        name="last_name"
                        component="div"
                        className = "field-error"
                        />
                    <br/>
                    <label htmlFor="role">Role</label>
                    <Field as="select" name='role'>
                        <option value='1'>Customer</option>
                        <option value='2'>Seller</option>
                    </Field>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <Field name='email' type='email'/>
                    <ErrorMessage 
                        name="email"
                        component="div"
                        className = "field-error"
                        />
                    <br/>
                    <label htmlFor="password_hash">Password</label>
                    <Field name='password_hash' type='password'/>
                    <ErrorMessage 
                        name="password_hash"
                        component="div"
                        className = "field-error"
                        />
                    <br/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name='confirmPassword' type='password'/>
                    <ErrorMessage 
                        name="confirmPassword"
                        component="div"
                        className = "field-error"
                        />
                    <br/>
                    <button type='submit'>Sign Up</button>
                </Form>
            </Formik>    
    </div>);
    }



export default Signup;