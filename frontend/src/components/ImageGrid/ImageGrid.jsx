import React, { useState, useEffect, useRef } from 'react';
import LazyImage from "../LazyImage/LazyImage";
import Overlay from '../Overlay/Overlay';
import UserIcon from '../UserIcon/UserIcon';
import CircleBackground from '../CircleBackground/CircleBackground';
import Link from 'next/link';

const ImageGrid = ({ initialImages, imagesPerPage = 15 }) => {
  const [loadedImages, setLoadedImages] = useState(initialImages.slice(0, imagesPerPage));
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      const startIndex = (pageNumber - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      const newImages = initialImages.slice(startIndex, endIndex);
      setLoadedImages((prevImages) => [...newImages, ...prevImages,]);
    };

    const handleIntersection = async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        // When the container is intersected (scrolled to), fetch more images
        setPageNumber((prevPage) => prevPage + 1);
        await fetchImages(); // Call fetchImages asynchronously
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the container is visible
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [pageNumber]);

  // <div className="columns-1 gap-5 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
  // <div className="columns-1 gap-5 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-5 mx-auto space-y-4">
  return (
    <>
      <section className="p-4 sm:p-8">
        <div className="columns-1 gap-5 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-5 mx-auto space-y-4">
          {loadedImages.map((item, index) => (
            <div className="group relative mt-8 z-10" key={index}>
              <LazyImage
                src={item.imgPath.path}
                alt={`${item.title}`}
                width={500}
                height={500}
              >
                <Link href={`/pin/${item._id}`}>
                  <Overlay>
                    <div className="flex flex-col gap-4 lg:gap-8">
                      <div className="flex justify-center items-center text-white">
                        <CircleBackground md={true}>
                          <UserIcon 
                            imgName={item.creator.profileImage ? item.creator.profileImage.path : ""}
                            name={item.creator.username}
                            textSize={"lg"}
                          />
                        </CircleBackground>
                        <h1 className="ml-4 text-white">{index}. {item.creator.username}</h1>
                      </div>
                    </div>
                  </Overlay>
                </Link>
              </LazyImage>
            </div>
          ))}
        </div>
        <div ref={containerRef}></div>
      </section>
    </>
  );
};

export default ImageGrid;


/* 
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;

      if (isNearBottom) {
        // Calculate the index range for the next set of images
        const startIndex = pageNumber * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const newImages = additionalImages.slice(startIndex, endIndex);
      
        setLoadedImages((prevImages) => [...prevImages, ...newImages]);
        setPageNumber((prevPage) => prevPage + 1);
 
        if (endIndex > additionalImages.length) {
          const newImages = additionalImages.slice(startIndex, additionalImages.length);
          setLoadedImages((prevImages) => [...prevImages, ...newImages]);
          setPageNumber((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber]);


Fix this to generate a set of images as user scroll downwards
useEffect(() => {
  const handleScroll = () => {
    console.log('scroll activated')
    const isNearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;

    if (isNearBottom) {
      // Calculate the index range for the next set of images
      const startIndex = (pageNumber - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;

      // Load more content if there are additional images
      if (endIndex < additionalImages.length) {
        const newImages = additionalImages.slice(startIndex, endIndex);
        setLoadedImages((prevImages) => [...prevImages, ...newImages]);
        setPageNumber((prevPage) => prevPage + 1);
      }
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [pageNumber, additionalImages, imagesPerPage]); */