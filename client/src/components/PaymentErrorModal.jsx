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
} from "@chakra-ui/react";

const PaymentErrorModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap direction="column" justify="center" align="center" mt="20px">
              <Alert
                h="200px"
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="auto"
              >
                <AlertIcon boxSize="55px" />
                <AlertTitle fontSize="xl" pt="8px">
                  Payment Failed!
                </AlertTitle>
                <AlertDescription>
                  We are sorry! We couldn't process your order.
                </AlertDescription>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentErrorModal;
