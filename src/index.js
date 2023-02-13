import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { store } from './redux/redux-store.ts';
import { Provider } from 'react-redux';
import { router } from './router';


const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
);



reportWebVitals();
