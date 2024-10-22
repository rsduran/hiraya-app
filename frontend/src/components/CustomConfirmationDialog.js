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
  useColorMode,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { IconBox } from './IconBox';

const CloseButton = ({ onClick }) => (
  <IconBox
    icon={FaTimes}
    size="24px"
    iconScale={0.7}
    withBorder={false}
    onClick={onClick}
  />
);

const CustomButton = ({ children, onClick, isPrimary = false }) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      onClick={onClick}
      height="48px"
      fontSize="16px"
      px="24px"
      bg={isPrimary 
        ? (colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark")
        : (colorMode === 'light' ? "brand.background.light" : "brand.surface.dark")
      }
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      borderRadius="full"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      fontWeight={700}
      textTransform="uppercase"
      transition="0.3s"
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
      }
      _hover={{
        transform: 'translateY(2px)',
        boxShadow: colorMode === 'light'
          ? "0 2px 0 0 black"
          : "0 2px 0 0 rgba(255, 255, 255, 0.2)",
      }}
      _active={{
        transform: 'translateY(4px)',
        boxShadow: 'none',
      }}
    >
      {children}
    </Button>
  );
};

const CustomConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="20px"
        border="1px solid"
        borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
        boxShadow={colorMode === 'light'
          ? "0 8px 0 0 black"
          : "0 8px 0 0 rgba(255, 255, 255, 0.2)"
        }
        bg={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
        p={6}
      >
        <Flex justifyContent="flex-end">
          <CloseButton onClick={onClose} />
        </Flex>
        <ModalHeader
          fontFamily="heading"
          fontWeight="bold"
          fontSize="24px"
          pb={4}
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        >
          Confirm Submission
        </ModalHeader>
        <ModalBody>
          <Text 
            fontFamily="body"
            fontSize="18px"
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          >
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