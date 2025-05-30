import { useState, useEffect } from 'react';
import type { Question } from './Game';
import { useCallback } from 'react';

interface QuizProps {
  questions: Question[];
  onEnd: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setTimeLeft(30);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleAnswer = useCallback((answer: string) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answer);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onEnd(score + (answer === currentQuestion.correctAnswer ? 1 : 0));
      }
    }, 1500);
  }, [isAnswered, currentQuestion, currentQuestionIndex, questions.length, onEnd, score]);

  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleAnswer('');
    }
    
    if (!isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isAnswered, handleAnswer]);

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-green-400">Question {currentQuestionIndex + 1}/{questions.length}</span>
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-green-400'}`}>
            Time: {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-green-500 mb-6">
        <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
            {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
              !isAnswered 
                ? 'bg-gray-700 hover:bg-gray-600 hover:border-green-400'
                : option === currentQuestion.correctAnswer
                ? 'bg-green-900 border-green-500'
                : option === selectedAnswer
                  ? 'bg-red-900 border-red-500'
                  : 'bg-gray-700'
              } border border-gray-600`}
            >
              {option}
            </button>
            ))}
        </div>
      </div>

      {isAnswered && (
        <div className={`p-3 rounded-md mb-6 ${
          selectedAnswer === currentQuestion.correctAnswer 
            ? 'bg-green-900 text-green-300' 
            : 'bg-red-900 text-red-300'
        }`}>
          {selectedAnswer === currentQuestion.correctAnswer 
            ? 'Correct! Well done.' 
            : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
        </div>
      )}
    </div>
  );
};

export default Quiz;