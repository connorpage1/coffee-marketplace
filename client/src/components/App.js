import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'

function App() {
  return( <div className="app">
      <Outlet/>
  </div>
)}

export default App;
