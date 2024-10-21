import React, { useState, lazy, Suspense, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Box,
  VStack,
  Spinner,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";
import "@fontsource-variable/karla/wght.css";
import "@fontsource/space-grotesk/700.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import ComingSoonComponent from "./components/ComingSoonComponent";
import SelectExamBox from "./components/SelectExamBox";

const ProviderExamsCard = lazy(() => import("./components/ProviderExamsCard"));
const ProvidersPage = lazy(() => import("./components/ProvidersPage"));
const QuestionPanel = lazy(() => import("./components/QuestionPanel"));
const DownloadBox = lazy(() => import("./components/DownloadBox"));
const TopicSelector = lazy(() => import("./components/TopicSelector"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const TopicBox = lazy(() => import("./components/TopicBox"));

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
    heading: "'Space Grotesk', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
        border: "1px solid black",
        boxShadow: "0 4px 0 0 black",
        transition: "0.3s",
        _hover: {
          transform: "translateY(2px)",
          boxShadow: "0 2px 0 0 black",
        },
        _active: {
          transform: "translateY(4px)",
          boxShadow: "none",
        },
      },
      variants: {
        solid: {
          backgroundColor: "#00bfff",
          color: "black",
        },
        outline: {
          backgroundColor: "transparent",
          color: "#00bfff",
          border: "2px solid #00bfff",
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: '"Karla Variable", sans-serif',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: "bold",
      },
    },
  },
});

const LoadingSpinner = () => (
  <Center
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
    backgroundColor="rgba(255, 255, 255, 0.8)"
    zIndex="9999"
  >
    <Spinner size="xl" color="#00bfff" thickness="4px" />
  </Center>
);

const MainPage = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [view, setView] = useState("grid");
  const { examId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = (path) => {
    if (path === "/") return "Dashboard";
    if (path.startsWith("/providers")) return "Providers";
    if (path.startsWith("/exams")) return "Exams";
    if (path.startsWith("/custom-exam")) return "Custom Exam";
    if (path.startsWith("/actual-exam")) return "Actual Exam";
    return "";
  };

  useEffect(() => {
    if (location.pathname === "/actual-exam" && !examId) {
      // Do nothing here, we'll handle this in renderContent
    } else if (examId) {
      setCurrentExam(examId);
    }
  }, [location, examId]);

  useEffect(() => {
    if (currentExam) {
      const fetchExamData = async () => {
        try {
          setExamData(null);
          const response = await fetch(
            `http://localhost:5000/api/exams/${currentExam}`
          );
          const data = await response.json();
          setExamData(data);
          const topics = Object.keys(data.topics).map(Number);
          setCurrentTopic(
            topics.length === 1 ? topics[0] : currentTopic || topics[0]
          );
          setCurrentQuestionIndex(0);
        } catch (error) {
          console.error("Error fetching exam data:", error);
        }
      };

      fetchExamData();
    }
  }, [currentExam, currentTopic]);

  const toggleStar = (event) => {
    event.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleExamSelect = (examId) => {
    navigate(`/actual-exam/${examId}`);
  };

  const handleTabChange = (tab) => {
    console.log(`Tab changed to: ${tab}`);
  };

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  const handleShuffle = () => {
    console.log("Shuffling questions");
  };

  const handleReset = () => {
    console.log("Resetting questions");
  };

  const handleSubmit = () => {
    console.log("Submitting answer");
  };

  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
    setCurrentQuestionIndex(0);
  };

  const handleQuestionChange = (newIndex) => {
    const currentTopicQuestions = examData.topics[currentTopic] || [];
    if (newIndex >= 0 && newIndex < currentTopicQuestions.length) {
      setCurrentQuestionIndex(newIndex);
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const renderContent = () => {
    const path = location.pathname;

    if (path === "/") {
      return (
        <Box width="100%">
          <Dashboard />
        </Box>
      );
    } else if (path === "/providers") {
      return (
        <Box width="100%">
          <ProvidersPage />
        </Box>
      );
    } else if (path === "/exams") {
      return (
        <Box width="100%">
          <ProviderExamsCard
            onExamSelect={handleExamSelect}
            view={view}
            onViewChange={handleViewChange}
          />
        </Box>
      );
    } else if (path === "/custom-exam") {
      return (
        <Box width="100%">
          <ComingSoonComponent />
        </Box>
      );
    } else if (path.startsWith("/actual-exam")) {
      if (!examId) {
        return <SelectExamBox />;
      }
      if (!examData) {
        return <LoadingSpinner />;
      }
      const currentTopicQuestions = examData.topics[currentTopic] || [];
      const currentQuestion = currentTopicQuestions[currentQuestionIndex] || {};
      return (
        <Flex>
          <Box flex={1} minWidth="0">
            <QuestionPanel
              width="100%"
              onSearch={handleSearch}
              onShuffle={handleShuffle}
              onReset={handleReset}
              onSubmit={handleSubmit}
              tabs={[
                "ALL QUESTIONS",
                "FAVORITES",
                "ANSWERED",
                "UNANSWERED",
                "INCORRECT",
              ]}
              onTabChange={handleTabChange}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentTopicQuestions.length}
              questionData={currentQuestion}
              isStarFilled={isStarFilled}
              toggleStar={toggleStar}
              onNavigateLeft={() =>
                handleQuestionChange(currentQuestionIndex - 1)
              }
              onNavigateRight={() =>
                handleQuestionChange(currentQuestionIndex + 1)
              }
              currentTopic={currentTopic}
              currentQuestion={`T${currentTopic} Q${currentQuestionIndex + 1}`}
              onQuestionSelect={(selectedQuestion) => {
                const [, questionPart] = selectedQuestion.split(" ");
                const newIndex = parseInt(questionPart.slice(1)) - 1;
                handleQuestionChange(newIndex);
              }}
            />
          </Box>
          <Box width="300px" minWidth="300px" marginLeft={8}>
            <VStack spacing={8}>
              <TopicBox
                topicNumber={currentTopic}
                examCode={examData.examCode}
                examTitle={examData.examTitle}
              />
              <DownloadBox />
              <TopicSelector
                availableTopics={Object.keys(examData.topics).map(Number)}
                currentTopic={currentTopic}
                onTopicChange={handleTopicChange}
              />
            </VStack>
          </Box>
        </Flex>
      );
    } else {
      return <SelectExamBox />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
        <Flex direction="column" flex={1} overflow="hidden">
          <Navbar activeItem={getActiveItem(location.pathname)}>
            {location.pathname.startsWith("/actual-exam") && examData && (
              <Breadcrumbs
                items={[
                  { label: "All Providers", href: "/providers" },
                  { label: examData.provider, href: "/exams" },
                  {
                    label: examData.examTitle,
                    href: "#",
                    isCurrentPage: true,
                  },
                ]}
              />
            )}
          </Navbar>
          <Box flex={1} overflow="auto" padding={8} backgroundColor="gray.50">
            <Suspense fallback={<LoadingSpinner />}>{renderContent()}</Suspense>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;