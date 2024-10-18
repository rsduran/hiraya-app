import React, { useState } from 'react';
import { ChakraProvider, extendTheme, Flex, Box } from '@chakra-ui/react';
import '@fontsource-variable/karla/wght.css';
import QuestionBox from './components/QuestionBox';
import OptionsBox from './components/OptionsBox';
import AnswerBox from './components/AnswerBox';
import TabList from './components/TabList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      variants: {
        referral: {
          height: '48px',
          fontSize: '16px',
          px: '24px',
          borderRadius: 'full',
          border: '2px solid black',
          fontWeight: 700,
          textTransform: 'uppercase',
          transition: '0.3s',
          boxShadow: '0 4px 0 0 black',
          _hover: {
            transform: 'translateY(2px)',
            boxShadow: '0 2px 0 0 black',
          },
          _active: {
            transform: 'translateY(4px)',
            boxShadow: 'none',
          },
          borderRight: '0',
          _first: {
            borderTopLeftRadius: 'full',
            borderBottomLeftRadius: 'full',
          },
          _last: {
            borderRight: '2px solid black',
            borderTopRightRadius: 'full',
            borderBottomRightRadius: 'full',
          },
        },
      },
    },
  },
});

const MainPage = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const questionNumber = 1;
  const totalQuestions = 10;
  const questionText = "A company is planning to run a global marketing application in the AWS Cloud. The application will feature videos that can be viewed by users. The company must ensure that all users can view these videos with low latency. Which AWS service should the company use to meet this requirement?";

  const toggleStar = (e) => {
    e.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const options = [
    "AWS Auto Scaling",
    "Amazon Kinesis Video Streams",
    "Elastic Load Balancing",
    "Amazon CloudFront"
  ];

  const answerData = {
    answer: "A",
    answerDescription: "",
    votes: [
      { answer: "A", count: 34, isMostVoted: true },
      { answer: "B", count: 18, isMostVoted: false },
      { answer: "D", count: 3, isMostVoted: false },
      { answer: "C", count: 1, isMostVoted: false }
    ],
  };

  const tabs = ['ALL QUESTIONS', 'FAVORITES', 'ANSWERED', 'UNANSWERED', 'INCORRECT'];

  const handleTabChange = (tab) => {
    console.log(`Tab changed to: ${tab}`);
    // Here you can add logic to filter questions based on the selected tab
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  };

  const handleShuffle = () => {
    console.log('Shuffling questions');
    // Implement your shuffle logic here
  };

  const handleReset = () => {
    console.log('Resetting questions');
    // Implement your reset logic here
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh">
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
        <Flex direction="column" flex={1} overflow="hidden">
          <Navbar activeItem={activeItem} />
          <Box flex={1} overflow="auto" p={8}>
            <Flex direction="column" alignItems="center">
              <Box w="95%" maxW="800px">
                <SearchBar 
                  onSearch={handleSearch} 
                  onShuffle={handleShuffle} 
                  onReset={handleReset}
                />
                <TabList tabs={tabs} onTabChange={handleTabChange} />
                <QuestionBox
                  questionNumber={questionNumber}
                  totalQuestions={totalQuestions}
                  questionText={questionText}
                  isStarFilled={isStarFilled}
                  toggleStar={toggleStar}
                />
                <OptionsBox options={options} />
                <AnswerBox
                  answer={answerData.answer}
                  answerDescription={answerData.answerDescription}
                  votes={answerData.votes}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;