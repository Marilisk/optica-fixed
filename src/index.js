import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, ScrollRestoration } from "react-router-dom";
import App from './App';
import {store} from './redux/redux-store.ts';
import { Provider } from 'react-redux';

/* const router = createBrowserRouter(
  createRoutesFromElements
) */



const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <Provider store={store} >
    <BrowserRouter>
    {/* <ScrollRestoration /> */}
      <App />
    </BrowserRouter>
  </Provider>
);



reportWebVitals();
