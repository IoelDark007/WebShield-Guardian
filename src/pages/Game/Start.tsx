import type { FC } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg border border-green-500 shadow-lg shadow-green-500/20">
      <h2 className="text-2xl font-bold mb-6 text-center neon-text">Welcome to the Cyber Security Quiz</h2>
      <p className="mb-6 text-green-300">
        Test your knowledge of cyber security with 10 challenging questions. 
        The quiz covers topics like malware, network security, encryption, and more.
      </p>
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;