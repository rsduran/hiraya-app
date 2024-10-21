import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Flex } from '@chakra-ui/react';
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
  onQuestionSelect,
  favoriteQuestions,
  onOptionSelect,
  selectedOptions,
  userAnswers
}) => {
  const [currentTab, setCurrentTab] = useState('ALL QUESTIONS');
  const [tabIndices, setTabIndices] = useState({
    'ALL QUESTIONS': questionNumber - 1,
    'FAVORITES': 0,
    'ANSWERED': 0,
    'UNANSWERED': 0,
    'INCORRECT': 0
  });

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  useEffect(() => {
    setTabIndices(prevIndices => ({
      ...prevIndices,
      'ALL QUESTIONS': questionNumber - 1
    }));
  }, [questionNumber]);

  useEffect(() => {
    // Update answered and unanswered questions
    const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
    const requiredSelections = getRequiredSelections(questionData.answer);
    const isAnswered = selectedOptions.length === requiredSelections;

    if (isAnswered) {
      setAnsweredQuestions(prev => [...prev.filter(q => q !== currentQuestionId), currentQuestionId]);
      setUnansweredQuestions(prev => prev.filter(q => q !== currentQuestionId));
    } else {
      setUnansweredQuestions(prev => [...prev.filter(q => q !== currentQuestionId), currentQuestionId]);
      setAnsweredQuestions(prev => prev.filter(q => q !== currentQuestionId));
    }
  }, [currentTopic, questionNumber, questionData, selectedOptions]);

  const getRequiredSelections = (answer) => {
    if (!answer) return 0;
    return answer.length;
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    if (tab === 'ALL QUESTIONS') {
      onQuestionSelect(`T${currentTopic} Q${tabIndices['ALL QUESTIONS'] + 1}`);
    } else if (tab === 'FAVORITES' && favoriteQuestions.length > 0) {
      const favorite = favoriteQuestions[tabIndices['FAVORITES']];
      onQuestionSelect(`T${favorite.topic_number} Q${favorite.question_index + 1}`);
    } else if (tab === 'ANSWERED' && answeredQuestions.length > 0) {
      onQuestionSelect(answeredQuestions[tabIndices['ANSWERED']]);
    } else if (tab === 'UNANSWERED' && unansweredQuestions.length > 0) {
      onQuestionSelect(unansweredQuestions[tabIndices['UNANSWERED']]);
    }
    onTabChange(tab);
  };

  const handleQuestionSelect = (selectedQuestion) => {
    const [topicPart, questionPart] = selectedQuestion.split(" ");
    const selectedTopic = parseInt(topicPart.slice(1));
    const selectedIndex = parseInt(questionPart.slice(1)) - 1;

    if (currentTab === 'FAVORITES') {
      if (selectedIndex >= 0 && selectedIndex < favoriteQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'FAVORITES': selectedIndex }));
      }
    } else if (currentTab === 'ANSWERED') {
      if (selectedIndex >= 0 && selectedIndex < answeredQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'ANSWERED': selectedIndex }));
      }
    } else if (currentTab === 'UNANSWERED') {
      if (selectedIndex >= 0 && selectedIndex < unansweredQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'UNANSWERED': selectedIndex }));
      }
    } else {
      setTabIndices(prevIndices => ({ ...prevIndices, [currentTab]: selectedIndex }));
    }
    onQuestionSelect(selectedQuestion);
  };

  const handleNavigate = (direction) => {
    if (currentTab === 'FAVORITES') {
      const currentIndex = tabIndices['FAVORITES'];
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < favoriteQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'FAVORITES': newIndex }));
        const favorite = favoriteQuestions[newIndex];
        onQuestionSelect(`T${favorite.topic_number} Q${favorite.question_index + 1}`);
      }
    } else if (currentTab === 'ANSWERED') {
      const currentIndex = tabIndices['ANSWERED'];
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < answeredQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'ANSWERED': newIndex }));
        onQuestionSelect(answeredQuestions[newIndex]);
      }
    } else if (currentTab === 'UNANSWERED') {
      const currentIndex = tabIndices['UNANSWERED'];
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < unansweredQuestions.length) {
        setTabIndices(prevIndices => ({ ...prevIndices, 'UNANSWERED': newIndex }));
        onQuestionSelect(unansweredQuestions[newIndex]);
      }
    } else {
      if (direction === 1) {
        onNavigateRight();
      } else {
        onNavigateLeft();
      }
    }
  };

  const getCurrentQuestionInfo = () => {
    if (currentTab === 'FAVORITES') {
      return {
        current: tabIndices['FAVORITES'] + 1,
        total: favoriteQuestions.length
      };
    } else if (currentTab === 'ANSWERED') {
      return {
        current: tabIndices['ANSWERED'] + 1,
        total: answeredQuestions.length
      };
    } else if (currentTab === 'UNANSWERED') {
      return {
        current: tabIndices['UNANSWERED'] + 1,
        total: unansweredQuestions.length
      };
    } else {
      return {
        current: questionNumber,
        total: totalQuestions
      };
    }
  };

  const questionInfo = getCurrentQuestionInfo();

  const renderQuestions = () => {
    if (currentTab === 'ANSWERED' && answeredQuestions.length === 0) {
      return <Text>There are no answered questions yet.</Text>;
    }
    if (currentTab === 'UNANSWERED' && unansweredQuestions.length === 0) {
      return <Text>There are no unanswered questions.</Text>;
    }
    if (currentTab === 'FAVORITES' && favoriteQuestions.length === 0) {
      return <Text>There are no favorited questions.</Text>;
    }
    
    return (
      <VStack spacing={4} align="stretch">
        <QuestionBox
          questionNumber={questionInfo.current}
          totalQuestionsInTopic={questionInfo.total}
          questionData={questionData}
          isStarFilled={isStarFilled}
          toggleStar={toggleStar}
          currentTopic={currentTopic}
        />
        <OptionsBox 
          options={questionData.options || []}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
          maxSelections={getRequiredSelections(questionData.answer)}
        />
        <AnswerBox
          answer={questionData.answer || ''}
          answerDescription={questionData.answerDescription || ''}
          votes={questionData.votes || []}
        />
        {currentTab === 'UNANSWERED' && (
          <Text color="red.500">
            {getRequiredSelections(questionData.answer) - selectedOptions.length} more selection(s) required
          </Text>
        )}
      </VStack>
    );
  };

  return (
    <Box width={width}>
      <SearchBar
        onSearch={onSearch}
        onShuffle={onShuffle}
        onReset={onReset}
        onSubmit={onSubmit}
        currentQuestion={`Q${questionInfo.current} of ${questionInfo.total}`}
        currentTopic={currentTopic}
        totalQuestions={questionInfo.total}
        onQuestionSelect={handleQuestionSelect}
      />
      <TabList 
        tabs={tabs} 
        onTabChange={handleTabChange}
        currentQuestionIndex={questionInfo.current - 1}
        totalQuestions={questionInfo.total}
        onNavigateLeft={() => handleNavigate(-1)}
        onNavigateRight={() => handleNavigate(1)}
      />
      {renderQuestions()}
    </Box>
  );
};

export default QuestionPanel;