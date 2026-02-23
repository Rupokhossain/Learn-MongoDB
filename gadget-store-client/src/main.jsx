import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AddGadget from './components/AddGadget.jsx';
import MainLayout from './layout/MainLayout.jsx';
import Home from './components/Home.jsx';
import GadgetDetails from './components/GadgetDetails.jsx';
import UpdateGadget from './components/UpdateGadget.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:5000/gadgets"),
        Component: Home
      },
      {
        path: "addGadget",
        Component: AddGadget
      },
      {
        path: "gadget/:id",
        Component: GadgetDetails
      },
      {
        path: "updateGadget/:id",
        loader: ({params}) => fetch(`http://localhost:5000/gadgets/${params.id}`),
        Component: UpdateGadget
      },

    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

