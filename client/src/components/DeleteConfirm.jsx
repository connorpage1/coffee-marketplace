import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Modal, Icon, Header, Button, ModalActions, ModalContent } from "semantic-ui-react";



const DeleteConfirm = () => {
    const [ open, setOpen ] = useState(false)
    const navigate = useNavigate()
    const { updateUser } = useOutletContext()

    const handleDelete = () => {
        fetch('/profile', {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                updateUser(null)
                navigate('/')
            }
            else {
                console.log(res.json())
            }
        })
    }
    return (
        <Modal 
            basic
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
            size='small'
            trigger ={<Button>Delete account</Button>}
        >
                <Header icon>
                    <Icon name="user times"/>
                    Delete Account
                </Header>
                <ModalContent>
                    <p>Are you sure you'd like to delete your account?</p>
                </ModalContent>
                <ModalActions>
                    <Button basic color='grey' inverted onClick={()=> {
                        setOpen(false)
                    }}>
                        No, keep my account
                    </Button>
                    <Button basic color='red' onClick={()=> {
                        handleDelete()
                    }}>
                        Delete my account
                    </Button>
                </ModalActions>
            </Modal>
    )
}

export default DeleteConfirm