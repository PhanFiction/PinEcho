"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const LazyImage = ({ src, alt, width, height, children }) => {
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
    <>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={src}
        className="h-auto max-w-full rounded-lg object-cover"
      />
      {children}
    </>
  );
};

export default LazyImage;
