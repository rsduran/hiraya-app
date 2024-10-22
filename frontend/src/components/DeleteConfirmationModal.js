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
  VStack,
} from '@chakra-ui/react';
import { FaTimes, FaTrash } from 'react-icons/fa';
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

const CustomButton = ({ children, onClick, isDanger = false, ...props }) => (
  <Button
    onClick={onClick}
    height="48px"
    fontSize="16px"
    px="24px"
    bg={isDanger ? "#FF3333" : "white"}
    color={isDanger ? "white" : "black"}
    borderRadius="full"
    border="1px solid black"
    fontWeight={700}
    textTransform="uppercase"
    transition="0.3s"
    boxShadow="0 4px 0 0 black"
    _hover={{
      bg: isDanger ? "#FF0000" : "#f5f5f5",
      transform: 'translateY(2px)',
      boxShadow: '0 2px 0 0 black',
    }}
    _active={{
      transform: 'translateY(4px)',
      boxShadow: 'none',
    }}
    {...props}
  >
    {children}
  </Button>
);

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message,
  itemCount,
  deleteType // "selected" or "all"
}) => {
  const getDescription = () => {
    if (deleteType === "all") {
      return "This will permanently delete all your exam progress. This action cannot be undone.";
    }
    return `This will permanently delete ${itemCount} ${itemCount === 1 ? 'exam' : 'exams'} and their progress. This action cannot be undone.`;
  };

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
          {title}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontFamily='"Karla Variable", sans-serif' fontSize="18px">
              {getDescription()}
            </Text>
            {message && (
              <Text fontFamily='"Karla Variable", sans-serif' fontSize="16px" color="gray.600">
                {message}
              </Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="flex-end" width="100%" gap={4}>
            <CustomButton onClick={onClose}>
              Cancel
            </CustomButton>
            <CustomButton 
              onClick={onConfirm} 
              isDanger
              leftIcon={<FaTrash />}
            >
              Delete {deleteType === "all" ? "All" : "Selected"}
            </CustomButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;