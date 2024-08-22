import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Form as SemanticForm, Segment, Header, Message, Container, Image } from 'semantic-ui-react';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
    first_name: yup.string().required("First Name is required").min(1).max(50),
    last_name: yup.string().required("Last Name is required").min(1).max(50),
    role: yup.string(),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password_hash: yup.string().required("Password is required").min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password_hash'), null], "Passwords must match")
});

const initialValues = {
    first_name: "",
    last_name: "",
    role: "1",
    email: "",
    password_hash: "",
    confirmPassword: ""
};

const Signup = () => {
    const { updateUser } = useOutletContext();
    const navigate = useNavigate();

    const handleFormSubmit = (formData, { setSubmitting, setErrors }) => {
        fetch('/signup', {
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
        .then(res => res.json().then(data => {
            if (res.ok) {
                updateUser(data);
                navigate('/products');
            } else {
                if (data.error === "Email already exists") {
                    setErrors({ email: "Email already exists" });
                } else {
                    toast.error(data.error || "An unexpected error occurred");
                }
            }
        }))
        .catch(() => toast.error("Network error. Please try again later."))
        .finally(() => setSubmitting(false));
    };


    return (
        <Container text>
            <Segment raised>
                {/* Logo Section */}
                <Image src='https://raw.githubusercontent.com/connorpage1/coffee-marketplace/main/client/public/logo512.png' size='small' centered style={{ marginBottom: '20px' }} />
                
                <Header as='h2' textAlign='center'>
                    Create an Account
                </Header>

                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <SemanticForm.Field>
                                <label htmlFor="first_name">First Name</label>
                                <Field name='first_name' type='text' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="first_name" component={Message} negative />
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="last_name">Last Name</label>
                                <Field name='last_name' type='text' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="last_name" component={Message} negative />
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="role">Role</label>
                                <Field as="select" name='role' className="ui dropdown" fluid>
                                    <option value='1'>Customer</option>
                                    <option value='2'>Seller</option>
                                </Field>
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="email">Email</label>
                                <Field name='email' type='email' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="email" component={Message} negative />
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="password_hash">Password</label>
                                <Field name='password_hash' type='password' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="password_hash" component={Message} negative />
                            </SemanticForm.Field>

                            <SemanticForm.Field>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name='confirmPassword' type='password' as={SemanticForm.Input} fluid />
                                <ErrorMessage name="confirmPassword" component={Message} negative />
                            </SemanticForm.Field>

                            <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting}>
                                Sign Up
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Container>
    );
};

export default Signup;
