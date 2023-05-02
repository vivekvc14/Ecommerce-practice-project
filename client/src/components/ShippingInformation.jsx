import {
  Box,
  VStack,
  Heading,
  FormControl,
  Stack,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import TextField from "./TextField";
import {
  setShippingAddress,
  setShippingAddressError,
} from "../redux/actions/orderActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addExpressShipping } from "../redux/actions/cartActions";

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }

    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: "", postalCode: "", city: "", country: "" }}
      validationSchema={Yup.object({
        address: Yup.string()
          .required("This field is required.")
          .min(2, "This address is too short."),
        postalCode: Yup.string()
          .required("This field is required.")
          .min(2, "This postal code is too short."),
        city: Yup.string()
          .required("This field is required.")
          .min(2, "This city is too short."),
        country: Yup.string()
          .required("This field is required.")
          .min(2, "This country is too short."),
      })}
    >
      {(formik) => (
        <VStack as="form">
          <FormControl
            onChange={
              Object.keys(formik.errors).length === 0 &&
              Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }
          >
            <TextField name="address" label="Address" placeholder="address" />
            <Flex>
              <Box flex={1} mr={10}>
                <TextField
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Postal Code"
                />
              </Box>

              <Box flex={1} mr={10}>
                <TextField name="city" label="City" placeholder="City" />
              </Box>
            </Flex>

            <TextField name="country" label="Country" placeholder="Country" />
          </FormControl>
          <Box w="100%" h="100px" pr="5">
            <Heading mb={10} fontSize="2xl" fontWeight="extrabold">
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue="false"
              onChange={(e) => dispatch(addExpressShipping(e))}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
              >
                <Stack spacing={{ base: 8, md: 10 }} pr={10} flex={1.5}>
                  <Box>
                    <Radio value="true">
                      <Text fontWeight="bold">Express $14.99</Text>
                      <Text>Dispatched in 24 hours.</Text>
                    </Radio>
                    <Stack spacing={6}>Express</Stack>
                  </Box>
                </Stack>
                <Radio value="false">
                  <Tooltip label="Free shipping for orders above $1000">
                    <Box>
                      <Text fontWeight="bold">Standard $4.99</Text>
                      <Text>Dispatched in 4 - 5 days.</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default ShippingInformation;
