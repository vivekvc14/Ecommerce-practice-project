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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsAction, removeReview } from "../redux/actions/adminAcctions";
import {
  getProducts,
  resetProductError,
} from "../redux/actions/productsActions";
import ConfirmModal from "./ConfirmModal";

const ReviewsTab = () => {
  const dispatch = useDispatch();
  const { loading, error, reviewList } = useSelector((state) => state.admin);
  // const { productRemoval, products } = useSelector((state) => state.products);

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
            </Tr>
          </Thead>
          <Tbody>
            {/* {orders &&
              orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{new Date(order.createdAt).toDateString()}</Td>
                  <Td>{order.user.name}</Td>
                  <Td>{order.user.email}</Td>
                  <Td>
                    <Text>
                      <i>Address:</i> {order.shippingDetails.address}
                    </Text>
                    <Text>
                      <i>City:</i> {order.shippingDetails.city}
                    </Text>
                    <Text>
                      <i>Country:</i> {order.shippingDetails.country}
                    </Text>
                  </Td>
                  <Td>
                    {order.orderItems.map((item) => (
                      <Text>
                        {item.qty} x {item.product.name}
                      </Text>
                    ))}
                  </Td>
                  <Td>{order.paymentMethod}</Td>
                  <Td>${order.shippingPrice}</Td>
                  <Td>${order.totalPrice}</Td>
                  <Td>{order.isDelivered ? <CheckCircleIcon /> : "Pending"}</Td>
                  <Td>
                    <Flex direction="column">
                      <Button
                        variant="outline"
                        onClick={() => openDeleteConfirmBox(order)}
                      >
                        <DeleteIcon mr="5px" />
                        Remove Order
                      </Button>
                      {!order.isDelivered && (
                        <Button
                          variant="outline"
                          mt="4px"
                          onClick={() => onSetToDelivered(order)}
                        >
                          <TbTruckDelivery />
                          <Text ml="4px">Delivered</Text>
                        </Button>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              ))} */}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={orderToDelete}
        deleteAction={deleteOrder}
      /> */}
    </Box>
  );
};

export default ReviewsTab;
