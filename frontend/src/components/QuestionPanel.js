import React, { useState, useEffect, useCallback } from "react";
import { Box, VStack, Text, useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();

  // State management with default values
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
  const [lastNavigationAction, setLastNavigationAction] = useState(null);
  const [navigationLock, setNavigationLock] = useState(false);

  // Enhanced debug logger
  const logDebug = (action, details) => {
    console.log(`[QuestionPanel ${action}]`, {
      timestamp: new Date().toISOString(),
      currentTab,
      currentTopic,
      questionNumber,
      navigationState: {
        isDisabled: isNavigationDisabled,
        isLocked: navigationLock,
        lastAction: lastNavigationAction,
      },
      ...details,
    });
  };

  // Utility function to get required selections for a question
  const getRequiredSelections = useCallback((answer) => {
    if (!answer) return 1;
    if (typeof answer === "string") return answer.length;
    if (Array.isArray(answer)) return answer.length;
    return 1;
  }, []);

// Handle question removal from lists
const handleQuestionRemoval = useCallback(
  (questionId) => {
    logDebug("Question Removal", { questionId });
    
    setNavigationLock(true);
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

    // Release navigation lock after a short delay
    setTimeout(() => setNavigationLock(false), 100);
  },
  [currentTab, unansweredQuestions, onQuestionSelect, setUnansweredQuestions]
);

// Handle navigation
const handleNavigate = useCallback(
  (direction) => {
    if (isNavigationDisabled || navigationLock) {
      logDebug("Navigation Blocked", { 
        reason: isNavigationDisabled ? "Navigation disabled" : "Navigation locked",
        navigationLock,
        isNavigationDisabled
      });
      return;
    }

    // Set temporary navigation lock
    setNavigationLock(true);
    setIsNavigationDisabled(true);

    const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
    
    logDebug("Navigation Attempt", {
      direction,
      currentQuestionId,
      currentTab,
      tabIndices: { ...tabIndices }
    });

    switch (currentTab) {
      case "ALL QUESTIONS": {
        if (direction === 1 && questionNumber < totalQuestions) {
          const nextQuestionId = `T${currentTopic} Q${questionNumber + 1}`;
          logDebug("Navigation Right", { from: questionNumber, to: questionNumber + 1 });
          onQuestionSelect(nextQuestionId);
        } else if (direction === -1 && questionNumber > 1) {
          const prevQuestionId = `T${currentTopic} Q${questionNumber - 1}`;
          logDebug("Navigation Left", { from: questionNumber, to: questionNumber - 1 });
          onQuestionSelect(prevQuestionId);
        }
        break;
      }

      case "FAVORITES": {
        const currentIndex = favoriteQuestions.findIndex(
          item => `T${item.topic_number} Q${item.question_index + 1}` === currentQuestionId
        );
        const nextIndex = (currentIndex !== -1 ? currentIndex : tabIndices["FAVORITES"]) + direction;
        
        if (nextIndex >= 0 && nextIndex < favoriteQuestions.length) {
          const favorite = favoriteQuestions[nextIndex];
          const targetQuestion = `T${favorite.topic_number} Q${favorite.question_index + 1}`;
          setTabIndices(prev => ({ ...prev, FAVORITES: nextIndex }));
          onQuestionSelect(targetQuestion);
          logDebug("Navigation Success", { targetQuestion, tab: "FAVORITES" });
        }
        break;
      }

      case "ANSWERED": {
        const answeredIndex = answeredQuestions.indexOf(currentQuestionId);
        const currentIndex = answeredIndex !== -1 ? answeredIndex : tabIndices["ANSWERED"];
        const nextIndex = currentIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < answeredQuestions.length) {
          const targetQuestion = answeredQuestions[nextIndex];
          setTabIndices(prev => ({ ...prev, ANSWERED: nextIndex }));
          
          // Store the target question for delayed navigation
          const [topic, question] = targetQuestion.split(" ");
          const questionNumber = parseInt(question.slice(1));
          
          // Use setTimeout to ensure state updates complete before navigation
          setTimeout(() => {
            onQuestionSelect(`${topic} Q${questionNumber}`);
            setNavigationLock(false);
            setIsNavigationDisabled(false);
          }, 50);
          
          return; // Exit early to prevent immediate lock release
        }
        break;
      }

      case "UNANSWERED": {
        const currentIndex = unansweredQuestions.indexOf(currentQuestionId);
        const nextIndex = (currentIndex !== -1 ? currentIndex : tabIndices["UNANSWERED"]) + direction;
        
        if (nextIndex >= 0 && nextIndex < unansweredQuestions.length) {
          const targetQuestion = unansweredQuestions[nextIndex];
          setTabIndices(prev => ({ ...prev, UNANSWERED: nextIndex }));
          onQuestionSelect(targetQuestion);
          logDebug("Navigation Success", { targetQuestion, tab: "UNANSWERED" });
        }
        break;
      }

      case "INCORRECT": {
        const currentIndex = incorrectQuestions.indexOf(currentQuestionId);
        const nextIndex = (currentIndex !== -1 ? currentIndex : tabIndices["INCORRECT"]) + direction;
        
        if (nextIndex >= 0 && nextIndex < incorrectQuestions.length) {
          const targetQuestion = incorrectQuestions[nextIndex];
          setTabIndices(prev => ({ ...prev, INCORRECT: nextIndex }));
          onQuestionSelect(targetQuestion);
          logDebug("Navigation Success", { targetQuestion, tab: "INCORRECT" });
        }
        break;
      }
    }

    // Release navigation locks after a short delay
    setTimeout(() => {
      setNavigationLock(false);
      setIsNavigationDisabled(false);
      setLastNavigationAction(direction === 1 ? "right" : "left");
    }, 100);
  },
  [
    isNavigationDisabled,
    navigationLock,
    currentTab,
    currentTopic,
    questionNumber,
    totalQuestions,
    tabIndices,
    favoriteQuestions,
    answeredQuestions,
    unansweredQuestions,
    incorrectQuestions,
    onQuestionSelect
  ]
);

