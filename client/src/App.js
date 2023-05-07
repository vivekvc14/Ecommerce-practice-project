import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile, { loader as profileLoader } from "./pages/Profile";
import Checkout from "./pages/Checkout";
import YourOrders from "./pages/YourOrders";
import AdminConsole, { loader as adminLoader } from "./pages/AdminConsole";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Root />, children: [
        { index: true, element: <Landing /> },
        { path: "products", element: <Products /> },
        { path: "product/:productId", element: <Product /> },
        { path: "cart", element: <Cart /> },
        { path: "login", element: <Login /> },
        { path: "registration", element: <Register /> },
        { path: "profile", element: <Profile />, loader: profileLoader },
        { path: "checkout", element: <Checkout /> },
        { path: "your-orders", element: <YourOrders /> },
        { path: "admin-console", element: <AdminConsole />, loader: adminLoader }
      ]
    }
  ])

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
