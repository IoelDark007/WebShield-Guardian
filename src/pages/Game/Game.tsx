import { useState } from 'react';
import Quiz from './Quiz';
import StartScreen from './Start';
import ScoreScreen from './Score';

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

const questions: Question[] = [
  {
    id: 1,
    question: "What is the most common type of cyber attack?",
    options: [
      "Phishing",
      "DDoS",
      "SQL Injection",
      "Zero-day exploit"
    ],
    correctAnswer: "Phishing"
  },
  {
    id: 2,
    question: "What does 'HTTPS' stand for?",
    options: [
      "HyperText Transfer Protocol Secure",
      "HyperText Transfer Protocol Standard",
      "HyperText Technical Protocol Secure",
      "HyperText Transfer Protocol Service"
    ],
    correctAnswer: "HyperText Transfer Protocol Secure"
  },
  {
    id: 3,
    question: "Which of these is NOT a type of malware?",
    options: [
      "Firewall",
      "Ransomware",
      "Spyware",
      "Trojan"
    ],
    correctAnswer: "Firewall"
  },
  {
    id: 4,
    question: "What is the purpose of a VPN?",
    options: [
      "To encrypt internet traffic and hide your IP address",
      "To increase internet speed",
      "To block all ads",
      "To scan for viruses"
    ],
    correctAnswer: "To encrypt internet traffic and hide your IP address"
  },
  {
    id: 5,
    question: "What does '2FA' stand for in cybersecurity?",
    options: [
      "Two-Factor Authentication",
      "Two-File Archive",
      "Two-Function Algorithm",
      "Two-Firewall Architecture"
    ],
    correctAnswer: "Two-Factor Authentication"
  },
  {
    id: 6,
    question: "Which of these passwords is the most secure?",
    options: [
      "Password123!",
      "Summer2023",
      "Tr0ub4dor&3",
      "12345678"
    ],
    correctAnswer: "Tr0ub4dor&3"
  },
  {
    id: 7,
    question: "What is the primary purpose of a firewall?",
    options: [
      "To monitor and control incoming and outgoing network traffic",
      "To encrypt all data on a computer",
      "To prevent physical theft of a computer",
      "To remove viruses from infected files"
    ],
    correctAnswer: "To monitor and control incoming and outgoing network traffic"
  },
  {
    id: 8,
    question: "What is 'social engineering' in cybersecurity?",
    options: [
      "Psychological manipulation of people into performing actions or divulging confidential information",
      "The process of coding secure software",
      "A type of hardware firewall",
      "The study of computer networking protocols"
    ],
    correctAnswer: "Psychological manipulation of people into performing actions or divulging confidential information"
  },
  {
    id: 9,
    question: "What does 'DDoS' stand for?",
    options: [
      "Distributed Denial of Service",
      "Direct Data over Signal",
      "Digital Defense of Systems",
      "Dynamic Data on Server"
    ],
    correctAnswer: "Distributed Denial of Service"
  },
  {
    id: 10,
    question: "Which of these is a characteristic of a good security policy?",
    options: [
      "It's regularly updated",
      "It's kept secret from employees",
      "It's very complex and technical",
      "It never changes"
    ],
    correctAnswer: "It's regularly updated"
  }
];

function Game() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
  };

  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('finished');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono w-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-500 neon-text">Cyber Security Quiz</h1>
        
        {gameState === 'start' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <Quiz questions={questions} onEnd={endGame} />}
        {gameState === 'finished' && <ScoreScreen score={score} totalQuestions={questions.length} onRestart={startGame} />}
      </div>
    </div>
  );
}

export default Game;