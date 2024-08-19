import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

function NavBar(){
// if session.get, display logout, else display login
const [session, setSession] = useState(false)
// useEffect(() =>{
//     fetch('/get-session')
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         }
//         //! Fix Error
//         else {
//             console.log('er')
//         }
//     })
//     .then((data) => {
//         if (data){
//             setSession('LogOut')
//         }
//         else {
//             setSession('LogIn')
//         }
//     })
//     .catch((error) => {
//         //! Fix Error
//         console.log(error);
//     })
//     },[]);

return(

<>

<nav>
<Link to={'/'}> Home </Link>
<Link to={'/products'}> Shop </Link>
<Link to={'/myprofile'}> My Profile</Link>
<Link to={'/logout'}> Log Out </Link>
<Link to={'/signup'}> Signup </Link>
</nav>
</>
)

}


export default NavBar

