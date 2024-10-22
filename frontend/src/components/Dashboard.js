import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useToast,
  Spinner,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { FaApple, FaAndroid, FaHeart, FaTimes } from "react-icons/fa";
import { IconBox } from "./IconBox";
import CustomDashboardTable from "./CustomDashboardTable";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { createCustomToast } from "./CustomToast";

const WelcomeComponent = ({ users, countries }) => (
  <Box
    width="100%"
    bgGradient="linear(to-r, #00bfff, #0080ff)"
    borderRadius={{ base: "10px", md: "20px" }}
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    padding={{ base: 4, md: 6 }}
    marginBottom={{ base: 4, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top={{ base: "-10px", md: "-20px" }}
      right={{ base: "-10px", md: "-20px" }}
      width={{ base: "100px", md: "150px" }}
      height={{ base: "100px", md: "150px" }}
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.1)"
    />
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack
        align={{ base: "center", md: "flex-start" }}
        spacing={2}
        marginBottom={{ base: 4, md: 0 }}
      >
        <Text
          fontSize={{ base: "24px", md: "32px" }}
          fontWeight="800"
          color="white"
          textAlign={{ base: "center", md: "left" }}
        >
          Welcome to Hiraya
        </Text>
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="500"
          color="white"
          textAlign={{ base: "center", md: "left" }}
        >
          Empowering your learning journey
        </Text>
      </VStack>
      <Flex>
        <Box marginRight={{ base: 4, md: 8 }} textAlign="center">
          <Text
            fontSize={{ base: "32px", md: "40px" }}
            fontWeight="800"
            color="white"
          >
            {users}M+
          </Text>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="600"
            color="white"
          >
            Users
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontSize={{ base: "32px", md: "40px" }}
            fontWeight="800"
            color="white"
          >
            {countries}+
          </Text>
          <Text
            fontSize={{ base: "14px", md: "16px" }}
            fontWeight="600"
            color="white"
          >
            Countries
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Box>
);

const CustomButton = ({
  children,
  leftIcon,
  backgroundColor,
  color,
  _hover,
  ...props
}) => (
  <Button
    height="48px"
    fontSize={{ base: "14px", md: "16px" }}
    paddingLeft={{ base: "16px", md: "24px" }}
    paddingRight={{ base: "16px", md: "24px" }}
    backgroundColor={backgroundColor || "white"}
    color={color || "black"}
    borderRadius="full"
    border="1px solid black"
    fontWeight={700}
    textTransform="uppercase"
    transition="0.3s"
    boxShadow="0 4px 0 0 black"
    _hover={{
      transform: "translateY(2px)",
      boxShadow: "0 2px 0 0 black",
      ..._hover,
    }}
    _active={{
      transform: "translateY(4px)",
      boxShadow: "none",
    }}
    leftIcon={leftIcon}
    {...props}
  >
    {children}
  </Button>
);

const CloseButton = ({ onClick }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="button"
      onClick={onClick}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w="24px"
      h="24px"
      bg="transparent"
      _focus={{ boxShadow: "none" }}
      color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
      borderRadius="50%"
    >
      <FaTimes size="16px" />
    </Box>
  );
};

const MobileAppsComing = ({ onClose }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      width="100%"
      bgGradient={
        colorMode === "light"
          ? "linear(to-br, #FFB347, #ffcc33)" // Original orange gradient
          : "linear(to-br, #B37F32, #B38F24)" // Darker orange gradient for dark mode
      }
      borderRadius={{ base: "10px", md: "20px" }}
      border="1px solid black"
      boxShadow="0 4px 0 0 black"
      padding={{ base: 4, md: 6 }}
      marginBottom={{ base: 4, md: 8 }}
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top={2} right={2} zIndex={1}>
        <CloseButton onClick={onClose} />
      </Box>
      <Box
        position="absolute"
        bottom={{ base: "-15px", md: "-30px" }}
        left={{ base: "-15px", md: "-30px" }}
        width={{ base: "100px", md: "150px" }}
        height={{ base: "100px", md: "150px" }}
        borderRadius="full"
        backgroundColor="rgba(255, 255, 255, 0.1)"
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <VStack
          align={{ base: "center", md: "flex-start" }}
          spacing={2}
          marginBottom={{ base: 4, md: 0 }}
        >
          <Text
            fontSize={{ base: "24px", md: "28px" }}
            fontWeight="800"
            color="black"
            textAlign={{ base: "center", md: "left" }}
          >
            Mobile Apps Coming Soon
          </Text>
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            fontWeight="500"
            color="black"
            textAlign={{ base: "center", md: "left" }}
          >
            Your learning journey, now in your pocket!
          </Text>
        </VStack>
        <Flex
          flexDirection={{ base: "column", sm: "row" }}
          marginTop={{ base: 4, md: 0 }}
        >
          <CustomButton
            leftIcon={<FaApple />}
            marginBottom={{ base: 2, sm: 0 }}
            marginRight={{ base: 0, sm: 4 }}
          >
            iOS
          </CustomButton>
          <CustomButton leftIcon={<FaAndroid />}>Android</CustomButton>
        </Flex>
      </Flex>
    </Box>
  );
};

