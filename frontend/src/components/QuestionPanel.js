import React, { useState, useEffect, useCallback } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import TabList from "./TabList";
import QuestionBox from "./QuestionBox";
import OptionsBox from "./OptionsBox";
import AnswerBox from "./AnswerBox";

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
  userAnswers,
  unansweredQuestions,
  setUnansweredQuestions,
  incorrectQuestions,
}) => {
  const [currentTab, setCurrentTab] = useState("ALL QUESTIONS");
  const [tabIndices, setTabIndices] = useState({
    "ALL QUESTIONS": questionNumber - 1,
    FAVORITES: 0,
    ANSWERED: 0,
    UNANSWERED: 0,
    INCORRECT: 0,
  });
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [removingQuestion, setRemovingQuestion] = useState(null);
  const [isNavigationDisabled, setIsNavigationDisabled] = useState(false);
  const [displayedQuestionInfo, setDisplayedQuestionInfo] = useState({
    current: questionNumber,
    total: totalQuestions,
  });
  const [pendingUpdate, setPendingUpdate] = useState(null);

  const getRequiredSelections = useCallback((answer) => {
    if (!answer) return 1;
    if (typeof answer === "string") return answer.length;
    if (Array.isArray(answer)) return answer.length;
    return 1;
  }, []);

  useEffect(() => {
    setTabIndices((prevIndices) => ({
      ...prevIndices,
      "ALL QUESTIONS": questionNumber - 1,
    }));
  }, [questionNumber]);

  useEffect(() => {
    const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
    const requiredSelections = getRequiredSelections(questionData.answer);
    const isAnswered = selectedOptions.length === requiredSelections;

    if (isAnswered) {
      setAnsweredQuestions((prev) => [
        ...prev.filter((q) => q !== currentQuestionId),
        currentQuestionId,
      ]);
      if (currentTab === "UNANSWERED") {
        setRemovingQuestion(currentQuestionId);
        setIsNavigationDisabled(true);
        setPendingUpdate({ questionId: currentQuestionId, delay: 2000 });
      }
    } else {
      setAnsweredQuestions((prev) =>
        prev.filter((q) => q !== currentQuestionId)
      );
    }
  }, [
    currentTopic,
    questionNumber,
    questionData,
    selectedOptions,
    getRequiredSelections,
    currentTab,
  ]);

  useEffect(() => {
    if (pendingUpdate) {
      const timer = setTimeout(() => {
        handleQuestionRemoval(pendingUpdate.questionId);
        setPendingUpdate(null);
      }, pendingUpdate.delay);
      return () => clearTimeout(timer);
    }
  }, [pendingUpdate]);

  useEffect(() => {
    if (currentTab === "INCORRECT" && incorrectQuestions.length > 0) {
      const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
      if (!incorrectQuestions.includes(currentQuestionId)) {
        const nextIncorrectQuestion = incorrectQuestions[0];
        if (nextIncorrectQuestion) {
          onQuestionSelect(nextIncorrectQuestion);
        } else {
          setDisplayedQuestionInfo({ current: 0, total: 0 });
        }
      }
    }
  }, [
    currentTab,
    incorrectQuestions,
    currentTopic,
    questionNumber,
    onQuestionSelect,
  ]);

  const handleQuestionRemoval = useCallback(
    (questionId) => {
      setUnansweredQuestions((prev) => prev.filter((q) => q !== questionId));
      setRemovingQuestion(null);
      setIsNavigationDisabled(false);

      if (currentTab === "UNANSWERED") {
        const currentIndex = unansweredQuestions.findIndex(
          (q) => q === questionId
        );
        let nextQuestion;
        if (currentIndex === unansweredQuestions.length - 1) {
          nextQuestion = unansweredQuestions[currentIndex - 1];
        } else {
          nextQuestion = unansweredQuestions[currentIndex + 1];
        }
        if (nextQuestion) {
          const [topic, question] = nextQuestion.split(" ");
          onQuestionSelect(`${topic} ${question}`);
        }
      }

      setDisplayedQuestionInfo((prevInfo) => ({
        current: Math.min(prevInfo.current, prevInfo.total - 1),
        total: prevInfo.total - 1,
      }));
    },
    [currentTab, unansweredQuestions, onQuestionSelect, setUnansweredQuestions]
  );

  const handleTabChange = useCallback(
    (tab) => {
      setCurrentTab(tab);
      if (tab === "ALL QUESTIONS") {
        onQuestionSelect(
          `T${currentTopic} Q${tabIndices["ALL QUESTIONS"] + 1}`
        );
      } else if (tab === "FAVORITES" && favoriteQuestions.length > 0) {
        const favorite = favoriteQuestions[tabIndices["FAVORITES"]];
        onQuestionSelect(
          `T${favorite.topic_number} Q${favorite.question_index + 1}`
        );
      } else if (tab === "ANSWERED" && answeredQuestions.length > 0) {
        onQuestionSelect(answeredQuestions[tabIndices["ANSWERED"]]);
      } else if (tab === "UNANSWERED" && unansweredQuestions.length > 0) {
        onQuestionSelect(unansweredQuestions[tabIndices["UNANSWERED"]]);
      } else if (tab === "INCORRECT" && incorrectQuestions.length > 0) {
        onQuestionSelect(incorrectQuestions[tabIndices["INCORRECT"]]);
      }
      onTabChange(tab);
    },
    [
      currentTopic,
      tabIndices,
      favoriteQuestions,
      answeredQuestions,
      unansweredQuestions,
      incorrectQuestions,
      onQuestionSelect,
      onTabChange,
    ]
  );

  const handleQuestionSelect = useCallback(
    (selectedQuestion) => {
      const [topicPart, questionPart] = selectedQuestion.split(" ");
      const selectedTopic = parseInt(topicPart.slice(1));
      const selectedIndex = parseInt(questionPart.slice(1)) - 1;

      if (currentTab === "FAVORITES") {
        if (selectedIndex >= 0 && selectedIndex < favoriteQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            FAVORITES: selectedIndex,
          }));
        }
      } else if (currentTab === "ANSWERED") {
        if (selectedIndex >= 0 && selectedIndex < answeredQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            ANSWERED: selectedIndex,
          }));
        }
      } else if (currentTab === "UNANSWERED") {
        if (selectedIndex >= 0 && selectedIndex < unansweredQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            UNANSWERED: selectedIndex,
          }));
        }
      } else if (currentTab === "INCORRECT") {
        if (selectedIndex >= 0 && selectedIndex < incorrectQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            INCORRECT: selectedIndex,
          }));
        }
      } else {
        setTabIndices((prevIndices) => ({
          ...prevIndices,
          [currentTab]: selectedIndex,
        }));
      }
      onQuestionSelect(selectedQuestion);
    },
    [
      currentTab,
      favoriteQuestions,
      answeredQuestions,
      unansweredQuestions,
      incorrectQuestions,
      onQuestionSelect,
    ]
  );

  const handleNavigate = useCallback(
    (direction) => {
      if (isNavigationDisabled) return;

      if (currentTab === "FAVORITES") {
        const currentIndex = tabIndices["FAVORITES"];
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < favoriteQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            FAVORITES: newIndex,
          }));
          const favorite = favoriteQuestions[newIndex];
          onQuestionSelect(
            `T${favorite.topic_number} Q${favorite.question_index + 1}`
          );
        }
      } else if (currentTab === "ANSWERED") {
        const currentIndex = tabIndices["ANSWERED"];
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < answeredQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            ANSWERED: newIndex,
          }));
          onQuestionSelect(answeredQuestions[newIndex]);
        }
      } else if (currentTab === "UNANSWERED") {
        const currentIndex = tabIndices["UNANSWERED"];
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < unansweredQuestions.length) {
          setTabIndices((prevIndices) => ({
            ...prevIndices,
            UNANSWERED: newIndex,
          }));
          onQuestionSelect(unansweredQuestions[newIndex]);
        }
      } else if (currentTab === "INCORRECT") {
        const currentIndex = incorrectQuestions.indexOf(
          `T${currentTopic} Q${questionNumber}`
        );
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < incorrectQuestions.length) {
          onQuestionSelect(incorrectQuestions[newIndex]);
        }
      } else {
        if (direction === 1) {
          onNavigateRight();
        } else {
          onNavigateLeft();
        }
      }
    },
    [
      isNavigationDisabled,
      currentTab,
      tabIndices,
      favoriteQuestions,
      answeredQuestions,
      unansweredQuestions,
      incorrectQuestions,
      onQuestionSelect,
      onNavigateRight,
      onNavigateLeft,
      currentTopic,
      questionNumber,
    ]
  );

  useEffect(() => {
    const newQuestionInfo = (() => {
      if (currentTab === "FAVORITES") {
        return {
          current: tabIndices["FAVORITES"] + 1,
          total: favoriteQuestions.length,
        };
      } else if (currentTab === "ANSWERED") {
        return {
          current: tabIndices["ANSWERED"] + 1,
          total: answeredQuestions.length,
        };
      } else if (currentTab === "UNANSWERED") {
        const index = unansweredQuestions.findIndex(
          (q) => q === `T${currentTopic} Q${questionNumber}`
        );
        return {
          current: index !== -1 ? index + 1 : 1,
          total: unansweredQuestions.length,
        };
      } else if (currentTab === "INCORRECT") {
        const index = incorrectQuestions.indexOf(
          `T${currentTopic} Q${questionNumber}`
        );
        return {
          current: index !== -1 ? index + 1 : 1,
          total: incorrectQuestions.length,
        };
      } else {
        return {
          current: questionNumber,
          total: totalQuestions,
        };
      }
    })();

    if (!pendingUpdate) {
      setDisplayedQuestionInfo(newQuestionInfo);
    }
  }, [
    questionNumber,
    totalQuestions,
    currentTab,
    tabIndices,
    favoriteQuestions,
    answeredQuestions,
    unansweredQuestions,
    incorrectQuestions,
    currentTopic,
    pendingUpdate,
  ]);

  const renderQuestions = () => {
    if (currentTab === "ANSWERED" && answeredQuestions.length === 0) {
      return <Text>There are no answered questions yet.</Text>;
    }
    if (currentTab === "UNANSWERED") {
      if (unansweredQuestions.length === 0) {
        return <Text>There are no unanswered questions.</Text>;
      }
      const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
      if (
        !unansweredQuestions.includes(currentQuestionId) &&
        !removingQuestion
      ) {
        const nextQuestion = unansweredQuestions[0];
        const [topic, question] = nextQuestion.split(" ");
        onQuestionSelect(`${topic} ${question}`);
        return null;
      }
    }
    if (currentTab === "FAVORITES" && favoriteQuestions.length === 0) {
      return <Text>There are no favorited questions.</Text>;
    }
    if (currentTab === "INCORRECT") {
      if (incorrectQuestions.length === 0) {
        return <Text>There are no incorrect questions. Great job!</Text>;
      }
      const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
      if (!incorrectQuestions.includes(currentQuestionId)) {
        return <Text>Loading next incorrect question...</Text>;
      }
    }

    return (
      <VStack spacing={4} align="stretch">
        <QuestionBox
          questionNumber={displayedQuestionInfo.current}
          totalQuestionsInTopic={displayedQuestionInfo.total}
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
          isUnansweredTab={currentTab === "UNANSWERED"}
        />
        <AnswerBox
          answer={questionData.answer || ""}
          answerDescription={questionData.answerDescription || ""}
          votes={questionData.votes || []}
        />
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
        currentQuestion={`Q${displayedQuestionInfo.current} of ${displayedQuestionInfo.total}`}
        currentTopic={currentTopic}
        totalQuestions={displayedQuestionInfo.total}
        onQuestionSelect={handleQuestionSelect}
      />
      <TabList
        tabs={tabs}
        onTabChange={handleTabChange}
        currentQuestionIndex={displayedQuestionInfo.current - 1}
        totalQuestions={displayedQuestionInfo.total}
        onNavigateLeft={() => handleNavigate(-1)}
        onNavigateRight={() => handleNavigate(1)}
        isNavigationDisabled={isNavigationDisabled}
      />
      {renderQuestions()}
    </Box>
  );
};

export default QuestionPanel;
