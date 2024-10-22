import React from 'react';
import { Box, Text, Flex, CloseButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const CustomToast = ({ 
  title, 
  description, 
  status = 'success', 
  onClose,
  id 
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return {
          bg: 'linear-gradient(to right, #4CAF50, #8BC34A)',
          icon: FaCheck,
          iconColor: '#fff'
        };
      case 'error':
        return {
          bg: 'linear-gradient(to right, #FF5252, #FF8A80)',
          icon: FaExclamationTriangle,
          iconColor: '#fff'
        };
      default:
        return {
          bg: 'linear-gradient(to right, #FFD54F, #FFF176)',
          icon: FaCheck,
          iconColor: '#000'
        };
    }
  };

  const { bg, icon: Icon, iconColor } = getStatusStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        style={{ width: '100%', position: 'relative' }}
      >
        <Box
          width="100%"
          bgGradient={bg}
          borderRadius="12px"
          border="1px solid black"
          boxShadow="0 4px 0 0 black"
          padding={4}
          position="relative"
        >
          <Flex alignItems="center">
            <Box
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.2)"
              p={2}
              mr={3}
            >
              <Icon size={24} color={iconColor} />
            </Box>
            <Box flex="1">
              <Text
                fontSize="16px"
                fontWeight="700"
                color="black"
                mb={description ? 1 : 0}
              >
                {title}
              </Text>
              {description && (
                <Text fontSize="14px" color="black" opacity={0.8}>
                  {description}
                </Text>
              )}
            </Box>
            <CloseButton
              size="sm"
              onClick={() => onClose(id)}
              color="black"
              _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
            />
          </Flex>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

// Custom toast function to be used with Chakra's useToast
export const createCustomToast = (toast) => {
  return ({
    title,
    description,
    status = 'success',
    duration = 5000,
    isClosable = true,
  }) => {
    toast({
      position: 'bottom-right',
      render: ({ onClose, id }) => (
        <CustomToast
          title={title}
          description={description}
          status={status}
          onClose={onClose}
          id={id}
        />
      ),
      duration,
      isClosable,
    });
  };
};

export default CustomToast;