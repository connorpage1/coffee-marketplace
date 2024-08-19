import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage} from "formik";
import { useState } from 'react';


const schema = yup.object().shape({
    email: yup.string().required("Email is required"),      // Not using .email() to verify because this is login not sign up
    password_hash: yup.string().required("Password is required")
})



const Login = () => {
    // This will need to be moved up a couple of levels 
    const [user, setUser] = useState(null)

    const handleFormSubmit = (formData, { resetForm }) => {
        fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(userObj => setUser(userObj))
                .then(console.log(user))
            }
            else {
                console.log(res)
            }
            })
        .catch(console.log)
    }
    return (
        <>
            <h1>Test</h1>
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