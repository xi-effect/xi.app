'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Post = dynamic(() =>
  import('pkg.module.posts').then((mod) => mod.Post),
);

export default function PostPage() {
  return (
    <Post
      postTitle="Победа на чемпионате"
      postText={undefined}
      date="4 мая 2022"
      author="Юшкевич О.А."
    />
  );
}
