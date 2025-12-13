import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Carrinho from "./pages/Carrinho.tsx";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/Carrinho",
        element: <Carrinho />
    }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
