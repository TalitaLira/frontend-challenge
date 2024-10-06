import React from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from "./routerConfig"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={routerConfig} />
  </React.StrictMode>
)
