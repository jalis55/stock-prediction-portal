import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-gray-900 text-gray-300 text-center text-sm">
      © {new Date().getFullYear()} Pulse<span className="text-indigo-400">Logix</span>. All rights reserved.
    </footer>
  );
}