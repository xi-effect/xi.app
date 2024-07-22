'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Post = dynamic(() =>
  import('pkg.module.posts').then((mod) => mod.Post),
);

export default function PostPage() {
  return (
    <Post />
  );
}
