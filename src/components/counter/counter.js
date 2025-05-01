import React, { useEffect, useState } from 'react';
import banner from '../../assets/ED47A4B5-9EB7-42E3-B5EF-5218BBCD1729.png';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);

  const calculateTimeLeft = () => {
    const target = new Date('2025-05-03T12:00:00-04:00'); // May 3, 12PM ET
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      setExpired(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
<div
  className="w-full bg-cover bg-center py-10 px-6 mt-24 flex flex-col items-center justify-center text-black animate-fadeIn"
  style={{ backgroundImage: `url(${banner})`, height:'300px', }}
>

<h1 className="text-black text-2xl sm:text-3xl font-semibold tracking-wide mb-2">
        MAY 3, 12:00 PM
      </h1>

      {!expired ? (
        <div className="text-black text-4xl sm:text-5xl font-bold flex gap-4">
          <span>{String(timeLeft.days).padStart(2, '0')}d</span>
          <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      ) : (
        <p className="text-black text-2xl font-bold mt-4">Pre-Launch sale Sweet Petricor</p>
      )}

      <p className="mt-4 text-sm tracking-wider uppercase text-black">

      </p>
      {/* fragrence of love */}
    </div>
  );
};

export default CountdownBanner;
