import React from 'react';

/**
 * Wraps a screen in a centered, boxed card.
 */
export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-8 pb-16">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
}
