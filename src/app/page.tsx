'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import LoginButton from '../components/LoginButton';
import Timeline from '../components/Timeline';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-[#1a202c] p-6">
      {!user ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Welcome to the <span className="text-blue-600">AI Time Travel Timeline by Hassaan</span>
          </h1>
          <p className="text-md mb-6 text-center max-w-xl">
            Explore world history from 1947 onward with narration, visuals, and quizzes. Login to begin your journey.
          </p>
          <LoginButton />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center">📜 Historical Timeline</h1>
          <Timeline />
        </>
      )}
    </main>
  );
}
