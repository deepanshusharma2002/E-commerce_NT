import React from 'react';
import './Loader.css';

const Loader = ({ color = '#a19494', size = 20, speed = 1 }) => {
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    animationDuration: `${speed}s`
  };

  return (
    <div className="dot-pulse-loader">
      <div className="dot" style={{ ...dotStyle, animationDelay: '0s' }}></div>
      <div className="dot" style={{ ...dotStyle, animationDelay: `${speed * 0.2}s` }}></div>
      <div className="dot" style={{ ...dotStyle, animationDelay: `${speed * 0.4}s` }}></div>
    </div>
  );
};

export default Loader;