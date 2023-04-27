import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
  Box,
  Flex,
  HStack,
  Heading,
  Link,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartOrderSummary from "../components/CartOrderSummary";

const Cart = () => {
  const { loading, error, cart } = useSelector((state) => state.cart);
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
      ) : cart.length === 0 ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>
            You have not added any product to your cart, yet.
          </AlertTitle>
          <AlertDescription>
            <Link as={RouterLink} to="/products">
              Click here to see products
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx={"auto"}
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 6, md: 8, lg: 12 }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: 8, md: 16 }}
            align={{ lg: "flex-start" }}
          >
            <Stack flex={2} spacing={{ base: 8, md: 10 }}>
              <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
                Shopping Cart
              </Heading>

              <Stack spacing={6}>
                {cart.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </Stack>
            </Stack>
            <Flex direction={"column"} flex={1} align={"center"}>
              <CartOrderSummary />
              <HStack fontWeight="semibold" mt={6}>
                <p>or</p>
                <Link
                  as={RouterLink}
                  to="/products"
                  color={mode("orange.500", "orange.200")}
                >
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default Cart;
