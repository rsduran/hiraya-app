import React, { useRef, useEffect, useState } from 'react';
import { Flex, Text, Link, Tooltip } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumbs = ({ items }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [shouldTruncate, setShouldTruncate] = useState({});

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        let totalWidth = 0;
        const newShouldTruncate = {};

        // Calculate the width of all items
        itemRefs.current.forEach((itemRef, index) => {
          if (itemRef) {
            const itemWidth = itemRef.offsetWidth;
            const itemScrollWidth = itemRef.scrollWidth;
            totalWidth += itemWidth;
            
            // Check if this specific item is truncated
            if (itemScrollWidth > itemWidth) {
              newShouldTruncate[index] = true;
            }
          }
        });

        // If total width exceeds container width, start truncating from the end
        if (totalWidth > container.offsetWidth) {
          let availableWidth = container.offsetWidth;
          for (let i = items.length - 1; i >= 0; i--) {
            const itemRef = itemRefs.current[i];
            if (itemRef) {
              if (availableWidth - itemRef.offsetWidth < 0) {
                newShouldTruncate[i] = true;
              } else {
                availableWidth -= itemRef.offsetWidth;
              }
            }
          }
        }

        setShouldTruncate(newShouldTruncate);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]);

  const renderItem = (item, index) => {
    const content = (
      <Text
        color={item.isCurrentPage ? "gray.500" : "blue.500"}
        fontWeight="500"
        fontSize="16px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        flexShrink={1}
        minWidth={0}
        ref={el => itemRefs.current[index] = el}
        as={item.isCurrentPage ? "span" : Link}
        href={item.isCurrentPage ? undefined : item.href}
        _hover={item.isCurrentPage ? undefined : { textDecoration: 'underline' }}
      >
        {item.label}
      </Text>
    );

    return shouldTruncate[index] ? (
      <Tooltip key={index} label={item.label} aria-label="Full breadcrumb text">
        {content}
      </Tooltip>
    ) : content;
  };

  return (
    <Flex align="center" ml={4} ref={containerRef} overflow="hidden">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRightIcon mx={2} color="gray.500" flexShrink={0} />}
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumbs;