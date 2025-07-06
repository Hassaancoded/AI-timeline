'use client';

import { useState } from 'react';
import { timelineEvents } from '@/data/timelineEvents';

export default function TimelineQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = timelineEvents[currentIndex];

  const allYears = timelineEvents.map(e => e.year.toString());
  const shuffledYears = [...new Set(
    [current.year.toString(), ...shuffle(allYears).slice(0, 3)]
  )].sort();

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    if (answer === current.year.toString()) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < timelineEvents.length) {
        setCurrentIndex(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="p-8 text-center bg-white rounded shadow max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Finished!</h2>
        <p className="text-lg">You scored {score} out of {timelineEvents.length}</p>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setShowResult(false);
            setSelected(null);
          }}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8e6] min-h-screen flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full">
        <h3 className="text-lg text-gray-700 mb-4 font-semibold">
          In which year did this event happen?
        </h3>
        <p className="text-xl font-bold mb-2">{current.title}</p>
        <div className="flex flex-col gap-3 mt-4">
          {shuffledYears.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
              className={`px-4 py-2 rounded border ${
                selected === option
                  ? option === current.year.toString()
                    ? 'bg-green-200 border-green-500'
                    : 'bg-red-200 border-red-500'
                  : 'hover:bg-blue-100 border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">Question {currentIndex + 1} of {timelineEvents.length}</p>
      </div>
    </div>
  );
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}