const SupportDevelopers = ({ onClose }) => (
  <Box
    width="100%"
    bgGradient="linear(to-r, #8BC34A, #4CAF50)"
    borderRadius={{ base: "10px", md: "20px" }}
    border="1px solid black"
    boxShadow="0 4px 0 0 black"
    padding={{ base: 4, md: 6 }}
    marginBottom={{ base: 4, md: 8 }}
    position="relative"
    overflow="hidden"
  >
    <Box position="absolute" top={2} right={2} zIndex={1}>
      <CloseButton onClick={onClose} />
    </Box>
    <Box
      position="absolute"
      top={{ base: "-15px", md: "-30px" }}
      right={{ base: "-15px", md: "-30px" }}
      width={{ base: "100px", md: "150px" }}
      height={{ base: "100px", md: "150px" }}
      borderRadius="full"
      backgroundColor="rgba(255, 255, 255, 0.1)"
    />
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack align={{ base: "center", md: "flex-start" }} spacing={2} flex="1">
        <Text
          fontSize={{ base: "24px", md: "28px" }}
          fontWeight="800"
          color="white"
          textAlign={{ base: "center", md: "left" }}
        >
          Support the Developers
        </Text>
        <Text
          fontSize={{ base: "16px", md: "18px" }}
          fontWeight="500"
          color="white"
          textAlign={{ base: "center", md: "left" }}
        >
          Help us keep Hiraya ad-free and running 24/7, 365 days a year
        </Text>
        <Text
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="500"
          color="white"
          textAlign={{ base: "center", md: "left" }}
        >
          Your support helps cover recurring costs and keeps this website
          ad-free. Thank you for your generosity!
        </Text>
      </VStack>
      <Box marginLeft={{ base: 0, md: 4 }} marginTop={{ base: 4, md: 0 }}>
        <CustomButton
          leftIcon={<FaHeart />}
          backgroundColor="#FF4081"
          color="white"
          _hover={{
            backgroundColor: "#E91E63",
            transform: "translateY(2px)",
            boxShadow: "0 2px 0 0 black",
          }}
          _active={{
            transform: "translateY(4px)",
            boxShadow: "none",
          }}
        >
          DONATE
        </CustomButton>
      </Box>
    </Flex>
  </Box>
);

const EmptyProgressState = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Box
      borderRadius="12px"
      border="1px solid"
      borderColor={colorMode === 'light' ? "brand.border.light" : "brand.border.dark"}
      padding={6}
      backgroundColor={colorMode === 'light' ? "brand.background.light" : "brand.surface.dark"}
      marginBottom={8}
      boxShadow={colorMode === 'light' 
        ? "0 4px 0 0 black"
        : "0 4px 0 0 rgba(255, 255, 255, 0.2)"
      }
    >
      <VStack spacing={4}>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          textAlign="center"
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
        >
          No Exam Progress Yet
        </Text>
        <Text 
          color={colorMode === 'light' ? "brand.text.light" : "brand.text.dark"}
          opacity={0.6}
          textAlign="center"
        >
          Start your learning journey by selecting an exam and clicking "Continue"
          to begin tracking your progress here.
        </Text>
      </VStack>
    </Box>
  );
};

