import React from 'react';
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from "./routerConfig"
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={routerConfig} >
              <App/>
          </RouterProvider>
      </Provider>
  </React.StrictMode>
)
