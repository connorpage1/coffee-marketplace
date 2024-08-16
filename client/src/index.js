import React from 'react'
import { RouterProvider } from "react-router-dom";
import './index.css'
import routes from './components/routes.jsx'
import { createRoot } from 'react-dom/client';


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={ routes }/>);

