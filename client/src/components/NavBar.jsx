import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

function NavBar(){
// if session.get, display logout, else display login
const [endpoint, setEndpoint] = useState(false)
const [navText, setNavText]  = useState()
useEffect(() =>{
    fetch('/get-session')
    .then((res) => {
        if (res.status_code == 200 ) {
            return res.json();
        }
        //! Fix Error
        else {
            console.log('er')
        }
    })
    .then((data) => {
        if (data){
            setEndpoint('logput')
            setNavText('Log Out')
        }
        else {
            setEndpoint('login')
            setNavText('Log In')
        }
    })
    .catch((error) => {
        //! Fix Error
        console.log(error);
    })
    },[]);

return(

<>

<nav>
<Link to={'/'}> Home </Link>
<Link to={'/products'}> Shop </Link>
<Link to={'/myprofile'}> My Profile</Link>
<Link to={`/${endpoint}`}> {navText} </Link>
<Link to={'/signup'}> Signup </Link>
</nav>
</>
)

}


export default NavBar

