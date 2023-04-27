import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productsActions";
import { useEffect } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  loading && console.log("Loading...");

  return (
    <Wrap spacing={"30px"} minHeight={"100vh"} justify={"center"}>
      {loading ? (
        <Stack direction="row" spacing="4">
          <Spinner
            mt={"20px"}
            thickness="2px"
            speed=".5s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        products.map((product) => (
          <WrapItem key={product._id}>
            <Center w="250px" h="550px">
              <ProductCard product={product} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default Products;
