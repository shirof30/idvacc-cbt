'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface Question {
  question: string;
  choices: string[];
  answer: string;
}

const questions: Question[] = [
  { question: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], answer: '4' },
  { question: 'What is a "mayday" call?', choices: ['Routine check-in', 'Emergency distress signal', 'Weather report', 'Altitude request'], answer: 'Emergency distress signal' },
  { question: 'What is the capital of France?', choices: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
  { question: 'Which phase of flight is considered the most critical for potential accidents?', choices: ['Cruise', 'Takeoff and landing', 'Taxiing', 'Holding'], answer: 'Takeoff and landing' },
  { question: 'What is the primary function of an altimeter?', choices: ['Measure airspeed', 'Measure altitude', 'Measure temperature', 'Measure wind speed'], answer: 'Measure altitude' },
  { question: 'What does the "black box" in an aircraft record?', choices: ['Passenger conversations', 'Flight data and cockpit voice recordings', 'Weather conditions', 'Fuel levels'], answer: 'Flight data and cockpit voice recordings' },
  { question: 'What does ATC stand for?', choices: ['Air Traffic Control', 'Aviation Technical Committee', 'Air Traffic Communication', 'Aerial Traffic Command'], answer: 'Air Traffic Control' },
  { question: 'What instrument is used to measure the angle of attack?', choices: ['Airspeed Indicator', 'Altimeter', 'Attitude Indicator', 'AOA Indicator'], answer: 'AOA Indicator' },
  { question: 'What is the purpose of a NOTAM?', choices: ['Weather forecast', 'Navigation update', 'Safety information', 'Regulatory changes'], answer: 'Safety information' },
  { question: 'What is the term for the speed at which an aircraft can safely take off?', choices: ['V1', 'V2', 'Vr', 'Vs'], answer: 'Vr' },
];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Test = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(10).fill(''));
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setRandomQuestions(shuffleArray([...questions]).slice(0, 10));
  }, []);

  const handleStartTest = () => {
    if (name && idNumber) {
      setCurrentStep(1);
    } else {
      alert("Please enter your name and ID number.");
    }
  };

  const handleAnswer = (choice: string, index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = choice;
    setSelectedAnswers(newAnswers);
    
    if (choice === randomQuestions[currentQuestionIndex].answer) {
      if (selectedAnswers[currentQuestionIndex] !== randomQuestions[currentQuestionIndex].answer) {
        setScore((prev) => prev + 1);
      }
    } else {
      if (selectedAnswers[currentQuestionIndex] === randomQuestions[currentQuestionIndex].answer) {
        setScore((prev) => prev - 1);
      }
    }
  };

  const handleSubmit = () => {
    const code = uuidv4();
    setUniqueCode(code);
    setIsTestCompleted(true);
    axios.post('/api/store-code', { code, name, idNumber });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 < randomQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  if (randomQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/bgimg.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay with opacity */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="justify-center mb-4 text-3xl font-bold">IDVACC ATC Initial test</h1>
          {currentStep === 0 ? (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter your name"
              />
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="VATSIM ID number"
              />
              <button
                onClick={handleStartTest}
                className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Start Test
              </button>
            </div>
          ) : (
            <>
              {!isTestCompleted ? (
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    {`Question ${currentQuestionIndex + 1} / ${randomQuestions.length}`}
                  </h2>
                  <h2 className="mb-4 text-xl font-semibold">
                    {randomQuestions[currentQuestionIndex].question}
                  </h2>
                  <div className="flex flex-col">
                    {randomQuestions[currentQuestionIndex].choices.map((choice, index) => (
                      <button
                        key={index}
                        className={`p-2 mb-2 rounded ${selectedAnswers[currentQuestionIndex] === choice ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                        onClick={() => handleAnswer(choice, currentQuestionIndex)}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="p-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                      onClick={goToPreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </button>
                    {currentQuestionIndex + 1 === randomQuestions.length ? (
                      <button
                        className="p-2 text-white bg-green-500 rounded hover:bg-green-700"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={goToNextQuestion}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="mb-4 text-xl font-semibold">
                    Test Completed! Your Score: {score} / {randomQuestions.length}
                  </h2>
                  {score >= 8 ? (
                    <div>
                      <p className="mb-4 text-green-600">Congratulations! You passed the test.</p>
                      <p className="mb-4">
                        You may now apply to become ATC at IDVACC. Please include a screenshot of this page with the code below:
                      </p>
                      <p className="p-2 bg-blue-100 rounded">{uniqueCode}</p>
                      <button
                        className="p-2 mt-6 text-white bg-green-500 rounded hover:bg-green-700"
                        onClick={() => router.push('/verify-code')}
                      >
                        APPLY NOW
                      </button>
                    </div>
                  ) : (
                    <p className="text-red-500">You need at least 8 correct answers to pass.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
