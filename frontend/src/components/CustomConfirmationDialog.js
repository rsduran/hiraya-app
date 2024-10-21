import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from '@chakra-ui/react';

const CustomConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="12px" border="1px solid black">
        <ModalHeader fontFamily="'Space Grotesk', sans-serif" fontWeight="bold">Confirm Submission</ModalHeader>
        <ModalBody>
          <Text fontFamily='"Karla Variable", sans-serif'>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onConfirm}
            backgroundColor="#00bfff"
            color="black"
            mr={3}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: '0 2px 0 0 black',
            }}
          >
            Submit
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: '0 2px 0 0 black',
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomConfirmationDialog;