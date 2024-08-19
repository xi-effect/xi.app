import React from 'react';
import PostCard from './PostCard';
import NoContent from './NoContent';
import { Header } from './Header';
import { announcements } from './mockData';

export const Posts = () => (
  <div className="flex h-full flex-col">
    <Header />
    {announcements.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {announcements.map((announcement, index) => (
          <PostCard
            key={index}
            title={announcement.title}
            description={announcement.description}
            date={announcement.date}
            author={announcement.author}
            id={announcement.id}
            isDraft={announcement.isDraft}
          />
        ))}
      </div>
    ) : (
      <NoContent />
    )}
  </div>
);
