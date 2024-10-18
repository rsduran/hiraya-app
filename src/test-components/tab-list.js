import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Box, Button, ButtonGroup, Fade } from '@chakra-ui/react';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      variants: {
        referral: {
          height: '48px',
          fontSize: '16px',
          px: '24px',
          borderRadius: 'full',
          border: '2px solid black',
          fontWeight: 700,
          textTransform: 'uppercase',
          transition: '0.3s',
          boxShadow: '0 4px 0 0 black',
          _hover: {
            transform: 'translateY(2px)',
            boxShadow: '0 2px 0 0 black',
          },
          _active: {
            transform: 'translateY(4px)',
            boxShadow: 'none',
          },
          // Adjust borders for attached buttons
          borderRight: '0',
          _first: {
            borderTopLeftRadius: 'full',
            borderBottomLeftRadius: 'full',
          },
          _last: {
            borderRight: '2px solid black',
            borderTopRightRadius: 'full',
            borderBottomRightRadius: 'full',
          },
        },
      },
    },
  },
});

const ReferralButton = ({ children, isSelected, ...props }) => (
  <Button
    variant="referral"
    bg={isSelected ? '#00bfff' : 'gray.200'}
    color={isSelected ? 'black' : 'gray.600'}
    {...props}
  >
    {children}
  </Button>
);

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState('COPY REFERRAL LINK');

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minHeight="100vh" display="flex" flexDirection="column" alignItems="center" px={4} py={8}>
        <ButtonGroup isAttached variant="referral" width="100%" maxWidth="800px">
          <ReferralButton
            isSelected={selectedTab === 'COPY REFERRAL LINK'}
            onClick={() => setSelectedTab('COPY REFERRAL LINK')}
            flex={1}
          >
            COPY REFERRAL LINK
          </ReferralButton>
          <ReferralButton
            isSelected={selectedTab === 'SHARE REFERRAL'}
            onClick={() => setSelectedTab('SHARE REFERRAL')}
            flex={1}
          >
            SHARE REFERRAL
          </ReferralButton>
          <ReferralButton
            isSelected={selectedTab === 'VIEW STATS'}
            onClick={() => setSelectedTab('VIEW STATS')}
            flex={1}
          >
            VIEW STATS
          </ReferralButton>
          <ReferralButton
            isSelected={selectedTab === 'SETTINGS'}
            onClick={() => setSelectedTab('SETTINGS')}
            flex={1}
          >
            SETTINGS
          </ReferralButton>
        </ButtonGroup>

        {/* Content area with fade animation */}
        <Box mt={8} width="100%" maxWidth="800px">
          <Fade in={selectedTab === 'COPY REFERRAL LINK'}>
            {selectedTab === 'COPY REFERRAL LINK' && <Box>Content for COPY REFERRAL LINK</Box>}
          </Fade>
          <Fade in={selectedTab === 'SHARE REFERRAL'}>
            {selectedTab === 'SHARE REFERRAL' && <Box>Content for SHARE REFERRAL</Box>}
          </Fade>
          <Fade in={selectedTab === 'VIEW STATS'}>
            {selectedTab === 'VIEW STATS' && <Box>Content for VIEW STATS</Box>}
          </Fade>
          <Fade in={selectedTab === 'SETTINGS'}>
            {selectedTab === 'SETTINGS' && <Box>Content for SETTINGS</Box>}
          </Fade>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MainPage;
