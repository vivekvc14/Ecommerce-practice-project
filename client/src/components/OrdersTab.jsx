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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbTruckDelivery } from "react-icons/tb";
import {
  getAllOrders,
  deleteOrder,
  setOrderDelivered,
  resetErrorAndRemoval,
} from "../redux/actions/adminAcctions";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import ConfirmModal from "./ConfirmModal";

const OrdersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderToDelete, setOrderToDelete] = useState("");
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { orders, loading, error, orderRemoval, orderDelivered } = useSelector(
    (state) => state.admin
  );

  const toast = useToast();

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(resetErrorAndRemoval());
    if (orderRemoval) {
      toast({
        description: "Order has been removed.",
        status: "success",
        isClosable: true,
      });
    }

    if (orderDelivered) {
      toast({
        description: "Order has been set to delivered.",
        status: "success",
        isClosable: true,
      });
    }
  }, [orderRemoval, dispatch, toast, orderDelivered]);

  const openDeleteConfirmBox = (order) => {
    setOrderToDelete(order);
    onOpen();
  };

  const onSetToDelivered = (order) => {
    dispatch(resetErrorAndRemoval());
    dispatch(setOrderDelivered(order._id));
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
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Shipping Info</Th>
              <Th>Items Ordered</Th>
              <Th>Payment Method</Th>
              <Th>Shipping Price</Th>
              <Th>Total</Th>
              <Th>Delivered</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders &&
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
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={orderToDelete}
        deleteAction={deleteOrder}
      />
    </Box>
  );
};

export default OrdersTab;
