'use client';

import { redirect } from 'next/navigation';
import { fetchData } from 'pkg.utils';
import React from 'react';
// import { useMainSt } from 'store';

async function getUser() {
  const data = await fetchData('/home/', 'GET');
  console.log('fetchData', data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (data === null) {
    return false;
  }
  return data;
}

export default async function Main() {
  const user = await getUser();

  if (user === false) redirect('/signin');

  return (
    <div className="p-8 h-full w-full">
      <h1 className="text-3xl font-bold underline">Main page</h1>
    </div>
  );
}
