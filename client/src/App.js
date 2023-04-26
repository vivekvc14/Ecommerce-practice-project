import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root";
import Products from "./pages/Products";

function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Root />, children: [
        { path: "products", element: <Products /> }
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
