import {
  Flex,
  Stack,
  Image,
  Badge,
  Circle,
  Button,
  Icon,
  Box,
  Tooltip,
  Link,
  HStack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/actions/cartActions";

const Rating = ({ rating, numberOfReviews }) => {
  const [iconSize, setIconSize] = useState("14px");
  return (
    <Flex>
      <HStack>
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={rating >= 1 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={rating >= 2 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={rating >= 3 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={rating >= 4 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={rating >= 5 ? "orange.500" : "gray.200"}
        />

        <Text fontSize={"md"} fontWeight={"bold"} ml={"4px"}>
          {`${numberOfReviews} ${numberOfReviews === 1 ? "Review" : "Reviews"}`}
        </Text>
      </HStack>
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { cart } = useSelector((state) => state.cart);

  const addItem = (id) => {
    if (cart.find((item) => item.id === id)) {
      toast({
        description:
          "This item is already in your cart. Go to cart to change the amount.",
        status: "warning",
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1));
      toast({
        description: "Item has been added to your cart",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      spacing={"3px"}
      p={2}
      bg={useColorModeValue("white", "gray.800")}
      minWidth={"250px"}
      h={"450px"}
      rounded={"lg"}
      shadow={"lg"}
      borderWidth={"1px"}
      position={"relative"}
    >
      {product.productIsNew && (
        <Circle
          top={2}
          right={2}
          bg="green.300"
          size="10px"
          position="absolute"
        />
      )}

      {product.stock <= 0 && (
        <Circle
          top={2}
          right={2}
          bg="red.300"
          size="10px"
          position="absolute"
        />
      )}

      <Image src={product.image} alt={product.name} borderTop="lg" />

      <Box alignItems={"baseline"} maxH="5px" flex={1}>
        {product.stock <= 0 && (
          <Badge colorScheme="red" px={2} rounded={"full"} fontSize={".8rem"}>
            Sold out
          </Badge>
        )}

        {product.productIsNew && (
          <Badge colorScheme="green" px={2} rounded={"full"} fontSize={".8rem"}>
            New
          </Badge>
        )}
      </Box>

      <Flex alignContent={"center"} mt={1} justifyContent={"space-between"}>
        <Link
          as={ReactLink}
          cursor="pointer"
          to={`/product/${product._id}`}
          pt={2}
        >
          <Box fontWeight={"semibold"} fontSize={"2xl"} lineHeight={"tight"}>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex alignContent="center" justifyContent="space-between" py="2">
        <Rating
          rating={product.rating}
          numberOfReviews={product.numberOfReviews}
        />
      </Flex>
      <Flex justifyContent={"space-between"}>
        <Box color={useColorModeValue("gray.800", "white")} fontSize={"2xl"}>
          <Box as="span" color={"gray.600"} fontSize={"lg"}>
            $
          </Box>
          {product.price.toFixed(2)}
        </Box>

        <Tooltip
          label="Add to cart"
          bg={"white"}
          placement="top"
          color="gray.800"
          fontSize="1.2rem"
        >
          <Button
            variant={"ghost"}
            display={"flex"}
            disabled={product.stock <= 0}
            onClick={addItem.bind(null, product._id)}
          >
            <Icon h={7} w={7} alignSelf={"center"} as={FiShoppingCart}></Icon>
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
