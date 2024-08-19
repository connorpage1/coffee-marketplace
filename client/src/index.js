import React from 'react'
import { ReactDOM, createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './components/App'
import { router } from './components/routes'


const container = document.getElementById("root");
const root = createRoot(container);
root.render(  
    <RouterProvider router={router}/>
  );

