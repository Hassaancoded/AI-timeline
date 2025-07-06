'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { timelineEvents } from '@/data/timelineEvents';
import { Heart, HeartIcon } from 'lucide-react';

export default function Timeline() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookmarkedEvents');
    if (stored) setBookmarkedIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedEvents', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  const uniqueCategories = ['All', ...new Set(timelineEvents.map(e => e.category))];

  const filteredEvents = timelineEvents.filter((event) =>
    (category === 'All' || event.category === category) &&
    (event.title.toLowerCase().includes(search.toLowerCase()) ||
     event.year.toString().includes(search))
  );

  return (
    <div className="bg-[#fff8e6] min-h-screen p-6">
      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by title or year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Timeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="relative">
              <Link href={`/event/${event.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h2>
                    <p className="text-sm text-gray-500">{event.year}</p>
                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>

              <button
                onClick={() => toggleBookmark(event.id)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:scale-110 transition"
              >
                {bookmarkedIds.includes(event.id) ? (
                  <Heart className="text-red-500 w-5 h-5 fill-red-500" />
                ) : (
                  <HeartIcon className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No events match your filters.</p>
        )}
      </div>
    </div>
  );
}
