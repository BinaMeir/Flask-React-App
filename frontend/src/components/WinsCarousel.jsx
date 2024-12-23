import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WinCard from './WinCard';

const WinsCarousel = ({ winsData }) => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33); // Default for 3 cards

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCenterSlidePercentage(100); // Show 1 card for phone mode
      } else if (width < 1024) {
        setCenterSlidePercentage(50); // Show 2 cards for tablet
      } else {
        setCenterSlidePercentage(33.33); // Show 3 cards for desktop
      }
    };

    updateSlidePercentage(); // Initial check
    window.addEventListener('resize', updateSlidePercentage);

    return () => {
      window.removeEventListener('resize', updateSlidePercentage);
    };
  }, []);

  console.log("Wins data:", winsData);

  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
      useKeyboardArrows={true}
      dynamicHeight={false}
      swipeable={true}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={centerSlidePercentage}
      showStatus={false}
    >
    {winsData.map((win, index) => (
    <WinCard
        key={`win-${win.time_guessed}-${win.location}`}
        time={win.time_guessed}
        location={win.location}
    />
    ))}
    </Carousel>
  );
};

export default WinsCarousel;
