import {
  Box,
  TableContainer,
  Th,
  Tr,
  Thead,
  Table,
  Td,
  Tbody,
  Spinner,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Stack,
  useDisclosure,
  useToast,
  Wrap,
  Button,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeReview } from "../redux/actions/adminAcctions";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productsActions";

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);
  const { productRemoval, products } = useSelector((state) => state.proucts);

  const toast = useToast();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductError());
    if (productRemoval) {
      toast({
        description: "Review has been removed.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, productRemoval]);

  onReviewRemove = (productId, reviewId) => {
    dispatch(removeReview(productId, reviewId));
  };

  return loading ? (
    <Wrap justify="center">
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
    </Wrap>
  ) : error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : (
    <Box></Box>
  );
};

export default ReviewsTab;
