import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

function NavBar({ user, updateUser }){
// if session.get, display logout, else display login

const handleLogout = () =>{
    fetch('/logout',{
        method: 'DELETE'
    })
        .then(res => {
            if (res.status == 204){
                updateUser(null)
            }
        })
}

return(

<>

<nav>
<Link to={'/'}> Home </Link>
<Link to={'/products'}> Shop </Link>

{user ? <>
<Link to={'/myprofile'}> My Profile</Link>
<Link to={'/checkout'}> Checkout</Link>
<Link to={'/login'}> <button onClick={handleLogout}> Log Out </button></Link>
</>
:
<>
<Link to={`/login`}> Log in </Link>
<Link to={'/signup'}> Signup </Link>
</>}


</nav>
</>
)

}


export default NavBar

