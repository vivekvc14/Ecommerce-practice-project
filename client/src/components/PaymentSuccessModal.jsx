import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap,
  Stack,
  useToast,
  Button,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: "You have been logged out successfully!",
      status: "success",
      isClosable: true,
    });
    navigate("/products");
  };

  return (
    <>
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap direction="column" justify="center" align="center" mt="20px">
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
              >
                <AlertIcon boxSize="55px" />
                <AlertTitle fontSize="xl" pt="8px">
                  Payment Successfull!
                </AlertTitle>
                <AlertDescription>From here, you can go to:</AlertDescription>
                <Stack mt="20px" minW="200px">
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    as={RouterLink}
                    to="/your-orders"
                  >
                    Your Orders
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    as={RouterLink}
                    to="/products"
                  >
                    Products
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    as={RouterLink}
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Stack>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
