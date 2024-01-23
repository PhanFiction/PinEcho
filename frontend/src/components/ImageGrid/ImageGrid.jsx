import { useState, useEffect } from 'react';
import LazyImage from "../LazyImage/LazyImage";
import Overlay from '../Overlay/Overlay';
import UserIcon from '../UserIcon/UserIcon';
import CircleBackground from '../CircleBackground/CircleBackground';
import Link from 'next/link';

const ImageGrid = ({ initialImages, imagesPerPage = 10 }) => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleScroll = async () => {
    const isNearBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (isNearBottom) {
      const startIndex = (pageNumber - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      const newImages = initialImages.slice(startIndex, endIndex);
      // store into Set() so that no duplicate is saved into new state
      setLoadedImages((prevImages) =>
        [...new Set([...prevImages, ...newImages])]
      );
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    if(loadedImages.length < 1) {
      setLoadedImages(initialImages.slice(0, imagesPerPage));
    }
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber, loadedImages]);

  return (
    <section className="p-4 sm:p-8">
      <ul className="columns-1 gap-5 sm:columns-2 sm:gap-4 md:columns-3 lg:columns-5 mx-auto space-y-4 overflow-y-auto">
        {loadedImages.map((item, index) => (
          <li className="group relative mt-8 z-10" key={index}>
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
                      <h1 className="ml-4 text-white">{item.creator.username}</h1>
                    </div>
                  </div>
                </Overlay>
              </Link>
            </LazyImage>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImageGrid;