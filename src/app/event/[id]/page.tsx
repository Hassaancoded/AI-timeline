'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { timelineEvents } from '@/data/timelineEvents';

export default function EventPage() {
  const { id } = useParams();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => v.lang === 'en-US' && v.name.includes('Google'));
      setSelectedVoice(preferred || voices[0]);
    };

    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const event = timelineEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="p-10 text-center text-xl">
        ⚠️ Event not found. Please check the URL or return to the timeline.
      </div>
    );
  }

  const toggleSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!event?.description || !selectedVoice) return;

    const utterance = new SpeechSynthesisUtterance(event.description);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{event.title}</h1>
          <p className="text-gray-600 mb-4 text-sm">{event.year}</p>

          <div className="flex justify-between items-start mb-4">
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line flex-1">
              {event.description}
            </p>
            <button
              onClick={toggleSpeech}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              🔊 {isSpeaking ? 'Stop' : 'Listen'}
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href={`/quiz/${event.id}`}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              🎯 Take the Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
