import React from 'react';
import { Header } from './Header';

export const Post = () => (
  <section className="p-4 sm:p-8">
    <Header />
    <div className="border-gray-80 rounded-2xl border p-6">
      <p className="mt-4 text-base font-normal leading-[22px] text-gray-100">Текст</p>
    </div>
  </section>
);
