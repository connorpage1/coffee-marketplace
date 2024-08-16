import { useEffect, useState } from "react";
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage, FieldArray} from "formik";


const schema = yup.object().shape({
    email: yup.string().required("Email is required"),      // Not using .email() to verify because this is login not sign up
    password_hash: yup.string().required("Password is required")
})

const handleFormSubmit = (formData, { resetForm }) => {
    fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => console.log(res.json()))
    .then(resetForm)
    .catch(console.log)
}

const Login = () => {
    const [formData, setFormData] = useState(null)

    return(
        <div className = 'login-container'>
            <Formik
                initialValues={{email: "", password_hash: ""}}
                validationSchema = {schema}
                onSubmit={handleFormSubmit}
            >
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field name='email' type='text'/>
                </Form>
            </Formik>
        </div>

    )
}