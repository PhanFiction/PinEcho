"use client"
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import LazyImage from '../../components/LazyImage/LazyImage';
import '../../styles/globals.css';

const initialImages = [
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
]

const additionalImages = [
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1688024735/pins/lnz9ysehubweak08hu8b.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685007029/pins/meenva3kqyxe6cb9shgl.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005181/pins/m7y9ivov80vy6cskztqq.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685004760/pins/c8g9ihvxhqpukpubgn97.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1685005071/pins/j4nvuoc21ojasiqjspd0.webp',
  'https://res.cloudinary.com/dvxeoc3ny/image/upload/v1684964447/pins/fhl3cwe4hg8zkl8g6tpc.webp',
]

const Home = () => {
  const [loadedImages, setLoadedImages] = useState(initialImages);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;

      if (isNearBottom) {
        // User is near the bottom of the page, load more content
        setLoadedImages((prevImages) => [...prevImages, ...additionalImages]);
        setPageNumber((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <Layout>
      <section className="p-4 sm:p-8">
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
          {
            loadedImages.map((item, index) => (
              <LazyImage
                key={index}
                src={item}
                alt={`item ${index}`}
                width={500}
                height={500}
              />
            ))
          }
          </div>
      </section>
    </Layout>
  )
};

export default Home;