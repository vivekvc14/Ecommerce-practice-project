import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Tr,
  Thead,
  Wrap,
  Button,
  ListItem,
  UnorderedList,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Td,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../redux/actions/userActions";

const YourOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, orders, userInfo } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, []);
  return userInfo ? (
    <>
      {loading ? (
        <Wrap
          justify="center"
          align="center"
          direction="column"
          mt="20px"
          minW="100vh"
        >
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
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight="100vh">
            <Table variant="stripped">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                  <Th>Print Receipt</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      ${order.totalPrice} via {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.product.name} ($
                            {item.product.price} each)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td>
                      <Button variant="outline">Receipt</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    navigate("/login")
  );
};

export default YourOrders;
