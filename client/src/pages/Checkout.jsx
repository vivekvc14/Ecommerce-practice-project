import { Box, Heading, Stack, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import ShippingInformation from "../components/ShippingInformation";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  return (
    <>
      {userInfo ? (
        <Box
          minH="100vh"
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 12 }}
          py={{ base: 6, md: 8, lg: 12 }}
        >
          <Stack
            align={{ lg: "flex-start" }}
            direction={{ base: "column", lg: "row" }}
          >
            <Stack
              mb={{ base: 12, md: "none" }}
              flex={1.5}
              spacing={{ base: 8, md: 10 }}
            >
              <Heading fontSize="2xl" fontWeight="semibold">
                Shipping Information
              </Heading>
              <Stack spacing={6}>
                <ShippingInformation />
              </Stack>
            </Stack>
            <Flex direction="column" align="center" flex={1}>
              <CheckoutOrderSummary />
            </Flex>
          </Stack>
        </Box>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Checkout;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }
  return null;
};
