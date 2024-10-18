import React from 'react';
import { Box, ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { IoPersonAddOutline } from 'react-icons/io5';
import { BsQuestionLg } from 'react-icons/bs';
import { PiSeal, PiSealFill, PiSealLight, PiShuffle } from 'react-icons/pi'; // Import PiSealLight
import { RxReset } from "react-icons/rx";

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
});

const IconBox = ({
  icon: Icon,
  bgColor = '#00bfff',
  size = '48px',
  containerType = 'box',
  withBorder = true,
  borderThickness = 1, // Changed to a number for calculations
  iconScale = 0.6,
  ...props
}) => {
  const iconSize = `${parseInt(size) * iconScale}px`;

  if (containerType === 'seal') {
    // Choose between PiSeal and PiSealLight based on border thickness
    const SealOutlineIcon = borderThickness <= 1 && PiSealLight ? PiSealLight : PiSeal;

    return (
      <Box position="relative" width={size} height={size} {...props}>
        {/* Filled Seal */}
        <PiSealFill size={size} color={bgColor} />
        {/* Border Seal */}
        {withBorder && (
          <Box
            as={SealOutlineIcon}
            size={size}
            color="black"
            position="absolute"
            top="0"
            left="0"
            style={{
              width: size,
              height: size,
            }}
            sx={{
              svg: {
                strokeWidth: borderThickness,
                stroke: 'black',
                fill: 'none',
              },
              path: {
                strokeWidth: borderThickness,
                stroke: 'black',
                fill: 'none',
              },
            }}
          />
        )}
        {/* Inner Icon */}
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          alignItems="center"
          justifyContent="center"
        >
          {Icon ? (
            <Icon size={iconSize} color="black" />
          ) : (
            <BsQuestionLg size={iconSize} color="black" />
          )}
        </Flex>
      </Box>
    );
  } else {
    // Original box with borderRadius
    return (
      <Flex
        width={size}
        height={size}
        bg={bgColor}
        borderRadius="8px"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {Icon ? (
          <Icon size={iconSize} color="black" />
        ) : (
          <BsQuestionLg size={iconSize} color="black" />
        )}
      </Flex>
    );
  }
};

const IconBoxExamples = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        gap={4}
        p={4}
        bg="gray.100"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
      >
        {/* Seals with Border - Varying border thickness */}
        <IconBox
          icon={PiShuffle}
          bgColor="#b3ebf2"
          size="64px"
          containerType="seal"
          withBorder={true}
          borderThickness={4}
          iconScale={0.4}
        />
        <IconBox
          icon={RxReset}
          bgColor="#00bfff"
          size="64px"
          containerType="seal"
          withBorder={true}
          borderThickness={4}
          iconScale={0.4}
        />
        <IconBox
          bgColor="#00bfff"
          size="64px"
          containerType="seal"
          withBorder={true}
          borderThickness={2}
          iconScale={0.4}
        />
        {/* Seals without Border */}
        <IconBox
          icon={MdEmail}
          bgColor="#00bfff"
          size="64px"
          containerType="seal"
          withBorder={false}
          iconScale={0.5}
        />
        <IconBox
          icon={IoPersonAddOutline}
          bgColor="#b3ebf2"
          size="64px"
          containerType="seal"
          withBorder={false}
          iconScale={0.5}
        />
        <IconBox
          bgColor="#00bfff"
          size="64px"
          containerType="seal"
          withBorder={false}
          iconScale={0.5}
        />
        {/* Original Box Examples */}
        <IconBox
          icon={MdEmail}
          bgColor="#00bfff"
          size="48px"
          iconScale={0.6}
        />
        <IconBox
          icon={IoPersonAddOutline}
          bgColor="#b3ebf2"
          size="48px"
          iconScale={0.6}
        />
        <IconBox bgColor="#00bfff" size="48px" iconScale={0.6} />
      </Flex>
    </ChakraProvider>
  );
};

export { IconBox, IconBoxExamples };
export default IconBoxExamples;
