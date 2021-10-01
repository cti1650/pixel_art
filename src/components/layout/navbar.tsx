import Link from 'next/link';
import React from 'react';

export default function Navbar({ children }) {
  return (
    <>
      <div className='w-full'>
        <div className='w-full py-2 sm:py-6 text-center text-4xl font-bold'>
          Pixel Art
        </div>
      </div>
    </>
  );
}
