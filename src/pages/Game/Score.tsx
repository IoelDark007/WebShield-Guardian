import type { FC } from 'react';

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const ScoreScreen: FC<ScoreScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = '';
  let colorClass = '';
  
  if (percentage >= 80) {
    message = 'Excellent! You\'re a security expert!';
    colorClass = 'text-green-500';
  } else if (percentage >= 60) {
    message = 'Good job! You know your security basics.';
    colorClass = 'text-green-400';
  } else if (percentage >= 40) {
    message = 'Not bad, but there\'s room for improvement.';
    colorClass = 'text-yellow-500';
  } else {
    message = 'You might want to brush up on your security knowledge.';
    colorClass = 'text-red-500';
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-green-500 text-center">
      <h2 className="text-3xl font-bold mb-6 neon-text">Quiz Completed!</h2>
      
      <div className="mb-8">
        <div className="text-6xl font-bold mb-2 text-green-500">{score}/{totalQuestions}</div>
        <div className="text-xl mb-4">Correct Answers</div>
        
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className={`h-4 rounded-full ${percentage >= 60 ? 'bg-green-600' : percentage >= 40 ? 'bg-yellow-600' : 'bg-red-600'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className={`text-xl font-bold ${colorClass}`}>{percentage}% - {message}</div>
      </div>
      
      <button
        onClick={onRestart}
        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
      >
        Try Again
      </button>
    </div>
  );
};

export default ScoreScreen;