import React from 'react';
import { Button } from '@chakra-ui/react';

const SubmitButton = (props) => (
  <Button
    height="48px"
    fontSize="16px"
    px="24px"
    bg="#00bfff"
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
    {...props}
  >
    SUBMIT
  </Button>
);

export default SubmitButton;