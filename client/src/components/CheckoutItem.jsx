import {
  Image,
  Flex,
  Spacer,
  Divider,
  Text,
  Box,
  Select,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { addCartItem } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  const { image, name, qty, stock, id, price } = item;
  return (
    <>
      <Flex>
        <Image
          src={image}
          width="120px"
          height="120px"
          loading="lazy"
          fit="cover"
          alt={name}
          draggable={false}
          rounded="lg"
        />
        <Flex spacing={4} direction="column" mx={2} flex={1} align="stretch">
          <Text noOfLines={2} maxW="150px">
            {name}
          </Text>
          <Spacer />
          <Select
            maxW={"64px"}
            focusBorderColor={mode("orange.500", "orange.200")}
            value={qty}
            onChange={(e) => {
              dispatch(addCartItem(id, e.target.value));
            }}
          >
            {[...Array(stock).keys()].map((item) => (
              <option key={item + 1} value={item + 1}>
                {item + 1}
              </option>
            ))}
          </Select>
        </Flex>
        <Box>
          <Text fontWeight="bold">${price}</Text>
        </Box>
      </Flex>
      <Divider bg={mode("gray.400", "gray.800")}></Divider>
    </>
  );
};

export default CheckoutItem;
