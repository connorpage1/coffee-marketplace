import { Link, NavLink } from "react-router-dom"

function NavBar(){
return(
<div className="nav-bar">
    <nav>
        <Link to={'/'}> Home </Link>
        <Link to={'/products'}> Shop </Link>
        <Link to={'/myprofile'}> My Profile</Link>
    </nav>
</div>
)

}


export default NavBar