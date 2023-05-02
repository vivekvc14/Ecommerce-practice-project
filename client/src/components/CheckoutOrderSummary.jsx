import { useState, useEffect, useCallback } from "react";
import {
  Flex,
  Heading,
  Stack,
  Link,
  Box,
  Text,
  Badge,
  useColorModeValue as mode,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { PhoneIcon, ChatIcon, EmailIcon } from "@chakra-ui/icons";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import CheckoutItem from "./CheckoutItem";
import PayPalButton from "./PayPalButton";
import { resetCart } from "../redux/actions/cartActions";
import PaymentErrorModal from "./PaymentErrorModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

const CheckoutOrderSummary = () => {
  const {
    onOpen: onErrorOpen,
    onClose: onErrorClose,
    isOpen: isErrorOpen,
  } = useDisclosure();

  const {
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
    isOpen: isSuccessOpen,
  } = useDisclosure();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const colorMode = mode("gray.600", "gray.400");
  const { cart, expressShipping, subTotal } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.user);

  const order = useSelector((state) => state.order);
  const { error, shippingAddress } = order;
  const dispatch = useDispatch();

  const shipping = useCallback(() => {
    return expressShipping === "true" ? 14.99 : subTotal <= 1000 ? 4.99 : 0;
  }, [expressShipping, subTotal]);

  const total = useCallback(() => {
    return Number(
      shipping() === 0
        ? Number(subTotal).toFixed(2)
        : Number(subTotal) + Number(shipping()).toFixed(2)
    );
  }, [shipping, subTotal]);

  const orderItems = cart.map((item) => {
    return {
      product: item.id,
      qty: +item.qty,
    };
  });

  const onPaymentSuccess = (data) => {
    onSuccessOpen();
    dispatch(
      createOrder({
        orderItems,
        shippingDetails: shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        user: userInfo.id,
      })
    );

    dispatch(resetCart());
    dispatch(resetOrder());
  };

  const onPaymentError = () => {
    onErrorOpen();
  };

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, expressShipping]);

  return (
    <Stack width="full" rounded="xl" padding={8} spacing={8}>
      <Heading size="md">Order Summary</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}

      <Stack spacing={6}>
        <Flex justify="space-between">
          <Text color={colorMode} fontWeight="medium">
            Sub Total
          </Text>
          <Text color={colorMode} fontWeight="medium">
            {subTotal.toFixed(2)}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text color={colorMode} fontWeight="medium">
            Shipping
          </Text>
          <Text color={colorMode} fontWeight="medium">
            {shipping() === 0 ? (
              <Badge colorScheme="green" p={2} rounded="full">
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex>

        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="medium">
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>

      <PayPalButton
        disabled={buttonDisabled}
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />

      <Box align="center">
        <Text fontSize="sm">
          Have questions, or need help to complete your order?
        </Text>
        <Flex justifyContent="center" color={mode("orange.500", "orange.100")}>
          <Flex align="center">
            <ChatIcon />
            <Text m="2">Live Chat</Text>
          </Flex>
          <Flex align="center">
            <PhoneIcon />
            <Text m="2">Phone</Text>
          </Flex>
          <Flex align="center">
            <EmailIcon />
            <Text m="2">Email</Text>
          </Flex>
        </Flex>
      </Box>

      <Divider bg={mode("gray.400", "gray.800")} />
      <Flex justifyContent="center" my={6} fontWeight="semibold">
        <p>or</p>
        <Link as={RouterLink} to="/products" ml={1}>
          Continue Shopping
        </Link>
      </Flex>
      <PaymentErrorModal onClose={onErrorClose} isOpen={isErrorOpen} />
      <PaymentSuccessModal onClose={onSuccessClose} isOpen={isSuccessOpen} />
    </Stack>
  );
};

export default CheckoutOrderSummary;
