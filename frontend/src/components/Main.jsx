import React from 'react';
import Header from './Header';

export default function Main() {
  return (
    <>
      <main className="min-h-[70vh] flex items-center justify-center px-6">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to DevHack <span className="text-indigo-600">Stocx</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Simple, centered, ready for your content.
          </p>
        </section>
      </main>
    </>

  );
}