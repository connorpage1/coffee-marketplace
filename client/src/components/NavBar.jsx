import { Link, NavLink } from "react-router-dom"

function NavBar(){
return(
<>

<nav>
<Link to={'/'}> Home </Link>
<Link to={'/products'}> Shop </Link>
<Link to={'/myprofile'}> My Profile</Link>
</nav>
</>
)

}


export default NavBar