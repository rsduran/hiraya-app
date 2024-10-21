import React, { useRef, useEffect, useState } from 'react';
import { Flex, Text, Link, Tooltip } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumbs = ({ items }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [itemWidths, setItemWidths] = useState([]);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const availableWidth = container.offsetWidth;
        const newItemWidths = itemRefs.current.map(ref => ref ? ref.offsetWidth : 0);
        
        let totalWidth = newItemWidths.reduce((sum, width, index) => sum + width + (index > 0 ? 16 : 0), 0);
        
        if (totalWidth > availableWidth) {
          const middleIndex = Math.floor(items.length / 2);
          let i = middleIndex;
          let j = middleIndex;
          
          while (totalWidth > availableWidth && (i > 0 || j < items.length - 1)) {
            if (i > 0) {
              totalWidth -= newItemWidths[i] - 50; // 50px for truncated item
              newItemWidths[i] = 50;
              i--;
            }
            if (j < items.length - 1 && totalWidth > availableWidth) {
              totalWidth -= newItemWidths[j] - 50;
              newItemWidths[j] = 50;
              j++;
            }
          }
        }
        
        setItemWidths(newItemWidths);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]);

  const renderItem = (item, index) => {
    const isTruncated = itemWidths[index] === 50;
    
    const content = (
      <Text
        color={item.isCurrentPage ? "gray.500" : "blue.500"}
        fontWeight="500"
        fontSize="16px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        maxWidth={`${itemWidths[index]}px`}
        ref={el => itemRefs.current[index] = el}
        as={item.isCurrentPage ? "span" : Link}
        href={item.isCurrentPage ? undefined : item.href}
        _hover={item.isCurrentPage ? undefined : { textDecoration: 'underline' }}
      >
        {isTruncated ? item.label.slice(0, 3) + '...' : item.label}
      </Text>
    );

    return isTruncated ? (
      <Tooltip key={index} label={item.label} aria-label="Full breadcrumb text">
        {content}
      </Tooltip>
    ) : content;
  };

  return (
    <Flex align="center" ref={containerRef} overflow="hidden" width="100%">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRightIcon mx={1} color="gray.500" flexShrink={0} boxSize={3} />}
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumbs;