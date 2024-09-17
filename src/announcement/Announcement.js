// AnnouncementBar.js
import React from 'react';
import './AnnouncementBar.css'; // Import the custom CSS file for animation

const AnnouncementBar = () => {
  return (
    <div className="container mx-auto bg-white text-brown py-8 pb-4 px-4 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="announcement-content flex space-x-24">
          <p className="text-sm font-semibold">🚨 We are live! Check out our latest updates! 🚨</p>
          <p className="text-sm font-semibold">🚨 We are live! Check out our latest updates! 🚨</p>
          <p className="text-sm font-semibold">🚨 We are live! Check out our latest updates! 🚨</p>
          <p className="text-sm font-semibold">🚨 We are live! Check out our latest updates! 🚨</p>
          <p className="text-sm font-semibold">🚨 We are live! Check out our latest updates! 🚨</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
