'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import LoginButton from '../components/LoginButton';
import Timeline from '../components/Timeline';

export default function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] text-[#1a202c]">
        <p className="text-xl font-semibold">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-[#1a202c] px-4">
      {!user ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to <span className="text-blue-600">AI Time Travel Timeline by Hassaan</span>
          </h1>
          <p className="mb-6 text-center text-gray-600 max-w-md">
            Explore major events in world history and test your knowledge with interactive quizzes.
          </p>
          <LoginButton />
        </>
      ) : (
        <Timeline />
      )}
    </main>
  );
}
