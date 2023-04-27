import {
  useColorModeValue as mode,
  Box,
  Flex,
  Stack,
  Text,
  CloseButton,
  Select,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { image, name, stock, price, qty, id } = item;
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify={"space-between"}
      align={"center"}
    >
      <Stack direction={"row"} spacing={4} width={"full"}>
        <Image
          width={"120px"}
          rounded={"lg"}
          fit={"cover"}
          src={image}
          loading="lazy"
          alt={name}
          draggable="false"
        />

        <Box pt={4}>
          <Stack spacing={0.5}>
            <Text fontWeight={"medium"}>{name}</Text>
          </Stack>
        </Box>
      </Stack>

      <Flex
        w={"full"}
        mt={{ base: 4, md: 0 }}
        align={{ base: "center", md: "baseline" }}
        display={"flex"}
        justify={"space-between"}
      >
        <Select
          maxW={"64px"}
          focusBorderColor={mode("orange.500", "orange.200")}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {[...Array(stock).keys()].map((item) => {
            <option key={item + 1} value={item + 1}>
              {item + 1}
            </option>;
          })}
        </Select>
        <Text fontWeight={"bold"}>${price}</Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
