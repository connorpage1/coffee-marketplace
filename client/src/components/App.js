import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from "./NavBar";
import toast, { Toaster } from "react-hot-toast"

const App = () => {
  // const [isDarkMode, setIsDarkMode] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);
  // const [product_edit, setProductEdit] = useState(false);
  // const navigate = useNavigate()

  // const toggleDarkMode = () => setIsDarkMode((current) => !current);

  // const addProduct = (product) => setProducts(products => [...products, product])
  // const updateProduct = (updated_product) => setProducts(products => (
  //   products.map(product => product.id === updated_product.id ? updated_product : product)
  // ))
  // const deleteProduct = (deleted_product) => setProducts(products => (
  //   products.filter((product) => product.id !== deleted_product.id)
  // ))

  // const handleEdit = (product) => {
  //   setProductEdit(product)
  //   navigate(`/products/${product.id}/edit`)
  // }

  const updateUser = (value) => setCurrentUser(value)

  return( 
  <div className="app">
  {/* <div className={isDarkMode ? "App" : "App light"}> */}
    <div id="toast-notification">
      <Toaster />
    </div>
    <NavBar  currentUser={currentUser} updateUser={updateUser}/>
    <Outlet context={{ currentUser }} />
  </div>
)};

export default App;
