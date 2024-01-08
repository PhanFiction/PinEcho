import React, { useState, useEffect } from 'react';
import LazyImage from "../LazyImage/LazyImage";
import Overlay from '../Overlay/Overlay';
import UserIcon from '../UserIcon/UserIcon';
import CircleBackground from '../CircleBackground/CircleBackground';
import Link from 'next/link';

const ImageGrid = ({ initialImages, additionalImages, imagesPerPage = 15 }) => {
  const [loadedImages, setLoadedImages] = useState(initialImages.slice(0, imagesPerPage));
  const [pageNumber, setPageNumber] = React.useState(1);

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

  return (
    <section className="p-4 sm:p-8">
      <div className="columns-1 gap-5 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4">
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
                      <h1 className="ml-4 text-white">{item.creator.username}y</h1>
                    </div>
                  </div>
                </Overlay>
              </Link>
            </LazyImage>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGrid;


/* 
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