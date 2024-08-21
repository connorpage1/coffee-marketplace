import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'semantic-ui-react';

const schema = yup.object().shape({
    first_name: yup.string().required("Name is required").min(1, "Must be at least one character").max(50, "Cannot be longer than 50 characters"),
    last_name: yup.string().required("Name is required").min(1, "Must be at least one character").max(50, "Cannot be longer than 50 characters"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),  
})

const UpdateProfile = (profile, newProfile) => {

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
                return res.json().then(err => {
                    throw new Error(err.error)
                })
            }
        })
        .catch(console.log)
    }



}