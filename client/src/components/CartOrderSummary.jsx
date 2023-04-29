import {
  Button,
  useColorModeValue as mode,
  Stack,
  Heading,
  Flex,
  Badge,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const standardShipping = Number(4.99).toFixed();
  const cartItems = useSelector((state) => state.cart);
  const { subTotal } = cartItems;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    setButtonLoading(false);
    navigate("/checkout");
  };
  return (
    <Stack w="full" borderWidth="1px" spacing={8} rounded={"lg"} padding={8}>
      <Heading size={"md"}>Order Summary</Heading>
      <Stack spacing={8}>
        <Flex justify={"space-between"}>
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Sub Total
          </Text>
          <Text fontWeight={"medium"}>{subTotal}</Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
            Shipping
          </Text>
          <Text fontWeight={"medium"}>
            {subTotal >= 1000 ? (
              <Badge px={2} rounded="full" fontSize=".8rem" colorScheme="green">
                Free
              </Badge>
            ) : (
              standardShipping
            )}
          </Text>
        </Flex>
        <Flex justify={"space-between"}>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Total
          </Text>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {subTotal >= 1000 ? subTotal : +subTotal + +standardShipping}
          </Text>
        </Flex>
      </Stack>
      <Button
        as={RouterLink}
        to="/checkout"
        size={"lg"}
        fontSize={"medium"}
        colorScheme="orange"
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
