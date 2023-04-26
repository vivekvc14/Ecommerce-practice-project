import { ChakraProvider } from "@chakra-ui/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./pages/Root";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Root /> }
  ])

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
