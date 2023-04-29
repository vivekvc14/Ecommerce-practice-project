import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Landing from "./pages/Landing";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Root />, children: [
        { index: true, element: <Landing /> },
        { path: "products", element: <Products /> },
        { path: "product/:productId", element: <Product /> },
        { path: "cart", element: <Cart /> },
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
