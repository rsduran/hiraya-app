import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProviderProvider } from './ProviderContext';
import MainPage from './MainPage';

const App = () => {
  return (
    <ChakraProvider>
      <ProviderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/providers" element={<MainPage />} />
            <Route path="/exams" element={<MainPage />} />
            <Route path="/custom-exam" element={<MainPage />} />
            <Route path="/actual-exam" element={<MainPage />} />
            <Route path="/actual-exam/:examId" element={<MainPage />} />
          </Routes>
        </Router>
      </ProviderProvider>
    </ChakraProvider>
  );
};

export default App;