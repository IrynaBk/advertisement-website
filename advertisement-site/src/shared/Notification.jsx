import React, { useEffect, useState } from 'react';
import "./_notification.scss"

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Change this to adjust the delay (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className="notification">
      <button className="notification-close" onClick={handleClose}>X</button>
      {message}
    </div>
  );
};

export default Notification;
