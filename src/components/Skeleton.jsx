import React from 'react';

const Skeleton = () => {
  // Random height to mimic masonry card flow
  const heights = ['h-48', 'h-64', 'h-80', 'h-96'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className={`w-full overflow-hidden rounded-2xl glass-panel animate-pulse-slow bg-white/5 ${randomHeight}`}>
      <div className="w-full h-full bg-gradient-to-b from-white/5 to-white/0"></div>
    </div>
  );
};

export default Skeleton;