import React from 'react';

export const PageSkeleton = () => (
  <div className="w-full min-h-screen p-8 space-y-4 animate-pulse">
    <div className="h-12 bg-gray-200 rounded-lg w-3/4" />
    <div className="h-64 bg-gray-100 rounded-xl w-full" />
    <div className="h-32 bg-gray-200 rounded-lg w-1/2" />
  </div>
);