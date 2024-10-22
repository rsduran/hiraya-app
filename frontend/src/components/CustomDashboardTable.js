import React, { useState, useMemo } from "react";
import { Box, Flex, Text, Button, VStack, Input } from "@chakra-ui/react";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const CustomCheckbox = ({ isChecked, isIndeterminate, onChange }) => (
  <Box
    as="button"
    width="20px"
    height="20px"
    borderRadius="4px"
    border="2px solid black"
    backgroundColor={isChecked ? "#00bfff" : "white"}
    display="flex"
    alignItems="center"
    justifyContent="center"
    onClick={onChange}
    _hover={{ backgroundColor: isChecked ? "#00a6d6" : "#e6f7f9" }}
    transition="all 0.2s"
    position="relative"
  >
    {isIndeterminate ? (
      <Box
        width="10px"
        height="2px"
        backgroundColor={isChecked ? "white" : "black"}
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
          backgroundColor="white"
        />
      )
    )}
  </Box>
);

const CustomButton = ({
  children,
  onClick,
  backgroundColor,
  hoverBackgroundColor,
  isDisabled,
  borderColor,
  ...props
}) => (
  <Button
    onClick={onClick}
    height="40px"
    paddingLeft="16px"
    paddingRight="16px"
    backgroundColor={backgroundColor}
    color="black"
    fontWeight={700}
    fontSize="14px"
    borderRadius="full"
    border="1px solid"
    borderColor={borderColor || "black"}
    boxShadow={isDisabled ? "none" : "0 4px 0 0 black"}
    _hover={{
      backgroundColor: isDisabled ? backgroundColor : hoverBackgroundColor,
      transform: isDisabled ? "none" : "translateY(2px)",
      boxShadow: isDisabled ? "none" : "0 2px 0 0 black",
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

const TableHeader = ({ children, onClick, isSortable, sortDirection }) => (
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
      color="black"
      textTransform="uppercase"
      textAlign="center"
    >
      {children}
    </Text>
    {isSortable && (
      <Box marginLeft={1}>
        {sortDirection === "asc" ? (
          <PiSortAscending size={16} />
        ) : (
          <PiSortDescending size={16} />
        )}
      </Box>
    )}
  </Flex>
);

const TableCell = ({ children, isLink, examId, ...props }) => {
  const navigate = useNavigate();

  if (isLink) {
    return (
      <Text
        fontFamily="Karla Variable"
        fontWeight={700}
        fontSize="12px"
        lineHeight="16px"
        color="#00bfff"
        textAlign="center"
        cursor="pointer"
        _hover={{
          textDecoration: "underline",
          color: "#0095cc",
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
      color="black"
      textAlign="center"
      {...props}
    >
      {children}
    </Text>
  );
};

const StatusBadge = ({ status }) => {
  let bgGradient;
  let textColor = "black";

  switch (status) {
    case "Passed":
      bgGradient = "linear(to-r, #4CAF50, #8BC34A)";
      break;
    case "Failed":
      bgGradient = "linear(to-r, #FF5252, #FF8A80)";
      break;
    case "Not Attempted":
      bgGradient = "linear(to-r, #9E9E9E, #BDBDBD)";
      break;
    default:
      bgGradient = "linear(to-r, #FFD54F, #FFF176)";
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
      border="1px solid black"
      bgGradient={bgGradient}
    >
      <Text fontSize="14px" fontWeight="500" color={textColor}>
        {status}
      </Text>
    </Box>
  );
};

const CustomProgressIndicator = ({ value }) => {
  const getColor = (value) => {
    if (value < 50) return "linear(to-r, #FF5252, #FF8A80)";
    if (value < 75) return "linear(to-r, #FFD54F, #FFF176)";
    return "linear(to-r, #4CAF50, #8BC34A)";
  };

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
        borderColor="#E0E0E0"
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
            <stop offset="0%" stopColor={getColor(value).split(", ")[1]} />
            <stop
              offset="100%"
              stopColor={getColor(value).split(", ")[2].slice(0, -1)}
            />
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
        <Text fontSize="12px" fontWeight="bold">
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
      backgroundColor="#f2f2f3"
      borderRadius="10px"
      border="1px solid black"
      position="relative"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={4}
        backgroundColor="#e6f7f9"
        _hover={{ backgroundColor: "#d1f1f5" }}
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
          <Text fontSize="18px" fontWeight="700" color="black" flex={1}>
            {provider}
          </Text>
        </Flex>
        <Box>
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
                  borderTop={index === 0 ? "1px solid #E2E8F0" : "none"}
                  borderBottom="1px solid #E2E8F0"
                  padding={4}
                  backgroundColor="white"
                  _hover={{ backgroundColor: "#f8f8f8" }}
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
      border="1px solid black"
      padding={6}
      overflowY="scroll"
      maxHeight="600px"
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Text
          fontFamily="Karla Variable"
          fontWeight={700}
          fontSize="16px"
          lineHeight="24px"
          color="black"
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
            backgroundColor="white"
          />
          <CustomButton
            onClick={() => onDeleteSelected(selectedRows)}
            backgroundColor="transparent"
            hoverBackgroundColor="#FFE5E5"
            borderColor="#FF3333"
            marginRight={4}
            isDisabled={selectedRows.length === 0}
          >
            Delete Selected
          </CustomButton>
          <CustomButton
            onClick={onDeleteAll}
            backgroundColor="#FF3333"
            hoverBackgroundColor="#FF0000"
          >
            Delete All
          </CustomButton>
        </Flex>
      </Flex>
      <Box
        borderRadius="12px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        overflow="hidden"
      >
        <Box overflowX="auto">
          <Box minWidth="1200px">
            {/* Table Header */}
            <Flex
              backgroundColor="#f2f2f3"
              borderBottom="1px solid black"
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

const CustomDashboardTable = React.memo(CustomDashboardTableComponent);
export default CustomDashboardTable;
