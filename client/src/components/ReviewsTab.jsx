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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsAction, removeReview } from "../redux/actions/adminAcctions";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productsActions";
import ConfirmModal from "./ConfirmModal";
import { DeleteIcon } from "@chakra-ui/icons";

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const { loading, error, reviewList } = useSelector((state) => state.admin);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { productRemoval, products } = useSelector((state) => state.products);
  const [reviewToDelete, setReviewToDelete] = useState("");
  const cancelRef = useRef();
  const toast = useToast();

  useEffect(() => {
    dispatch(getReviewsAction());
  }, []);

  // useEffect(() => {
  //   dispatch(getProducts());
  //   dispatch(resetProductError());
  //   if (productRemoval) {
  //     toast({
  //       description: "Review has been removed.",
  //       status: "success",
  //       isClosable: true,
  //     });
  //   }
  // }, [dispatch, toast, productRemoval]);

  // const onReviewRemove = (productId, reviewId) => {
  //   dispatch(removeReview(productId, reviewId));
  // };

  const openDeleteConfirmBox = (review) => {
    setReviewToDelete(review);
    onOpen();
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
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Reviewer</Th>
              <Th>Product Name</Th>
              <Th>Rating</Th>
              <Th>Review Title</Th>
              <Th>Review Description</Th>
              <Th>Review Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviewList &&
              reviewList.map((review) => (
                <Tr key={review._id}>
                  <Td>{review.name}</Td>
                  <Td>{review.productName}</Td>
                  <Td>{review.rating}</Td>
                  <Td>{review.title ? review.title : "No Title"}</Td>
                  <Td>{review.comment}</Td>
                  <Td>{new Date(review.createdAt).toDateString()}</Td>
                  <Td>
                    <Button
                      variant="outline"
                      onClick={() => openDeleteConfirmBox(review)}
                    >
                      <DeleteIcon />
                      Remove Review
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={reviewToDelete}
        deleteAction={removeReview}
      />
    </Box>
  );
};

export default ReviewsTab;
