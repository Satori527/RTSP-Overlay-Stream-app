import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App.jsx';
import './index.css';
//import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./store/store.js";
//import store from "./store/store.js";


import Home from './Home.jsx';
import Login from './Login.jsx';
import Overlay from './Overlay.jsx';
import Signup from './Signup.jsx';
import Stream from './Stream.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { path: '/', element: <Home /> },
      { path: '/stream', element: <Stream /> },
      { path: '/overlay', element: <Overlay /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
