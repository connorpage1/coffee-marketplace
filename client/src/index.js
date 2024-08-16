import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import routes from './components/routes'


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// test

