import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import NavBar from "./NavBar";

function App() {
  return( 
  <div className="app">
      <header><NavBar/></header>
      <Outlet/>
  </div>
)}

export default App;
