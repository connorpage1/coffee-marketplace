import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat';
import DeleteConfirm from "./DeleteConfirm";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import NewProductModal from "./NewProductModal";


function MyProfile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate()

    const newProfile = (profile) => {
        setProfile(profile)
    }

    useEffect(() => {
        fetch('/profile')
        .then(res => {
            if (res.ok) {
                res.json()
                .then(newProfile)
            } else {
                throw Error(res.status, res.statusText)
            }
        }).catch(err => {
            console.log(`error caught ${err}`)
            navigate('/login')
        })
    }    
    , [])

    if (profile) {
    const { first_name, last_name, email, role_id, created_at, selling_products, orders } = profile
        
        if(role_id === 1){
            return (
            <div>
                <h1>Hello, {first_name}. Thanks for being a loyal customer.</h1>
                <p>Customer since {dateFormat(created_at, "mmmm, dS, yyyy")}</p>
                <p><b>Name: </b>{`${first_name} ${last_name}`}</p>
                <p><b>Email: </b>{email}</p>
                <p>{String(orders)}</p>
                <UpdateProfile profile={profile} newProfile={newProfile}/> <UpdatePassword /> <DeleteConfirm />
    
            </div>
            );
        } else if (role_id === 2) {
            return (
                <div>
                    <h1>Hello, {first_name}. Welcome to your vendor profile.</h1>
                    <p>Vendor since {dateFormat(created_at, "mmmm, dS, yyyy")}</p>
                    <p><b>Name: </b>{`${first_name} ${last_name}`}</p>
                    <p><b>Email: </b>{email}</p>
                    <p>{String(selling_products)}</p>
                    <NewProductModal/>
                <UpdateProfile profile={profile} newProfile={newProfile}/>  <UpdatePassword /> <DeleteConfirm />
    
                </div>
        )

    }
    }
    else {
        return <h3>Loading...</h3>
    }
}


export default MyProfile;