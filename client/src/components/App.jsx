import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "semantic-ui-css/semantic.min.css";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (order_item) => {
    setCart((currentCart) => [...currentCart, order_item]);
  };

  const resetCart = () => setCart([]);

  useEffect(() => {
    fetch("/check-session")
      .then((res) => {
        if (res.status === 200) {
          return res.json().then(setUser);
        } else {
          return res.json().then((errorObj) => {
            toast.error(errorObj.error);
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);


    const updateUser = (value) => {
      setUser(value);
    };

    return (
      <div className="app">
        <Toaster />
        <header>
          <NavBar user={user} updateUser={updateUser} />
        </header>
        <div className="content">
          <Outlet context={{ user, updateUser, addToCart, cart, resetCart }} />
        </div>
      </div>
    );
  }

export default App;
