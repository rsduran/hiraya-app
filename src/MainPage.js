import React, { useState, lazy, Suspense } from "react";
import {
  ChakraProvider,
  extendTheme,
  Flex,
  Box,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import "@fontsource-variable/karla/wght.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

const ProviderExamsCard = lazy(() => import("./components/ProviderExamsCard"));
const ProvidersPage = lazy(() => import("./components/ProvidersPage"));
const QuestionPanel = lazy(() => import("./components/QuestionPanel"));
const TopicBox = lazy(() => import("./components/TopicBox"));
const DownloadBox = lazy(() => import("./components/DownloadBox"));
const TopicSelector = lazy(() => import("./components/TopicSelector"));
const Dashboard = lazy(() => import("./components/Dashboard"));

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      variants: {
        referral: {
          height: "48px",
          fontSize: "16px",
          paddingLeft: "24px",
          paddingRight: "24px",
          borderRadius: "full",
          border: "2px solid black",
          fontWeight: 700,
          textTransform: "uppercase",
          transition: "0.3s",
          boxShadow: "0 4px 0 0 black",
          _hover: {
            transform: "translateY(2px)",
            boxShadow: "0 2px 0 0 black",
          },
          _active: {
            transform: "translateY(4px)",
            boxShadow: "none",
          },
          borderRight: "0",
          _first: {
            borderTopLeftRadius: "full",
            borderBottomLeftRadius: "full",
          },
          _last: {
            borderRight: "2px solid black",
            borderTopRightRadius: "full",
            borderBottomRightRadius: "full",
          },
        },
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
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentTopic, setCurrentTopic] = useState(1);
  const questionNumber = 1;
  const totalQuestions = 10;
  const questionText =
    "A company is planning to run a global marketing application in the AWS Cloud. The application will feature videos that can be viewed by users. The company must ensure that all users can view these videos with low latency. Which AWS service should the company use to meet this requirement?";

  const toggleStar = (event) => {
    event.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const options = [
    "AWS Auto Scaling",
    "Amazon Kinesis Video Streams",
    "Elastic Load Balancing",
    "Amazon CloudFront",
  ];

  const answerData = {
    answer: "A",
    answerDescription: "",
    votes: [
      { answer: "A", count: 34, isMostVoted: true },
      { answer: "B", count: 18, isMostVoted: false },
      { answer: "D", count: 3, isMostVoted: false },
      { answer: "C", count: 1, isMostVoted: false },
    ],
  };

  const tabs = [
    "ALL QUESTIONS",
    "FAVORITES",
    "ANSWERED",
    "UNANSWERED",
    "INCORRECT",
  ];

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

  const breadcrumbsData = [
    { label: "All Providers", href: "/providers" },
    { label: "Amazon", href: "/providers/amazon" },
    {
      label: "AWS Certified Cloud Practitioner (CLF-C02)",
      href: "/providers/amazon/aws-certified-cloud-practitioner-clf-c02",
      isCurrentPage: true,
    },
  ];

  const topics = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <Flex direction="column" flex={1} overflow="hidden">
          <Navbar activeItem={activeItem}>
            {activeItem === "Actual Exam" && (
              <Breadcrumbs items={breadcrumbsData} />
            )}
          </Navbar>
          <Box flex={1} overflow="auto" padding={8}>
            <Suspense fallback={<LoadingSpinner />}>
              {activeItem === "Dashboard" ? (
                <Box width="100%">
                  <Dashboard />
                </Box>
              ) : activeItem === "Actual Exam" ? (
                <Flex>
                  <Box flex={3} minWidth="300px" marginRight={8}>
                    <Box width="100%" maxWidth="1200px" paddingBottom={4}>
                      <QuestionPanel
                        width="100%"
                        onSearch={handleSearch}
                        onShuffle={handleShuffle}
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                        tabs={tabs}
                        onTabChange={handleTabChange}
                        questionNumber={questionNumber}
                        totalQuestions={totalQuestions}
                        questionText={questionText}
                        isStarFilled={isStarFilled}
                        toggleStar={toggleStar}
                        options={options}
                        answer={answerData.answer}
                        answerDescription={answerData.answerDescription}
                        votes={answerData.votes}
                      />
                    </Box>
                  </Box>
                  <VStack flex={1} minWidth="200px" spacing={8}>
                    <TopicBox
                      topicNumber={currentTopic}
                      courseName="CLF-C02"
                      courseFullName="AWS CERTIFIED CLOUD PRACTITIONER"
                    />
                    <Box width="100%" paddingTop={6}>
                      <DownloadBox />
                    </Box>
                    <TopicSelector
                      topics={topics}
                      currentTopic={currentTopic}
                      onTopicChange={handleTopicChange}
                    />
                  </VStack>
                </Flex>
              ) : activeItem === "Exams" ? (
                <Box width="100%">
                  <ProviderExamsCard />
                </Box>
              ) : activeItem === "Providers" ? (
                <Box width="100%">
                  <ProvidersPage />
                </Box>
              ) : (
                <Box>Content for {activeItem}</Box>
              )}
            </Suspense>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;