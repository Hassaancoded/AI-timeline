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
    return (
      <div className="p-10 text-center text-xl text-red-600">
        ❌ No quiz found for this event.
      </div>
    );
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white shadow-xl p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          📚 {event.title} Quiz
        </h1>

        {!showResult ? (
          <>
            <p className="text-md mb-2 text-gray-600">
              Question {currentQuestion + 1} of {event.quiz.length}
            </p>
            <h2 className="text-xl font-semibold mb-4">{event.quiz[currentQuestion].question}</h2>
            <div className="space-y-3">
              {event.quiz[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left px-5 py-3 bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium rounded-lg transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center mt-6">
            <p className="text-xl font-bold mb-2 text-blue-700">
              ✅ Your Score: {score} / {event.quiz.length}
            </p>

            {score >= 7 ? (
              <p className="text-green-700 font-semibold text-lg">
                🎉 Excellent! You're a history master!
              </p>
            ) : score < 5 ? (
              <p className="text-red-600 font-semibold text-lg">
                📖 Try reviewing the event again. You can do it!
              </p>
            ) : (
              <p className="text-yellow-600 font-semibold text-lg">
                👍 Good attempt! A little more reading will help!
              </p>
            )}

            <button
              onClick={() => router.back()}
              className="mt-6 px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
            >
              🔙 Back to Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
