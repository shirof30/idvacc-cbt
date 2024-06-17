import React, { useState } from 'react';

interface Question {
  question: string;
  choices: string[];
  answer: string;
}

const questions: Question[] = [
  { question: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], answer: '4' },
  { question: 'What is the capital of Indonesia?', choices: ['Jakarta', 'Bandung', 'Bali', 'Surabaya'], answer: 'Jakarta' },
];

const shuffleArray = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Test({ onComplete }: { onComplete: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const randomQuestions: Question[] = shuffleArray([...questions]).slice(0, 10);

  const handleAnswer = (choice: string) => {
    setSelectedAnswers((prev) => [...prev, choice]);
    if (choice === randomQuestions[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex + 1 < randomQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsTestCompleted(true);
    }
  };

  return (
    <div className="p-4">
      {!isTestCompleted ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {randomQuestions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col">
            {randomQuestions[currentQuestionIndex].choices.map((choice: string, index: number) => (
              <button
                key={index}
                className="p-2 bg-blue-500 text-white rounded mb-2 hover:bg-blue-700"
                onClick={() => handleAnswer(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Test Completed! Your Score: {score} / {randomQuestions.length}
          </h2>
          {score >= 8 ? (
            <button
              className="p-2 bg-green-500 text-white rounded mb-2 hover:bg-green-700"
              onClick={onComplete}
            >
              Proceed to Next Section
            </button>
          ) : (
            <p className="text-red-500">You need at least 8 correct answers to pass.</p>
          )}
        </div>
      )}
    </div>
  );
}
