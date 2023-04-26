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
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Rating = ({ rating, numReviews }) => {
  const [iconSize, setIconSize] = useState("14px");
  return (
    <Flex>
      <HStack>
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={numReviews >= 1 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={numReviews >= 2 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={numReviews >= 3 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={numReviews >= 4 ? "orange.500" : "gray.200"}
        />
        <StarIcon
          bgSize={iconSize}
          w="14px"
          color={numReviews >= 5 ? "orange.500" : "gray.200"}
        />

        <Text fontSize={"md"} fontWeight={"bold"} ml={"4px"}>
          {`${numReviews} ${numReviews === 1 ? "Review" : "Reviews"}`}
        </Text>
      </HStack>
    </Flex>
  );
};
const ProductCard = ({ product }) => {
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
      {product.isNew && (
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

        {product.isNew && (
          <Badge colorScheme="green" px={2} rounded={"full"} fontSize={".8rem"}>
            New
          </Badge>
        )}
      </Box>

      <Flex alignContent={"center"} mt={1} justifyContent={"space-between"}>
        <Link
          as={ReactLink}
          cursor="pointer"
          to={`/products/${product._id}`}
          pt={2}
        >
          <Box fontWeight={"semibold"} fontSize={"2xl"} lineHeight={"tight"}>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex alignContent="center" justifyContent="space-between" py="2">
        <Rating rating={product.rating} numReviews={product.numReviews} />
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
          >
            <Icon h={7} w={7} alignSelf={"center"} as={FiShoppingCart}></Icon>
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default ProductCard;
