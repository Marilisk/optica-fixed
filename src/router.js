import { createBrowserRouter } from "react-router-dom";
import { MainPage } from './Components/MainPage/MainPage';
import { Order } from './Components/Cart/Order/Order';
import { Cart } from './Components/Cart/Cart';
import { PrivatePage } from './Components/PrivatePage/PrivatePage';
import { SearchPage } from './Components/SearchPage/SearchPage';
import { Administration } from './Components/MainPage/EyewearAdministration/Administration';
import { LensesAdministration } from './Components/MainPage/LensesAdministration/LensesAdministration';
import { OrderConfirmed } from './Components/OrderConfirmed/OrderConfirmed';
import { Favourites } from './Components/Favourites/Favourites';
import { ProductPage } from './Components/common/ProductPage/ProductPage';
import { LoginPage } from './Components/Header/LoginPage/LoginPage';
import { LensPage } from './Components/Lenses/LensPage/LensPage';
import { Lenses } from './Components/Lenses/Lenses';
import { Men } from './Components/Men/Men';
import { Women } from './Components/Women/Women';
import { ShopByPage } from './Components/GoodsGrid/ShopByPage';
import { Children } from './Components/Children/Children';
import { App } from "./App";
import { OfflineShop } from "./Components/OfflineShop/OfflineShop";
import { Budjet } from "./Components/Budjet/Budjet";
import { QuestionForm } from "./Components/common/QuestionForm/QuestionForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "/shopby/:slug",
        element: <ShopByPage />,
      },
      {
        path: "women",
        element: <Women />,
        children: [
          {
            path: '/women/forreading',
            element: <Women />,
          }
        ],
      },
      {
        path: "men",
        element: <Men />,
        children: [
          {
            path: '/men/forreading',
            element: <Women />,
          }
        ],
      },

      {
        path: "/cart",
        element: <Cart />,
      },

      {
        path: "order",
        element: <Order />,
      },

      {
        path: "/order/:id",
        element: <OrderConfirmed />,
      },

      {
        path: "children",
        element: <Children />,
      },

      {
        path: "budjet/:sum",
        element: <Budjet />,
      },

      {
        path: "/product/:id",
        element: <ProductPage />,
      },

      {
        path: "lenses",
        element: <Lenses />,
      },

      {
        path: "/lenses/:id",
        element: <LensPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/favourites",
        element: <Favourites />,
      },

      {
        path: "/myoptis",
        element: <PrivatePage />,
      },

      {
        path: "/search",
        element: <SearchPage />,
      },

      {
        path: "/offlineshop",
        element: <OfflineShop />,
      },

      {
        path: "/manage",
        element: <Administration />,
        children: [
          {
            path: "/manage/:id",
            element: <Administration />,
          }
        ]
      },

      {
        path: "/managelenses",
        element: <LensesAdministration />,
        children: [
          {
            path: "/managelenses/:id",
            element: <LensesAdministration />,
          }
        ]
      },

      {
        path: "/ask",
        element: <QuestionForm />,
      },

    ],
  },

]
)