// Handle tab changes
const handleTabChange = useCallback(
  (tab) => {
    logDebug("Tab Change", { newTab: tab });
    
    if (navigationLock || isNavigationDisabled) {
      logDebug("Tab Change Blocked", { reason: "Navigation in progress" });
      return;
    }
    
    const currentState = {
      tab: currentTab,
      questionId: `T${currentTopic} Q${questionNumber}`
    };
    
    setCurrentTab(tab);
    setNavigationLock(true);
    setIsNavigationDisabled(true);

    // Store the current position before switching tabs
    const lastPosition = {
      questionId: `T${currentTopic} Q${questionNumber}`,
      index: questionNumber - 1
    };

    // Handle question selection based on tab
    switch(tab) {
      case "ALL QUESTIONS":
        // Use the last known position in ALL QUESTIONS tab
        onQuestionSelect(`T${currentTopic} Q${tabIndices["ALL QUESTIONS"] + 1}`);
        break;
      
      case "FAVORITES":
        if (favoriteQuestions.length > 0) {
          const favorite = favoriteQuestions[tabIndices["FAVORITES"]];
          onQuestionSelect(`T${favorite.topic_number} Q${favorite.question_index + 1}`);
        }
        break;
      
      case "ANSWERED":
        if (answeredQuestions.length > 0) {
          onQuestionSelect(answeredQuestions[Math.min(tabIndices["ANSWERED"], answeredQuestions.length - 1)]);
        }
        break;
      
      case "UNANSWERED":
        if (unansweredQuestions.length > 0) {
          onQuestionSelect(unansweredQuestions[tabIndices["UNANSWERED"]]);
        }
        break;
      
      case "INCORRECT":
        if (incorrectQuestions.length > 0) {
          onQuestionSelect(incorrectQuestions[tabIndices["INCORRECT"]]);
        }
        break;
    }
    
    onTabChange(tab);
    
    // Store the last position of the previous tab before switching
    if (currentTab === "ALL QUESTIONS") {
      setTabIndices(prev => ({
        ...prev,
        "ALL QUESTIONS": questionNumber - 1
      }));
    }
    
    logDebug("Tab Change Complete", { 
      previousState: currentState,
      newTab: tab,
      currentIndices: tabIndices 
    });

    setTimeout(() => {
      setNavigationLock(false);
      setIsNavigationDisabled(false);
    }, 100);
  },
  [
    currentTopic,
    questionNumber,
    tabIndices,
    favoriteQuestions,
    answeredQuestions,
    unansweredQuestions,
    incorrectQuestions,
    onQuestionSelect,
    onTabChange,
    navigationLock,
    isNavigationDisabled,
    currentTab
  ]
);

