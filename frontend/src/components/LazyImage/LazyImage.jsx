"use client"
import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, width, height }) => {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imageRef]);

  return (
    <img
      ref={imageRef}
      src={isVisible ? src : ''}
      alt={alt}
      width={width}
      height={height}
      className="h-auto max-w-full rounded-lg"
    />
  );
};

export default LazyImage;
