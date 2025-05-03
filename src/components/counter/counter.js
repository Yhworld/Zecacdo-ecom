import React, { useEffect, useState } from 'react';
import banner from '../../assets/5FE1B93B-5829-433B-B8D7-AE4C6EA4D42B.PNG';

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [expired, setExpired] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const calculateTimeLeft = () => {
    const target = new Date('2025-05-03T12:00:00-04:00');
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bannerStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover', // switched from 100% 100% to avoid squish
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: isMobile ? '65vw' : '500px',
    minHeight: '250px',
  };

  return (
    <div
      className="w-full mt-24 flex flex-col items-center justify-center text-black animate-fadeIn"
      style={bannerStyle}
    >
      {/* Optional: Add content like countdown text here */}
    </div>
  );
};

export default CountdownBanner;
