import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Question {
  question: string;
  choices: string[];
  answer: string;
}

const questions: Question[] = [
  { question: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], answer: '4' },
  { question: 'What is the capital of France?', choices: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
  { question: 'What is the primary function of an altimeter?', choices: ['Measure airspeed', 'Measure altitude', 'Measure temperature', 'Measure wind speed'], answer: 'Measure altitude' },
  { question: 'What does ATC stand for?', choices: ['Air Traffic Control', 'Aviation Technical Committee', 'Air Traffic Communication', 'Aerial Traffic Command'], answer: 'Air Traffic Control' },
  { question: 'What is the term for the speed at which an aircraft can safely take off?', choices: ['V1', 'V2', 'Vr', 'Vs'], answer: 'Vr' },
  { question: 'What is a "mayday" call?', choices: ['Routine check-in', 'Emergency distress signal', 'Weather report', 'Altitude request'], answer: 'Emergency distress signal' },
  { question: 'What instrument is used to measure the angle of attack?', choices: ['Airspeed Indicator', 'Altimeter', 'Attitude Indicator', 'AOA Indicator'], answer: 'AOA Indicator' },
  { question: 'Which phase of flight is considered the most critical for potential accidents?', choices: ['Cruise', 'Takeoff and landing', 'Taxiing', 'Holding'], answer: 'Takeoff and landing' },
  { question: 'What does the "black box" in an aircraft record?', choices: ['Passenger conversations', 'Flight data and cockpit voice recordings', 'Weather conditions', 'Fuel levels'], answer: 'Flight data and cockpit voice recordings' },
  { question: 'What is the purpose of a NOTAM?', choices: ['Weather forecast', 'Navigation update', 'Safety information', 'Regulatory changes'], answer: 'Regulatory changes' },
];

const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Test() {
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [uniqueCode, setUniqueCode] = useState<string>('');

  useEffect(() => {
    setRandomQuestions(shuffleArray([...questions]).slice(0, 10));
  }, []);

  const handleAnswer = (choice: string, index: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = choice;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === randomQuestions[index].answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setIsTestCompleted(true);

    if (newScore >= 8) {
      const code = uuidv4();
      setUniqueCode(code);

      // Store the code on the server
      await fetch('/api/store-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl justify-center font-bold mb-4">Pre-Test</h1>
        {!isTestCompleted ? (
          <div>
            {randomQuestions.map((question, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-2xl mb-4">{question.question}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {question.choices.map((choice, choiceIndex) => (
                    <button
                      key={choiceIndex}
                      className={`p-3 rounded border ${selectedAnswers[index] === choice ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-500 hover:text-white`}
                      onClick={() => handleAnswer(choice, index)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="p-3 bg-green-600 text-white rounded mt-6 hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Test Completed! Your Score: {score} / {randomQuestions.length}
            </h2>
            {score >= 8 ? (
              <div>
                <p className="text-green-500 mb-4">Congratulations! You passed the test.</p>
                <p>You may now apply to become ATC at IDVACC. Please include a screenshot of this page with the code below:</p>
                <p className="font-bold text-lg">{uniqueCode}</p>
              </div>
            ) : (
              <p className="text-red-500">You need at least 8 correct answers to pass.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
