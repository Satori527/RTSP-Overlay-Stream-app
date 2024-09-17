import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App.jsx';
import './index.css';
//import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css";
import store from "./store/store.js";
//import store from "./store/store.js";


import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Overlay from './Pages/Overlay.jsx';
import Signup from './Pages/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      { path: '/', element: <Home /> },
      { path: '/overlay', element: <Overlay /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ]
  },
]);

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