const Dashboard = () => {
  // State declarations
  const [showMobileApps, setShowMobileApps] = useState(true);
  const [showSupport, setShowSupport] = useState(true);
  const [examProgress, setExamProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [deleteType, setDeleteType] = useState("");

  // Refs for cleanup and preventing memory leaks
  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);

  // Hooks
  const toast = useToast();
  const toastRef = useRef(createCustomToast(toast));
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  // Fetch exam progress with cleanup and error handling
  const fetchExamProgress = useCallback(async () => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      if (!isMounted.current) return;
      setIsLoading(true);

      const response = await fetch("http://localhost:5000/api/exam-progress", {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch exam progress");
      }

      const data = await response.json();
      if (isMounted.current) {
        setExamProgress(data.providers);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return; // Ignore abort errors
      }

      console.error("Error fetching exam progress:", error);
      if (isMounted.current) {
        toastRef.current({
          title: "Error fetching exam progress",
          description: error.message,
          status: "error",
        });
        setExamProgress([]);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []); // No dependencies needed since we use refs

  // Setup effect
  useEffect(() => {
    isMounted.current = true;
    fetchExamProgress();

    // Cleanup function
    return () => {
      isMounted.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchExamProgress]);

  // Handler for deleting selected items
  const handleDeleteSelected = useCallback(
    async (selectedIds) => {
      setSelectedForDeletion(selectedIds);
      setDeleteType("selected");
      openDeleteModal();
    },
    [openDeleteModal]
  );

  // Handler for deleting all items
  const handleDeleteAll = useCallback(() => {
    setDeleteType("all");
    openDeleteModal();
  }, [openDeleteModal]);

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    try {
      if (deleteType === "all") {
        await fetch("http://localhost:5000/api/delete-all-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (isMounted.current) {
          setExamProgress([]);
          toastRef.current({
            title: "All progress cleared",
            description: "Your exam progress history has been cleared.",
            status: "success",
          });
        }
      } else {
        const providerGroups = examProgress.reduce(
          (acc, provider) => {
            const selectedProviderExams = provider.exams
              .filter((exam) => selectedForDeletion.includes(exam.id))
              .map((exam) => exam.id);

            if (selectedProviderExams.length === provider.exams.length) {
              acc.providers.push(provider.name);
            } else if (selectedProviderExams.length > 0) {
              acc.exams.push(...selectedProviderExams);
            }
            return acc;
          },
          { providers: [], exams: [] }
        );

        // Delete providers if needed
        if (providerGroups.providers.length > 0) {
          await fetch("http://localhost:5000/api/delete-provider-exams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider_names: providerGroups.providers }),
          });
        }

        // Delete individual exams if needed
        if (providerGroups.exams.length > 0) {
          await fetch("http://localhost:5000/api/delete-exams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exam_ids: providerGroups.exams }),
          });
        }

        // Refresh data
        await fetchExamProgress();

        if (isMounted.current) {
          toastRef.current({
            title: "Selected items deleted",
            description:
              "The selected exams have been removed from your progress tracking.",
            status: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      if (isMounted.current) {
        toastRef.current({
          title: "Error",
          description: `Failed to delete ${
            deleteType === "all" ? "all progress" : "selected items"
          }`,
          status: "error",
        });
      }
    } finally {
      if (isMounted.current) {
        closeDeleteModal();
        setSelectedForDeletion([]);
      }
    }
  };

  // Render JSX
  return (
    <Box
      width="100%"
      paddingLeft={{ base: 2, sm: 4, md: 6, lg: 8 }}
      paddingRight={{ base: 2, sm: 4, md: 6, lg: 8 }}
    >
      <WelcomeComponent users={2.0} countries={190} />

      {showMobileApps && (
        <MobileAppsComing onClose={() => setShowMobileApps(false)} />
      )}

      {showSupport && (
        <SupportDevelopers onClose={() => setShowSupport(false)} />
      )}

      {isLoading ? (
        <Flex justify="center" align="center" height="400px">
          <Spinner size="xl" color="#00bfff" thickness="4px" />
        </Flex>
      ) : examProgress.length === 0 ? (
        <EmptyProgressState />
      ) : (
        <CustomDashboardTable
          data={examProgress}
          onDeleteSelected={handleDeleteSelected}
          onDeleteAll={handleDeleteAll}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        deleteType={deleteType}
        itemCount={selectedForDeletion.length}
        title={
          deleteType === "all"
            ? "Delete All Progress"
            : "Delete Selected Progress"
        }
        message={
          deleteType === "all"
            ? undefined
            : `Selected items include ${selectedForDeletion.length} exam${
                selectedForDeletion.length === 1 ? "" : "s"
              }`
        }
      />
    </Box>
  );
};

export default Dashboard;
