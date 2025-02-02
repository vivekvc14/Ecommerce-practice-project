import {
  Box,
  Th,
  Tr,
  Thead,
  Table,
  Tbody,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Stack,
  useToast,
  Wrap,
  Text,
  Accordion,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productsActions";
import ProductTableItem from "./ProductTableItem";
import AddNewProduct from "./AddNewProduct";

const OrdersTab = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);
  const { products, productUpdate } = useSelector((state) => state.products);

  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productUpdate) {
      toast({
        description: "Product has been updated.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, productUpdate]);

  return loading ? (
    <Wrap justify="center">
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
    </Wrap>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex={1} textAlign="right">
                <Box>
                  <Text mr="8px" fontWeight="bold">
                    Add a new product
                  </Text>
                </Box>
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb="4px">
            <Table>
              <Tbody>
                <AddNewProduct />
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Description</Th>
            <Th>Brand & Name</Th>
            <Th>Category & Price</Th>
            <Th>Stock & new Badge</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.length > 0 &&
            products.map((product) => (
              <ProductTableItem key={product._id} product={product} />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrdersTab;
