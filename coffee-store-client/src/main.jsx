import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layout/MainLayout';
import Home from './components/Home';
import UpdateCoffee from './components/UpdateCoffee';
import AddCoffee from './components/AddCoffee';


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/coffees"),
        Component: Home
      },

      {
        path: "addCoffee",
        Component: AddCoffee
      },

      {
        path: "updateCoffee",
        Component: UpdateCoffee
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
