import React from 'react';
import { Box } from '@chakra-ui/react';
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
  tabs,
  onTabChange,
  questionNumber,
  totalQuestions,
  questionText,
  isStarFilled,
  toggleStar,
  options,
  answer,
  answerDescription,
  votes
}) => {
  return (
    <Box width={width}>
      <SearchBar 
        onSearch={onSearch} 
        onShuffle={onShuffle} 
        onReset={onReset}
      />
      <TabList tabs={tabs} onTabChange={onTabChange} />
      <QuestionBox
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        questionText={questionText}
        isStarFilled={isStarFilled}
        toggleStar={toggleStar}
      />
      <OptionsBox options={options} />
      <AnswerBox
        answer={answer}
        answerDescription={answerDescription}
        votes={votes}
      />
    </Box>
  );
};

export default QuestionPanel;