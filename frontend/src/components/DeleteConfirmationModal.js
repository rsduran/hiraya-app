import React from 'react';
import {
  Box,
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
  useColorMode,
} from '@chakra-ui/react';
import { FaTimes, FaTrash } from 'react-icons/fa';

const CloseButton = ({ onClick, colorMode }) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="24px"
      h="24px"
      bg="transparent"
      _focus={{ boxShadow: "none" }}
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      borderRadius="50%"
      _hover={{ bg: 'transparent' }} // Ensures no background change on hover
    >
      <FaTimes size="16px" />
    </Box>
  );
};

const CustomButton = ({ children, onClick, isDanger = false, ...props }) => {
  const { colorMode } = useColorMode();

  // For danger buttons, we'll use specific colors rather than theme colors
  const dangerColors = {
    light: {
      bg: "#FF3333",
      hoverBg: "#FF0000",
      text: "white",
    },
    dark: {
      bg: "#CC0000",
      hoverBg: "#990000",
      text: "white",
    },
  };

  return (
    <Button
      onClick={onClick}
      height="48px"
      fontSize="16px"
      px="24px"
      bg={isDanger 
        ? dangerColors[colorMode].bg
        : (colorMode === 'light' ? "brand.background.light" : "brand.surface.dark")
      }
      color={isDanger
        ? dangerColors[colorMode].text
        : (colorMode === 'light' ? "brand.text.light" : "brand.text.dark")
      }
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
        bg: isDanger
          ? dangerColors[colorMode].hoverBg
          : (colorMode === 'light' ? "brand.surface.light" : "brand.background.dark"),
        transform: 'translateY(2px)',
        boxShadow: colorMode === 'light'
          ? "0 2px 0 0 black"
          : "0 2px 0 0 rgba(255, 255, 255, 0.2)",
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
};

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message,
  itemCount,
  deleteType // "selected" or "all"
}) => {
  const { colorMode } = useColorMode();

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
          {title}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text 
              fontFamily="body"
              fontSize="18px"
              color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            >
              {getDescription()}
            </Text>
            {message && (
              <Text 
                fontFamily="body"
                fontSize="16px"
                color={colorMode === 'light' ? "gray.600" : "gray.400"}
              >
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