import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function NavBar({ user, updateUser }) {
  // if session.get, display logout, else display login

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 204) {
        updateUser(null);
      }
    });
  };

  return (
    <>
      <div className="ui top fixed menu">
        <Menu fixed="top" inverted>
          <Menu.Item as={Link} to="/" header>
            {" "}
            Home{" "}
          </Menu.Item>
          <Menu.Item as={Link} to="/products" header>
            {" "}
            Shop{" "}
          </Menu.Item>

          {user ? (
            <>
              <Menu.Item as={Link} to="/myprofile" header>
                {" "}
                My Profile{" "}
              </Menu.Item>
              <Menu.Item as={Link} to="/checkout" header>
                {" "}
                Check Out{" "}
              </Menu.Item>
              <Menu.Item as={Link} to="/login" onClick={handleLogout}>
                {" "}
                Log Out{" "}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item as={Link} to="/login" header>
                {" "}
                Log In
              </Menu.Item>
              <Menu.Item as={Link} to="/signup" header>
                {" "}
                Sign Up{" "}
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}

export default NavBar;
