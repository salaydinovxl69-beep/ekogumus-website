import React from 'react';

export const PageSkeleton = () => (
  <div className="w-full min-h-screen p-8 space-y-4 animate-pulse">
    <div className="skeleton__bar h-12 w-3/4" />
    <div className="skeleton__bar h-64 w-full" />
    <div className="skeleton__bar h-32 w-1/2" />
  </div>
);