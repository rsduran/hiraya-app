import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Flex, chakra, Button, Icon } from '@chakra-ui/react';
import { GiDreamCatcher, GiCubeforce, GiSpellBook } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { RiStackLine } from 'react-icons/ri';
import { LuRocket, LuLogOut, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import '@fontsource-variable/karla/wght.css';
import '@fontsource/space-grotesk/700.css';
import { useNavigate } from 'react-router-dom';

// Keep your existing chakra components
const SidebarItem = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    height: '52px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderRadius: '0 20px 20px 0',
    marginRight: '16px',
    position: 'relative',
    marginTop: '3px',
    marginBottom: '3px',
    _hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
});

const SidebarIcon = chakra(Box, {
  baseStyle: {
    fontSize: '24px',
    color: 'black',
    position: 'absolute',
    left: '20px',
    transition: 'all 0.3s ease',
  },
});

const SidebarText = chakra(Text, {
  baseStyle: {
    fontFamily: '"Karla Variable", sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    color: 'black',
    marginLeft: '60px',
    transition: 'opacity 0.3s ease',
  },
});

// Keep your existing PremiumBox component
const PremiumBox = ({ isCollapsed }) => (
  <Box
    bgGradient="linear(135deg, #FFD700, #FFA500)"
    borderRadius="20px"
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    padding={4}
    margin={4}
    position="relative"
    overflow="hidden"
    opacity={isCollapsed ? 0 : 1}
    transition="opacity 0.3s ease"
    pointerEvents={isCollapsed ? 'none' : 'auto'}
  >
    <Box
      position="absolute"
      top="-10px"
      right="-10px"
      width="80px"
      height="80px"
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.2)"
    />
    <Flex direction="column" alignItems="center" justifyContent="center">
      <Text fontWeight="bold" fontSize="18px" color="black" marginBottom={3}>
        Your access is limited
      </Text>
      <Button
        backgroundColor="white"
        color="black"
        borderRadius="full"
        fontWeight="bold"
        border="1px solid black"
        boxShadow="0 2px 0 0 black"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 0 0 black',
        }}
        _active={{
          transform: 'translateY(0)',
          boxShadow: '0 1px 0 0 black',
        }}
      >
        Go Premium! ✨
      </Button>
    </Flex>
  </Box>
);

const Sidebar = ({ isCollapsed, onToggleCollapse, activeItem, lastVisitedExam }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the sidebar to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: RxDashboard, path: '/' },
    { name: 'Providers', icon: GiCubeforce, path: '/providers' },
    { name: 'Exams', icon: RiStackLine, path: '/exams' },
    { name: 'Custom Exam', icon: GiSpellBook, path: '/custom-exam' },
    { name: 'Actual Exam', icon: LuRocket, path: '/actual-exam' },
  ];

  const handleItemClick = (path, name) => {
    if (name === 'Actual Exam') {
      if (lastVisitedExam) {
        navigate(`/actual-exam/${lastVisitedExam}`);
      } else {
        navigate('/actual-exam');
      }
    } else {
      navigate(path);
    }
  };

  if (!isVisible) {
    return (
      <Box 
        width={isCollapsed ? "80px" : "300px"}
        height="100vh"
        backgroundColor="#f2f2f3"
        transition="width 0.3s ease"
      />
    );
  }

  return (
    <Box
      backgroundColor="#f2f2f3"
      width={isCollapsed ? "80px" : "300px"}
      height="100vh"
      padding="20px 0"
      position="relative"
      transition="width 0.3s ease"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        marginBottom="60px"
        opacity={isCollapsed ? 0 : 1}
        transition="opacity 0.3s ease"
        pointerEvents={isCollapsed ? 'none' : 'auto'}
      >
        <Box display="flex" alignItems="center">
          <GiDreamCatcher size={32} color="black" />
          <Text
            marginLeft="8px"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="32px"
            fontWeight="bold"
            color="black"
            position="relative"
          >
            hiraya
            <sup style={{ fontSize: '8px', position: 'absolute', top: '15px', right: '-12px' }}>TM</sup>
          </Text>
        </Box>
      </Flex>
      <VStack spacing={2} align="stretch">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            onClick={() => handleItemClick(item.path, item.name)}
            position="relative"
            zIndex={1}
          >
            <Box
              position="absolute"
              top="-3px"
              left={0}
              right={0}
              bottom="-3px"
              backgroundColor={activeItem === item.name ? '#b3ebf2' : 'transparent'}
              borderRadius="0 20px 20px 0"
              borderTop={activeItem === item.name ? '1px solid black' : 'none'}
              borderRight={activeItem === item.name ? '1px solid black' : 'none'}
              borderBottom={activeItem === item.name ? '1px solid black' : 'none'}
              boxShadow={activeItem === item.name ? '0 4px 0 0 black' : 'none'}
              zIndex={-1}
            />
            <SidebarIcon as={item.icon} />
            <SidebarText
              fontWeight={activeItem === item.name ? 700 : 500}
              opacity={isCollapsed ? 0 : 1}
              pointerEvents={isCollapsed ? 'none' : 'auto'}
            >
              {item.name}
            </SidebarText>
          </SidebarItem>
        ))}
      </VStack>
      <Box position="absolute" bottom="80px" left="0" right="0">
        <PremiumBox isCollapsed={isCollapsed} />
      </Box>
      <SidebarItem
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        zIndex={1}
        _hover={{
          '& > *': {
            color: 'rgb(226, 18, 18)',
          },
          transform: 'translateY(-2px)',
        }}
      >
        <SidebarIcon
          as={LuLogOut}
          color="gray.500"
          transition="color 0.3s ease"
        />
        <SidebarText
          color="gray.500"
          transition="color 0.3s ease, opacity 0.3s ease"
          opacity={isCollapsed ? 0 : 1}
          pointerEvents={isCollapsed ? 'none' : 'auto'}
        >
          Logout
        </SidebarText>
      </SidebarItem>
      <Button
        position="absolute"
        top="24px"
        right="-30px"
        size="sm"
        width="14px"
        height="32px"
        borderRadius="0 16px 16px 0"
        onClick={onToggleCollapse}
        zIndex={2}
        backgroundColor="#f2f2f3"
        border="1px solid"
        borderColor="gray.300"
        borderLeft="none"
        _hover={{
          backgroundColor: "gray.200",
        }}
        _active={{
          backgroundColor: "gray.300",
        }}
        transition="background-color 0.2s"
        padding={0}
      >
        <Icon as={isCollapsed ? LuChevronRight : LuChevronLeft} fontSize="12px" />
      </Button>
    </Box>
  );
};

export default Sidebar;