// Handle question selection
const handleQuestionSelect = useCallback(
  (selectedQuestion) => {
    logDebug("Question Select", { selectedQuestion });

    if (navigationLock || isNavigationDisabled) {
      logDebug("Question Select Blocked", { reason: "Navigation in progress" });
      return;
    }

    setNavigationLock(true);
    
    const [topicPart, questionPart] = selectedQuestion.split(" ");
    const questionIndex = parseInt(questionPart.slice(1)) - 1;

    // Update indices based on the current tab
    if (currentTab === "ALL QUESTIONS") {
      setTabIndices(prev => ({
        ...prev,
        "ALL QUESTIONS": questionIndex
      }));
    } else {
      const currentArray = (() => {
        switch (currentTab) {
          case "FAVORITES":
            return favoriteQuestions;
          case "ANSWERED":
            return answeredQuestions;
          case "UNANSWERED":
            return unansweredQuestions;
          case "INCORRECT":
            return incorrectQuestions;
          default:
            return null;
        }
      })();

      if (currentArray) {
        const arrayIndex = currentArray.indexOf(selectedQuestion);
        if (arrayIndex !== -1) {
          setTabIndices(prev => ({
            ...prev,
            [currentTab]: arrayIndex
          }));
        }
      }
    }

    onQuestionSelect(selectedQuestion);
    
    setTimeout(() => setNavigationLock(false), 100);
  },
  [
    currentTab,
    navigationLock,
    isNavigationDisabled,
    favoriteQuestions,
    answeredQuestions,
    unansweredQuestions,
    incorrectQuestions,
    onQuestionSelect,
  ]
);

// Update tab indices when question number changes
useEffect(() => {
  if (!navigationLock) {
    setTabIndices(prevIndices => ({
      ...prevIndices,
      "ALL QUESTIONS": questionNumber - 1,
    }));
  }
}, [questionNumber, navigationLock]);

// Track answered questions
useEffect(() => {
  if (navigationLock || isNavigationDisabled || currentTab !== "ANSWERED") return;

  const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
  const requiredSelections = getRequiredSelections(questionData.answer);
  const isAnswered = selectedOptions.length === requiredSelections;

  logDebug("Answer Status Check", {
    currentQuestionId,
    requiredSelections,
    isAnswered,
    selectedOptions
  });

  if (isAnswered) {
    setAnsweredQuestions(prev => {
      // Only update if the question isn't already in the list
      if (!prev.includes(currentQuestionId)) {
        const updatedAnswered = [
          ...prev.filter((q) => q !== currentQuestionId),
          currentQuestionId,
        ];
        logDebug("Updated Answered Questions", { updatedAnswered });
        return updatedAnswered;
      }
      return prev;
    });
  }
}, [
  currentTopic,
  questionNumber,
  questionData,
  selectedOptions,
  getRequiredSelections,
  currentTab,
  navigationLock,
  isNavigationDisabled
]);

// Handle pending updates
useEffect(() => {
  if (pendingUpdate) {
    const timer = setTimeout(() => {
      handleQuestionRemoval(pendingUpdate.questionId);
      setPendingUpdate(null);
    }, pendingUpdate.delay);
    return () => clearTimeout(timer);
  }
}, [pendingUpdate, handleQuestionRemoval]);

