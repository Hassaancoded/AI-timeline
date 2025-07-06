'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { timelineEvents } from '@/data/timelineEvents';

export default function QuizPage() {
  const { id } = useParams();
  const router = useRouter();
  const event = timelineEvents.find((e) => e.id === id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!event || !event.quiz || event.quiz.length === 0) {
    return <div className="p-10 text-center text-xl">No quiz found for this event.</div>;
  }

  const handleAnswer = (option: string) => {
    if (option === event.quiz[currentQuestion].answer) {
      setScore(score + 1);
    }

    const next = currentQuestion + 1;
    if (next < event.quiz.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#fffaf0] flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{event.title} Quiz</h1>

        {!showResult ? (
          <>
            <p className="text-lg mb-2">
              Question {currentQuestion + 1} of {event.quiz.length}
            </p>
            <h2 className="text-xl font-semibold mb-4">{event.quiz[currentQuestion].question}</h2>
            <div className="space-y-2">
              {event.quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="block w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-300 rounded transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center mt-6">
            <p className="text-xl font-bold mb-2">Your Score: {score} / {event.quiz.length}</p>
            {score >= 7 ? (
              <p className="text-green-700 font-semibold text-lg">
                🎉 Congrats, you are an expert in this topic!
              </p>
            ) : score < 5 ? (
              <p className="text-red-600 font-semibold text-lg">
                📖 Try reading again rather than just looking.
              </p>
            ) : (
              <p className="text-yellow-600 font-semibold text-lg">
                👍 Good job, but you can do even better!
              </p>
            )}
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              🔙 Back to Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
