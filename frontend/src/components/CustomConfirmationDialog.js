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
  Flex,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { IconBox } from './IconBox';

const CloseButton = ({ onClick }) => (
  <IconBox
    icon={FaTimes}
    size="24px"
    iconScale={0.7}
    withBorder={false}
    bgColor="transparent"
    onClick={onClick}
  />
);

const CustomButton = ({ children, onClick, isPrimary = false }) => (
  <Button
    onClick={onClick}
    height="48px"
    fontSize="16px"
    px="24px"
    bg={isPrimary ? "#00bfff" : "white"}
    color="black"
    borderRadius="full"
    border="1px solid black"
    fontWeight={700}
    textTransform="uppercase"
    transition="0.3s"
    boxShadow="0 4px 0 0 black"
    _hover={{
      transform: 'translateY(2px)',
      boxShadow: '0 2px 0 0 black',
    }}
    _active={{
      transform: 'translateY(4px)',
      boxShadow: 'none',
    }}
  >
    {children}
  </Button>
);

const CustomConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        border="1px solid black"
        boxShadow="0 8px 0 0 black"
        p={6}
      >
        <Flex justifyContent="flex-end">
          <CloseButton onClick={onClose} />
        </Flex>
        <ModalHeader
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="bold"
          fontSize="24px"
          pb={4}
        >
          Confirm Submission
        </ModalHeader>
        <ModalBody>
          <Text fontFamily='"Karla Variable", sans-serif' fontSize="18px">
            {message}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end" width="100%" gap={4}>
            <CustomButton onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton onClick={onConfirm} isPrimary>
              Submit
            </CustomButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomConfirmationDialog;