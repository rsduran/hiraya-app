import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Flex, chakra, Button, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { GiDreamCatcher, GiCubeforce, GiSpellBook } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { RiStackLine } from 'react-icons/ri';
import { LuRocket, LuLogOut, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import '@fontsource-variable/karla/wght.css';
import '@fontsource/space-grotesk/700.css';
import { useNavigate } from 'react-router-dom';

// Chakra components with theme-aware styling
const SidebarItem = chakra(Flex, {
  baseStyle: props => ({
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
      backgroundColor: props.colorMode === 'light'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(255, 255, 255, 0.1)',
    },
  }),
});

const SidebarIcon = chakra(Box, {
  baseStyle: props => ({
    fontSize: '24px',
    color: props.colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark',
    position: 'absolute',
    left: '20px',
    transition: 'all 0.3s ease',
  }),
});

const SidebarText = chakra(Text, {
  baseStyle: props => ({
    fontFamily: 'body',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    color: props.colorMode === 'light' ? 'brand.text.light' : 'brand.text.dark',
    marginLeft: '60px',
    transition: 'opacity 0.3s ease',
  }),
});

// Convert PremiumBox to a proper React component
const PremiumBox = React.memo(({ isCollapsed }) => {
  const borderColor = useColorModeValue('brand.border.light', 'brand.border.dark');
  const boxShadow = useColorModeValue(
    '0 4px 0 0 black',
    '0 4px 0 0 rgba(255, 255, 255, 0.2)'
  );
  const textColor = useColorModeValue('brand.text.light', 'brand.text.dark');
  const buttonBg = useColorModeValue('white', 'brand.surface.dark');
  const premiumGradient = useColorModeValue(
    'linear(135deg, #FFD700, #FFA500)',
    'linear(135deg, #B38600, #804000)'
  );

  return (
    <Box
      bgGradient={premiumGradient}
      borderRadius="20px"
      border="1px solid"
      borderColor={borderColor}
      boxShadow={boxShadow}
      padding={4}
      margin={4}
      position="relative"
      overflow="hidden"
      opacity={isCollapsed ? 0 : 1}
      transition="all 0.3s ease"
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
        <Text fontWeight="bold" fontSize="18px" color={textColor} marginBottom={3}>
          Your access is limited
        </Text>
        <Button
          variant="solid"
          backgroundColor={buttonBg}
          color={textColor}
          borderRadius="full"
          fontWeight="bold"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={boxShadow}
          _hover={{
            transform: 'translateY(-2px)',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
        >
          Go Premium! ✨
        </Button>
      </Flex>
    </Box>
  );
});

const Sidebar = ({ isCollapsed, onToggleCollapse, activeItem, lastVisitedExam }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { colorMode } = useColorMode();

  // Move all useColorModeValue calls to the top level
  const bgColor = useColorModeValue('brand.surface.light', 'brand.surface.dark');
  const textColor = useColorModeValue('brand.text.light', 'brand.text.dark');
  const borderColor = useColorModeValue('brand.border.light', 'brand.border.dark');
  const activeItemBg = useColorModeValue('brand.secondary.light', 'brand.secondary.dark');
  const boxShadow = useColorModeValue(
    '0 4px 0 0 black',
    '0 4px 0 0 rgba(255, 255, 255, 0.2)'
  );
  const logoutColor = useColorModeValue('gray.500', 'gray.400');
  const hoverBg = useColorModeValue('brand.secondary.light', 'brand.secondary.dark');
  const activeBg = useColorModeValue('brand.primary.light', 'brand.primary.dark');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
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
    if (name === 'Actual Exam' && lastVisitedExam) {
      navigate(`/actual-exam/${lastVisitedExam}`);
    } else {
      navigate(path);
    }
  };

  const sidebarContent = (
    <Box
      backgroundColor={bgColor}
      width={isCollapsed ? "80px" : "300px"}
      height="100vh"
      padding="20px 0"
      position="relative"
      transition="all 0.3s ease"
    >
      {/* Logo section */}
      <Flex
        alignItems="center"
        justifyContent="center"
        marginBottom="60px"
        opacity={isCollapsed ? 0 : 1}
        transition="opacity 0.3s ease"
        pointerEvents={isCollapsed ? 'none' : 'auto'}
      >
        <Box display="flex" alignItems="center">
          <GiDreamCatcher size={32} color={colorMode === 'light' ? 'black' : 'white'} />
          <Text
            marginLeft="8px"
            fontFamily="heading"
            fontSize="32px"
            fontWeight="bold"
            color={textColor}
            position="relative"
            transition="color 0.2s"
          >
            hiraya
            <sup style={{ 
              fontSize: '8px', 
              position: 'absolute', 
              top: '15px', 
              right: '-12px',
              color: textColor 
            }}>TM</sup>
          </Text>
        </Box>
      </Flex>

      {/* Menu Items */}
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
              backgroundColor={activeItem === item.name ? activeItemBg : 'transparent'}
              borderRadius="0 20px 20px 0"
              borderTop={activeItem === item.name ? `1px solid ${borderColor}` : 'none'}
              borderRight={activeItem === item.name ? `1px solid ${borderColor}` : 'none'}
              borderBottom={activeItem === item.name ? `1px solid ${borderColor}` : 'none'}
              boxShadow={activeItem === item.name ? boxShadow : 'none'}
              zIndex={-1}
              transition="all 0.2s"
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

      {/* Premium Box */}
      <Box position="absolute" bottom="80px" left="0" right="0">
        <PremiumBox isCollapsed={isCollapsed} />
      </Box>

      {/* Logout Button */}
      <SidebarItem
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        zIndex={1}
        _hover={{
          '& > *': {
            color: 'red.500',
          },
          transform: 'translateY(-2px)',
        }}
      >
        <SidebarIcon as={LuLogOut} color={logoutColor} />
        <SidebarText
          color={logoutColor}
          opacity={isCollapsed ? 0 : 1}
          pointerEvents={isCollapsed ? 'none' : 'auto'}
        >
          Logout
        </SidebarText>
      </SidebarItem>

      {/* Collapse Toggle Button */}
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
        backgroundColor={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderLeft="none"
        color={textColor}
        _hover={{ backgroundColor: hoverBg }}
        _active={{ backgroundColor: activeBg }}
        transition="all 0.2s"
        padding={0}
      >
        <Icon 
          as={isCollapsed ? LuChevronRight : LuChevronLeft} 
          fontSize="12px"
        />
      </Button>
    </Box>
  );

  if (!isVisible) {
    return (
      <Box 
        width={isCollapsed ? "80px" : "300px"}
        height="100vh"
        backgroundColor={bgColor}
        transition="all 0.3s ease"
      />
    );
  }

  return sidebarContent;
};

export default Sidebar;