// Handle incorrect questions tab
useEffect(() => {
  if (navigationLock || isNavigationDisabled) return;

  const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
  const requiredSelections = getRequiredSelections(questionData.answer);
  const hasUserAnswers = userAnswers[currentQuestionId] && 
                        userAnswers[currentQuestionId].length === requiredSelections;

  if (hasUserAnswers && !answeredQuestions.includes(currentQuestionId)) {
    setAnsweredQuestions(prev => [...prev, currentQuestionId]);
  } else if (!hasUserAnswers && answeredQuestions.includes(currentQuestionId)) {
    setAnsweredQuestions(prev => prev.filter(q => q !== currentQuestionId));
  }
}, [
  currentTopic,
  questionNumber,
  questionData,
  userAnswers,
  getRequiredSelections,
  navigationLock,
  isNavigationDisabled,
  answeredQuestions
]);

// Cleanup effect for navigation state
useEffect(() => {
  return () => {
    setNavigationLock(false);
    setIsNavigationDisabled(false);
    setRemovingQuestion(null);
    setPendingUpdate(null);
  };
}, []);

// Update displayed question info
useEffect(() => {
  if (pendingUpdate || navigationLock) return;

  const getCurrentIndex = (array, identifier) => {
    if (currentTab === "FAVORITES") {
      return array.findIndex(
        item => `T${item.topic_number} Q${item.question_index + 1}` === identifier
      );
    }
    return array.indexOf(identifier);
  };

  const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
  const newQuestionInfo = (() => {
    switch (currentTab) {
      case "FAVORITES":
        return {
          current: getCurrentIndex(favoriteQuestions, currentQuestionId) + 1 || tabIndices["FAVORITES"] + 1,
          total: favoriteQuestions.length,
        };
      case "ANSWERED":
        return {
          current: getCurrentIndex(answeredQuestions, currentQuestionId) + 1 || tabIndices["ANSWERED"] + 1,
          total: answeredQuestions.length,
        };
      case "UNANSWERED":
        return {
          current: getCurrentIndex(unansweredQuestions, currentQuestionId) + 1 || tabIndices["UNANSWERED"] + 1,
          total: unansweredQuestions.length,
        };
      case "INCORRECT":
        return {
          current: getCurrentIndex(incorrectQuestions, currentQuestionId) + 1 || tabIndices["INCORRECT"] + 1,
          total: incorrectQuestions.length,
        };
      default:
        return {
          current: questionNumber,
          total: totalQuestions,
        };
    }
  })();

  setDisplayedQuestionInfo(newQuestionInfo);
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
  navigationLock
]);

// Render questions based on current tab
const renderQuestions = () => {
  if (currentTab === "ANSWERED" && answeredQuestions.length === 0) {
    return (
      <Text color={colorMode === "light" ? "brand.text.light" : "brand.text.dark"}>
        There are no answered questions yet.
      </Text>
    );
  }

  if (currentTab === "UNANSWERED") {
    if (unansweredQuestions.length === 0) {
      return (
        <Text color={colorMode === "light" ? "brand.text.light" : "brand.text.dark"}>
          There are no unanswered questions.
        </Text>
      );
    }

    const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
    if (!unansweredQuestions.includes(currentQuestionId) && !removingQuestion) {
      const nextQuestion = unansweredQuestions[0];
      const [topic, question] = nextQuestion.split(" ");
      onQuestionSelect(`${topic} ${question}`);
      return null;
    }
  }

  if (currentTab === "FAVORITES" && favoriteQuestions.length === 0) {
    return (
      <Text color={colorMode === "light" ? "brand.text.light" : "brand.text.dark"}>
        There are no favorited questions.
      </Text>
    );
  }

  if (currentTab === "INCORRECT") {
    if (incorrectQuestions.length === 0) {
      return (
        <Text color={colorMode === "light" ? "brand.text.light" : "brand.text.dark"}>
          There are no incorrect questions. Great job!
        </Text>
      );
    }

    const currentQuestionId = `T${currentTopic} Q${questionNumber}`;
    if (!incorrectQuestions.includes(currentQuestionId)) {
      return (
        <Text color={colorMode === "light" ? "brand.text.light" : "brand.text.dark"}>
          Loading next incorrect question...
        </Text>
      );
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

// Main render
return (
  <Box width={width} bg={colorMode === "light" ? "brand.background.light" : "brand.background.dark"}>
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
      isNavigationDisabled={isNavigationDisabled || navigationLock}
      currentTab={currentTab}
    />
    {renderQuestions()}
  </Box>
);
};

export default QuestionPanel;