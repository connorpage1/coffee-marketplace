import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from "formik";
import { Modal, Button, Form } from 'semantic-ui-react';
import { useState } from 'react';



const schema = yup.object().shape({
    current_password: yup.string().required("Please enter your current password"), 
    password_hash: yup.string().required("Please enter a new password").min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password_hash'), null], "Passwords must match")
})

const initialValues = {
    current_password: "",
    password_hash: "",
    confirmPassword: ""
}

const UpdatePassword = () => {

    const [open, setOpen] = useState();
    
    const handleFormSubmit = (formData, { resetForm }) => {
        fetch('/profile?pwupdate', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                current_password: formData.current_password,
                password_hash: formData.password_hash,
                confirmPassword: formData.confirmPassword,
            })
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(userObj => {
                    console.log(userObj)
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
                }}>Change password</Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header>Change password</Modal.Header>
                <Modal.Content>
                    <Formik initialValues={initialValues} 
                            onSubmit={handleFormSubmit}
                            validationSchema={schema}
                            >
                        {({ handleSubmit, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor='current_password'>Current Password</label>
                                    <Field name='current_password' type='password' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="current_password"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Form.Field>
                                    <label htmlFor='password_hash'>New Password</label>
                                    <Field name='password_hash' type='password' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="password_hash"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Form.Field>
                                    <label htmlFor='confirmPassword'>Confirm New Password</label>
                                    <Field name='confirmPassword' type='password' as={Form.Input} />
                                </Form.Field>
                                <ErrorMessage 
                                    name="confirmPassword"
                                    component="div"
                                    className = "field-error"
                                    />
                                <Button type='submit' color='green' disabled={!touched.current_password && !touched.password_hash && !touched.confirmPassword}>
                                    Change password
                                </Button>
                            </Form>
                        )
                        }
                    </Formik>
                </Modal.Content>
            </Modal>
        </>
    )
}
export default UpdatePassword