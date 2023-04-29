import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Wrap,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { MinusIcon, SmallAddIcon, StarIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { getProduct } from "../redux/actions/productsActions";
import { addCartItem } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Product = () => {
  const [amount, setAmount] = useState(1);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;
  const { cart } = useSelector((state) => state.cart);
  const toast = useToast();

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId, cart]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount((prev) => prev + 1);
    } else if (input === "minus") {
      setAmount((prev) => prev - 1);
    }
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({
      description: "Item added to cart.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Wrap minHeight={"100vh"} spacing="30px" justify="center">
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
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx={"auto"}
            px={{ base: 4, md: 8, lg: 12 }}
            py={{ base: 6, md: 8, lg: 12 }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack
                pr={{ base: 0, md: 12 }}
                flex={1.5}
                spacing={{ base: 8, md: 4 }}
                mb={{ base: 12, md: "none" }}
              >
                {product.productIsNew && (
                  <Badge
                    colorScheme="green"
                    rounded="full"
                    w="70px"
                    p="2px"
                    fontSize=".8rem"
                    textAlign="center"
                  >
                    New
                  </Badge>
                )}

                {product.stock === 0 && (
                  <Badge
                    colorScheme="red"
                    rounded="full"
                    w="80px"
                    p="2px"
                    fontSize=".8rem"
                    textAlign="center"
                  >
                    Sold Out
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {product.name}
                </Heading>
                <Stack spacing={5}>
                  <Box>
                    <Text fontSize="xl">${product.price}</Text>
                    <Flex>
                      <HStack spacing={"2px"}>
                        <StarIcon
                          color={
                            product.rating >= 1 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 2 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 3 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 4 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 5 ? "orange.500" : "gray.200"
                          }
                        />

                        <Text fontSize={"md"} fontWeight={"bold"} ml={"4px"}>
                          {`${product.numberOfReviews} ${
                            product.numberOfReviews === 1 ? "Review" : "Reviews"
                          }`}
                        </Text>
                      </HStack>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={"bold"}>Quantity</Text>
                  <Flex
                    w={"170px"}
                    p="5px"
                    border={"1px"}
                    borderColor={"gray.200"}
                    alignItems={"center"}
                  >
                    <Button
                      isDisabled={amount <= 1}
                      onClick={() => changeAmount("minus")}
                    >
                      <MinusIcon />
                    </Button>
                    <Text mx="30px">{amount}</Text>
                    <Button
                      isDisabled={amount >= product.stock}
                      onClick={() => changeAmount("plus")}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>

                  <Button
                    isDisabled={product.stock === 0}
                    colorScheme="orange"
                    onClick={addItem}
                  >
                    Add to Cart
                  </Button>

                  <Stack w="270px">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml={2}>
                        Free shipping if order is above $1000
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml={2}>
                        2 year extended warranty
                      </Text>
                    </Flex>

                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml={2}>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direction="column"
                align="center"
                flex={1}
                _dark={{ bg: "gray.900" }}
              >
                <Image mb="30px" src={product.image} alt={product.name} />
              </Flex>
            </Stack>

            <Stack>
              <Text fontWeight="bold" fontSize="xl">
                Reviews
              </Text>
              <SimpleGrid minChildWidth="300px" spacingX="40px" spacingY="20px">
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing="2px" alignItems="center">
                      <StarIcon
                        color={review.rating >= 1 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 2 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 3 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 4 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 5 ? "orange.500" : "gray.200"}
                      />
                      <Text fontWeight="semibold" ml="4px">
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py="12px">{review.comment}</Box>
                    <Text fontSize="sm" color="gray.400">
                      by {review.name},{" "}
                      {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default Product;
