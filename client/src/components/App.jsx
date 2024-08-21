import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import NavBar from "./NavBar";

function App() {
const [user, setUser] = useState(null);
const [cart, setCart] = useState([]);

const addToCart = (order_item) => {
    setCart(currentCart => [...currentCart, order_item])
}

const resetCart = () => setCart([])

useEffect(() =>{
    fetch('/check-session')
    .then((res) => {
        if (res.status == 200 ) {
            return res.json().then(setUser)
        }
        //! Fix Error
        else {
            console.log('er')
        }
    })
    .catch((error) => {
        //! Fix Error
        console.log();
    })
    },[]);




    const updateUser = (value) =>{
        setUser(value)
    }
    

return( 
<div className="app">
    <header><NavBar user={user} updateUser={updateUser} /></header>
    <Outlet context = { {user, updateUser, addToCart, cart, resetCart} }/>
</div>
)}

export default App;
