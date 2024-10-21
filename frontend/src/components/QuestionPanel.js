import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import TabList from './TabList';
import QuestionBox from './QuestionBox';
import OptionsBox from './OptionsBox';
import AnswerBox from './AnswerBox';

const QuestionPanel = ({
  width = "100%",
  onSearch,
  onShuffle,
  onReset,
  onSubmit,
  tabs,
  onTabChange,
  questionNumber,
  totalQuestions,
  questionData,
  isStarFilled,
  toggleStar,
  onNavigateLeft,
  onNavigateRight,
  currentTopic,
  currentQuestion,
  onQuestionSelect
}) => {
  console.log("QuestionPanel rendered", { 
    questionNumber, 
    totalQuestions, 
    currentTopic, 
    currentQuestion 
  });

  if (!questionData) {
    return (
      <Box width={width}>
        <SearchBar
          onSearch={onSearch}
          onShuffle={onShuffle}
          onReset={onReset}
          onSubmit={onSubmit}
          currentQuestion={currentQuestion}
          currentTopic={currentTopic}
          totalQuestions={totalQuestions}
          onQuestionSelect={onQuestionSelect}
        />
        <TabList 
          tabs={tabs} 
          onTabChange={onTabChange}
          currentQuestionIndex={questionNumber - 1}
          totalQuestions={totalQuestions}
          onNavigateLeft={onNavigateLeft}
          onNavigateRight={onNavigateRight}
        />
        <Box padding={4}>Loading question data...</Box>
      </Box>
    );
  }

  return (
    <Box width={width}>
      <SearchBar
        onSearch={onSearch}
        onShuffle={onShuffle}
        onReset={onReset}
        onSubmit={onSubmit}
        currentQuestion={currentQuestion}
        currentTopic={currentTopic}
        totalQuestions={totalQuestions}
        onQuestionSelect={onQuestionSelect}
      />
      <TabList 
        tabs={tabs} 
        onTabChange={onTabChange}
        currentQuestionIndex={questionNumber - 1}
        totalQuestions={totalQuestions}
        onNavigateLeft={onNavigateLeft}
        onNavigateRight={onNavigateRight}
      />
      <VStack spacing={4} align="stretch">
        <QuestionBox
          questionNumber={questionNumber}
          totalQuestionsInTopic={totalQuestions}
          questionData={questionData}
          isStarFilled={isStarFilled}
          toggleStar={toggleStar}
          currentTopic={currentTopic}
        />
        <OptionsBox options={questionData.options || []} />
        <AnswerBox
          answer={questionData.answer || ''}
          answerDescription={questionData.answerDescription || ''}
          votes={questionData.votes || []}
        />
      </VStack>
    </Box>
  );
};

export default QuestionPanel;