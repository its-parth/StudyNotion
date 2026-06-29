import React from 'react'

const ProgressBar = ({ value = 0 }) => {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full h-2.5 bg-richblack-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-yellow-50 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar