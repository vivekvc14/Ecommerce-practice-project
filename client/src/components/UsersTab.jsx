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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  deleteUser,
  resetErrorAndRemoval,
} from "../redux/actions/adminAcctions";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import ConfirmModal from "./ConfirmModal";

const UsersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState("");
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const { userList, loading, error, userRemoval } = useSelector(
    (state) => state.admin
  );
  const { userInfo } = useSelector((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({
        description: "User has been removed.",
        status: "success",
        isClosable: true,
      });
    }
  }, [userRemoval, dispatch, toast]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
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
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Registered</Th>
              <Th>Admin</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userList &&
              userList.map((user) => (
                <Tr key={user._id}>
                  <Td>
                    {user.name} {user._id === userInfo.id ? "(You)" : ""}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{new Date(user.createdAt).toDateString()}</Td>
                  <Td>
                    {user.isAdmin ? <CheckCircleIcon color="orange.500" /> : ""}
                  </Td>
                  <Td>
                    <Button
                      isDisabled={user._id === userInfo.id}
                      variant="outline"
                      onClick={() => openDeleteConfirmBox(user)}
                    >
                      <DeleteIcon />
                      Remove User
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
        itemToDelete={userToDelete}
        deleteAction={deleteUser}
      />
    </Box>
  );
};

export default UsersTab;
