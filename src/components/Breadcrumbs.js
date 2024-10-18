import React from 'react';
import { Flex, Text, Link, Tooltip } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumbs = ({ items }) => {
  return (
    <Flex align="center" ml={4}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRightIcon mx={2} color="gray.500" />}
          {item.isCurrentPage ? (
            <Tooltip label={item.label} aria-label="Full breadcrumb text">
              <Text
                color="gray.500"
                fontWeight="500"
                fontSize="16px"
                maxWidth="200px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {item.label}
              </Text>
            </Tooltip>
          ) : (
            <Link
              href={item.href}
              color="blue.500"
              fontWeight="500"
              fontSize="16px"
              _hover={{ textDecoration: 'underline' }}
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumbs;