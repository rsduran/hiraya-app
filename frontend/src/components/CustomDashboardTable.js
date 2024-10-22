import React, { useState, useMemo } from "react";
import { Box, Flex, Text, Button, VStack, Input, useColorMode } from "@chakra-ui/react";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const CustomCheckbox = ({ isChecked, isIndeterminate, onChange }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Box
      as="button"
      width="20px"
      height="20px"
      borderRadius="4px"
      border="2px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      backgroundColor={isChecked 
        ? colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"
        : colorMode === 'light' ? "brand.background.light" : "brand.background.dark"
      }
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onChange}
      _hover={{ 
        backgroundColor: isChecked
          ? colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light"
          : colorMode === 'light' ? "brand.secondary.light" : "brand.secondary.dark"
      }}
      transition="all 0.2s"
      position="relative"
    >
      {isIndeterminate ? (
        <Box
          width="10px"
          height="2px"
          backgroundColor={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      ) : (
        isChecked && (
          <Box
            width="10px"
            height="10px"
            borderRadius="2px"
            backgroundColor={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          />
        )
      )}
    </Box>
  );
};

const CustomButton = ({
  children,
  onClick,
  backgroundColor,
  hoverBackgroundColor,
  isDisabled,
  borderColor,
  ...props
}) => {
  const { colorMode } = useColorMode();
  
  return (
    <Button
      onClick={onClick}
      height="40px"
      paddingLeft="16px"
      paddingRight="16px"
      backgroundColor={backgroundColor || (colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark")}
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      fontWeight={700}
      fontSize="14px"
      borderRadius="full"
      border="1px solid"
      borderColor={borderColor || (colorMode === 'light' ? "brand.border.light" : "brand.border.dark")}
      boxShadow={isDisabled ? "none" : colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
      }
      _hover={{
        backgroundColor: isDisabled 
          ? backgroundColor 
          : (hoverBackgroundColor || (colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light")),
        transform: isDisabled ? "none" : "translateY(2px)",
        boxShadow: isDisabled ? "none" : colorMode === 'light'
          ? "0 2px 0 0 black"
          : "0 2px 0 0 rgba(255, 255, 255, 0.2)",
      }}
      _active={{
        transform: isDisabled ? "none" : "translateY(4px)",
        boxShadow: "none",
      }}
      transition="all 0.2s"
      opacity={isDisabled ? 0.5 : 1}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
};

const TableHeader = ({ children, onClick, isSortable, sortDirection }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      cursor={isSortable ? "pointer" : "default"}
      onClick={onClick}
    >
      <Text
        fontFamily="Karla Variable"
        fontWeight={700}
        fontSize="12px"
        lineHeight="16px"
        color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        textTransform="uppercase"
        textAlign="center"
      >
        {children}
      </Text>
      {isSortable && (
        <Box marginLeft={1} color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
          {sortDirection === "asc" ? (
            <PiSortAscending size={16} />
          ) : (
            <PiSortDescending size={16} />
          )}
        </Box>
      )}
    </Flex>
  );
};

// First let's modify TableCell component
const TableCell = ({ children, isLink, examId, ...props }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (isLink) {
    return (
      <Text
        fontFamily="Karla Variable"
        fontWeight={700}
        fontSize="12px"
        lineHeight="16px"
        color={colorMode === 'light' ? "brand.primary.light" : "brand.primary.dark"}
        textAlign="center"
        cursor="pointer"
        _hover={{
          textDecoration: "underline",
          color: colorMode === 'light' ? "brand.primary.dark" : "brand.primary.light",
        }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/actual-exam/${examId}`);
        }}
        {...props}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text
      fontFamily="Karla Variable"
      fontWeight={700}
      fontSize="12px"
      lineHeight="16px"
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      textAlign="center"
      {...props}
    >
      {children}
    </Text>
  );
};

// Modified StatusBadge to support dark mode gradients
const StatusBadge = ({ status }) => {
  const { colorMode } = useColorMode();
  let bgGradient;
  let textColor = colorMode === 'light' ? "brand.text.light" : "brand.text.dark";
  
  switch (status) {
    case "Passed":
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #4CAF50, #8BC34A)"  // Light mode: Bright green gradient
        : "linear(to-r, #2E673F, #4A6F2E)"; // Dark mode: Darker green gradient
      break;
    case "Failed":
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #FF5252, #FF8A80)"  // Light mode: Bright red gradient
        : "linear(to-r, #992F2F, #994D4D)"; // Dark mode: Darker red gradient
      break;
    case "Not Attempted":
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #9E9E9E, #BDBDBD)"  // Light mode: Grey gradient
        : "linear(to-r, #4A4A4A, #666666)"; // Dark mode: Darker grey gradient
      break;
    default:
      bgGradient = colorMode === 'light'
        ? "linear(to-r, #FFD54F, #FFF176)"  // Light mode: Bright yellow gradient
        : "linear(to-r, #997F30, #998E47)"; // Dark mode: Darker yellow gradient
  }
  
  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      paddingTop={0}
      paddingBottom={0}
      borderRadius="full"
      display="inline-block"
      alignSelf="center"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      bgGradient={bgGradient}
    >
      <Text fontSize="14px" fontWeight="500" color={textColor}>
        {status}
      </Text>
    </Box>
  );
};

// Modified CustomProgressIndicator with theme colors
const CustomProgressIndicator = ({ value }) => {
  const { colorMode } = useColorMode();
  
  const getColor = (value) => {
    if (value < 50) return colorMode === 'light' 
      ? "gradient.error.light"
      : "gradient.error.dark";
    if (value < 75) return colorMode === 'light'
      ? "gradient.warning.light"
      : "gradient.warning.dark";
    return colorMode === 'light'
      ? "gradient.success.light"
      : "gradient.success.dark";
  };

  // The gradient colors based on the theme
  const getGradientColors = (gradientKey) => {
    const gradients = {
      'gradient.error.light': ['#FF5252', '#FF8A80'],
      'gradient.error.dark': ['#992F2F', '#994D4D'],
      'gradient.warning.light': ['#FFD54F', '#FFF176'],
      'gradient.warning.dark': ['#997F30', '#998E47'],
      'gradient.success.light': ['#4CAF50', '#8BC34A'],
      'gradient.success.dark': ['#2E673F', '#4A6F2E']
    };
    
    return gradients[gradientKey] || gradients['gradient.success.light'];
  };

  const gradientColors = getGradientColors(getColor(value));

  return (
    <Box position="relative" width="50px" height="50px">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        borderRadius="50%"
        border="4px solid"
        borderColor={colorMode === 'light' ? "#E0E0E0" : "#404040"}
      />
      <Box
        as="svg"
        viewBox="0 0 36 36"
        width="100%"
        height="100%"
        position="absolute"
      >
        <defs>
          <linearGradient
            id={`gradient-${value}`}
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="100%" stopColor={gradientColors[1]} />
          </linearGradient>
        </defs>
        <path
          d={`M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831`}
          fill="none"
          stroke={`url(#gradient-${value})`}
          strokeWidth="4"
          strokeDasharray={`${value}, 100`}
        />
      </Box>
      <Flex
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Text 
          fontSize="12px" 
          fontWeight="bold"
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        >
          {value}%
        </Text>
      </Flex>
    </Box>
  );
};

const ProviderGroup = ({
  provider,
  exams,
  selectedRows,
  handleSelectRow,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode } = useColorMode();

  const allProviderExamsSelected = useMemo(() => {
    const providerExamIds = exams.map((exam) => exam.id);
    return providerExamIds.every((id) => selectedRows.includes(id));
  }, [exams, selectedRows]);

  const someProviderExamsSelected = useMemo(() => {
    const providerExamIds = exams.map((exam) => exam.id);
    return (
      providerExamIds.some((id) => selectedRows.includes(id)) &&
      !allProviderExamsSelected
    );
  }, [exams, selectedRows, allProviderExamsSelected]);

  const toggleGroup = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleProviderSelect = (e) => {
    e.stopPropagation();
    const providerExamIds = exams.map((exam) => exam.id);

    if (allProviderExamsSelected) {
      handleSelectRow(providerExamIds, false);
    } else {
      handleSelectRow(providerExamIds, true);
    }
  };

  const formatNumber = (number, decimals = 2) => {
    if (number === null || number === undefined) return "0.00";
    return Number(number).toFixed(decimals);
  };

  return (
    <Box
      width="100%"
      backgroundColor={colorMode === 'light' ? "brand.surface.light" : "brand.surface.dark"}
      borderRadius="10px"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      position="relative"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={4}
        backgroundColor={colorMode === 'light' ? "brand.secondary.light" : "brand.secondary.dark"}
        _hover={{ 
          backgroundColor: colorMode === 'light' 
            ? "rgba(179, 235, 242, 0.8)" 
            : "rgba(38, 94, 109, 0.8)" 
        }}
        cursor="pointer"
        onClick={toggleGroup}
      >
        <Flex alignItems="center" flex={1}>
          <Box
            width="40px"
            textAlign="center"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomCheckbox
              isChecked={allProviderExamsSelected}
              isIndeterminate={someProviderExamsSelected}
              onChange={handleProviderSelect}
            />
          </Box>
          <Text 
            fontSize="18px" 
            fontWeight="700" 
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            flex={1}
          >
            {provider}
          </Text>
        </Flex>
        <Box color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}>
          {isOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
        </Box>
      </Flex>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <VStack spacing={0} align="stretch">
              {exams.map((item, index) => (
                <Flex
                  key={item.id}
                  borderTop={index === 0 
                    ? `1px solid ${colorMode === 'light' 
                      ? "rgba(226, 232, 240, 0.8)" 
                      : "rgba(64, 64, 64, 0.8)"}`
                    : "none"
                  }
                  borderBottom={`1px solid ${colorMode === 'light'
                    ? "rgba(226, 232, 240, 0.8)"
                    : "rgba(64, 64, 64, 0.8)"}`
                  }
                  padding={4}
                  backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.background.dark"}
                  _hover={{ 
                    backgroundColor: colorMode === 'light' 
                      ? "brand.surface.light" 
                      : "brand.surface.dark" 
                  }}
                  transition="background-color 0.2s"
                  alignItems="center"
                >
                  <Box width="40px" textAlign="center">
                    <CustomCheckbox
                      isChecked={selectedRows.includes(item.id)}
                      onChange={() =>
                        handleSelectRow(
                          [item.id],
                          !selectedRows.includes(item.id)
                        )
                      }
                    />
                  </Box>
                  <Box flex={1}>
                    <TableCell isLink examId={item.id}>
                      {item.exam || "Untitled Exam"}
                    </TableCell>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.examType || "Actual"}</TableCell>
                  </Box>
                  <Box flex={1}>
                    <TableCell>
                      Attempt {item.attempts || 0}
                      <br />
                      Avg: {formatNumber(item.averageScore)}%
                    </TableCell>
                  </Box>
                  <Box flex={1} display="flex" justifyContent="center">
                    <CustomProgressIndicator value={item.progress || 0} />
                  </Box>
                  <Box flex={1}>
                    <Flex direction="column" alignItems="center">
                      <TableCell>
                        {`${item.latestGrade?.score || 0}/${
                          item.latestGrade?.total || 100
                        }`}
                      </TableCell>
                      <Box marginTop={1}>
                        <StatusBadge status={item.status || "Not Attempted"} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.updated || "Not started"}</TableCell>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const CustomDashboardTableComponent = ({
  data,
  onDeleteSelected,
  onDeleteAll,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "updated",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode } = useColorMode();
  const itemsPerPage = 2;

  const handleSelectAll = () => {
    const allIds = data.flatMap((provider) =>
      provider.exams.map((exam) => exam.id)
    );

    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectRow = (ids, isSelected) => {
    setSelectedRows((prev) => {
      if (Array.isArray(ids)) {
        if (isSelected) {
          const newSelection = [...new Set([...prev, ...ids])];
          const allPossibleIds = data.flatMap((provider) =>
            provider.exams.map((exam) => exam.id)
          );
          setSelectAll(newSelection.length === allPossibleIds.length);
          return newSelection;
        } else {
          const newSelection = prev.filter((id) => !ids.includes(id));
          setSelectAll(false);
          return newSelection;
        }
      } else {
        const newSelection = prev.includes(ids)
          ? prev.filter((id) => id !== ids)
          : [...prev, ids];

        const allPossibleIds = data.flatMap((provider) =>
          provider.exams.map((exam) => exam.id)
        );
        setSelectAll(newSelection.length === allPossibleIds.length);
        return newSelection;
      }
    });
  };

  const processedData = useMemo(() => {
    // Flatten the provider structure
    const flattenedData = data.flatMap((provider) =>
      provider.exams.map((exam) => ({
        ...exam,
        provider: provider.name,
      }))
    );

    // Sort the data
    let sortedData = [...flattenedData];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (sortConfig.key === "updated") {
          // Sort by timestamp for 'updated' column
          const aTime = new Date(a.timestamp || 0).getTime();
          const bTime = new Date(b.timestamp || 0).getTime();
          return sortConfig.direction === "asc" ? aTime - bTime : bTime - aTime;
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    // Filter based on search term
    const filteredData = sortedData.filter(
      (item) =>
        item.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group by provider
    return filteredData.reduce((acc, item) => {
      if (!acc[item.provider]) {
        acc[item.provider] = [];
      }
      acc[item.provider].push(item);
      return acc;
    }, {});
  }, [data, sortConfig, searchTerm]);

  const providerList = Object.keys(processedData);
  const totalPages = Math.ceil(providerList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProviderList = providerList.slice(startIndex, endIndex);

  return (
    <Box
      borderRadius="12px"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      padding={6}
      overflowY="scroll"
      maxHeight="600px"
      backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.background.dark"}
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Text
          fontFamily="Karla Variable"
          fontWeight={700}
          fontSize="16px"
          lineHeight="24px"
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        >
          Your Exam Progress
        </Text>
        <Flex>
          <Input
            placeholder="Search exams..."
            size="md"
            width="250px"
            marginRight={4}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.background.dark"}
            borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
            color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
            _placeholder={{
              color: colorMode === 'light' 
                ? "rgba(0, 0, 0, 0.5)" 
                : "rgba(255, 255, 255, 0.5)"
            }}
          />
          <CustomButton
            onClick={() => onDeleteSelected(selectedRows)}
            backgroundColor="transparent"
            hoverBackgroundColor={colorMode === 'light' ? "#FFE5E5" : "#4D0000"}
            borderColor={colorMode === 'light' ? "#FF3333" : "#FF6666"}
            marginRight={4}
            isDisabled={selectedRows.length === 0}
          >
            Delete Selected
          </CustomButton>
          <CustomButton
            onClick={onDeleteAll}
            backgroundColor={colorMode === 'light' ? "#FF3333" : "#FF6666"}
            hoverBackgroundColor={colorMode === 'light' ? "#FF0000" : "#CC0000"}
          >
            Delete All
          </CustomButton>
        </Flex>
      </Flex>
      <Box
        borderRadius="12px"
        border="1px solid"
        borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
        boxShadow={colorMode === 'light' 
          ? "0 4px 0 0 black" 
          : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
        }
        overflow="hidden"
      >
        <Box overflowX="auto">
          <Box minWidth="1200px">
            {/* Table Header */}
            <Flex
              backgroundColor={colorMode === 'light' ? "brand.surface.light" : "brand.surface.dark"}
              borderBottom="1px solid"
              borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
              padding={4}
              alignItems="center"
            >
              <Box width="40px" textAlign="center">
                <CustomCheckbox
                  isChecked={selectAll}
                  onChange={handleSelectAll}
                />
              </Box>
              <Box flex={1}>
                <TableHeader>Exam</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Type</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Attempts</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Progress</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Latest Grade</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader
                  isSortable
                  onClick={() => handleSort("updated")}
                  sortDirection={
                    sortConfig.key === "updated"
                      ? sortConfig.direction
                      : undefined
                  }
                >
                  Updated
                </TableHeader>
              </Box>
            </Flex>

            {/* Table Body */}
            {paginatedProviderList.map((provider) => (
              <ProviderGroup
                key={provider}
                provider={provider}
                exams={processedData[provider]}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
                handleSort={handleSort}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Pagination */}
      <Box 
        marginTop={4}
        backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.background.dark"}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

const CustomDashboardTable = React.memo(CustomDashboardTableComponent);
export default CustomDashboardTable;