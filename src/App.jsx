import { useSelector, useDispatch } from "react-redux";
import CheckOut from "./components/CheckOut";
import Navbar from "./components/Navbar";
import ShoppingContainer from "./components/ShoppingContainer";
import { useEffect } from "react";
import { total } from "./components/State/Slice/CartSlice";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ItemDetails from "./components/ItemDetails";

const Layout = () => {
  const { isOpen } = useSelector((state) => state.checkout);

  return (
    <div>
      <Navbar />
      {isOpen && <CheckOut />}
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ShoppingContainer />,
      },
      {
        path: "/ItemDetails/:id",
        element: <ItemDetails />,
      },
    ],
  },
]);

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(total());
  }, [cartItems]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
